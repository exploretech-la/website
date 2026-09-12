#!/usr/bin/env node
/**
 * Static server for the production build that behaves like GitHub Pages.
 *
 * Known routes have generated directory index files. Pages redirects their
 * extensionless paths to a trailing slash and serves useful HTML with 200.
 * Unknown paths and legacy aliases still use the published 404-to-root
 * restoration script. A development SPA fallback hides both behaviors.
 *
 * This server therefore:
 *   - serves real files from the build directory,
 *   - redirects generated directory paths to their slash URL, preserving query,
 *   - answers unknown document paths with `404.html` and a 404 status,
 *   - answers missing files under the emitted asset prefixes with a plain 404
 *     instead of HTML, so a broken image or PDF URL fails loudly,
 *   - mirrors the `max-age=600` caching Pages was observed to send.
 *
 * Usage:
 *   node scripts/serve-built-site.cjs [--root build] [--port 4390] [--host 127.0.0.1]
 *
 * It prints `Serving <root> at http://<host>:<port>/` once listening, which is
 * what the Playwright `webServer` configuration waits for. It can also be
 * required: `const { startSiteServer } = require('./serve-built-site.cjs')`.
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const DEFAULT_ROOT = "build";
const DEFAULT_PORT = 4390;
const DEFAULT_HOST = "127.0.0.1";

// Only the types the built site actually emits, plus the media contributors
// add. Anything else is served as a download rather than guessed.
const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

// Paths the bundler owns. A miss here is a broken URL, never a route.
const ASSET_PREFIXES = ["/static/", "/assets/"];

const COMPRESSIBLE = /\.(html|css|js|mjs|json|map|svg|txt|xml)$/;

function contentType(file) {
  return (
    CONTENT_TYPES[path.extname(file).toLowerCase()] ||
    "application/octet-stream"
  );
}

function isAssetPath(pathname) {
  return ASSET_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function resolveWithin(root, pathname) {
  const candidate = path.resolve(root, "." + pathname);
  if (candidate !== root && !candidate.startsWith(root + path.sep)) return null;
  return candidate;
}

function readableFile(file) {
  try {
    return fs.statSync(file).isFile() ? file : null;
  } catch {
    return null;
  }
}

function createSiteServer(options = {}) {
  const root = path.resolve(options.root || DEFAULT_ROOT);
  if (!readableFile(path.join(root, "index.html"))) {
    throw new Error(
      `No index.html in ${root}. Run \`npm run build\` first, or pass --root <dir>.`,
    );
  }
  const notFoundPage = readableFile(path.join(root, "404.html"));

  return http.createServer((req, res) => {
    let pathname;
    let url;
    try {
      url = new URL(req.url, "http://localhost");
      pathname = decodeURIComponent(url.pathname);
    } catch {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Bad request URI");
      return;
    }

    try {
      const resolved = resolveWithin(root, pathname);
      if (!resolved) {
        res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Forbidden");
        return;
      }

      let status = 200;
      const index = readableFile(path.join(resolved, "index.html"));
      if (index && !pathname.endsWith("/")) {
        res.writeHead(301, { Location: `${url.pathname}/${url.search}` });
        res.end();
        return;
      }
      let file = readableFile(resolved) || index;

      if (!file) {
        if (isAssetPath(pathname)) {
          res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
          res.end(`Missing asset: ${pathname}`);
          return;
        }
        // Unknown document path: Pages returns its 404 page, whose script
        // rewrites the path into the `/?/...` query the SPA restores from.
        if (!notFoundPage) {
          res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("Not found");
          return;
        }
        file = notFoundPage;
        status = 404;
      }

      const headers = {
        "Content-Type": contentType(file),
        "Cache-Control": "max-age=600",
      };

      if (req.method === "HEAD") {
        headers["Content-Length"] = fs.statSync(file).size;
        res.writeHead(status, headers);
        res.end();
        return;
      }
      if (req.method !== "GET") {
        res.writeHead(405, { Allow: "GET, HEAD" });
        res.end();
        return;
      }

      let body = fs.readFileSync(file);
      if (
        COMPRESSIBLE.test(file) &&
        (req.headers["accept-encoding"] || "").includes("gzip")
      ) {
        body = zlib.gzipSync(body);
        headers["Content-Encoding"] = "gzip";
        headers.Vary = "Accept-Encoding";
      }
      headers["Content-Length"] = body.length;
      res.writeHead(status, headers);
      res.end(body);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(String((error && error.message) || error));
    }
  });
}

function startSiteServer(options = {}) {
  const host = options.host || DEFAULT_HOST;
  const port = Number(options.port ?? DEFAULT_PORT);
  const server = createSiteServer(options);
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, () => {
      server.removeListener("error", reject);
      resolve(server);
    });
  });
}

function parseArgs(argv) {
  const options = {
    root: process.env.SITE_ROOT || DEFAULT_ROOT,
    port: process.env.PORT || DEFAULT_PORT,
    host: process.env.HOST || DEFAULT_HOST,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = () => {
      const value = argv[index + 1];
      if (value === undefined) throw new Error(`${arg} needs a value`);
      index += 1;
      return value;
    };
    if (arg === "--root") options.root = next();
    else if (arg === "--port") options.port = next();
    else if (arg === "--host") options.host = next();
    else if (arg === "--help" || arg === "-h") options.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

if (require.main === module) {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exit(2);
  }
  if (options.help) {
    console.log(
      "Usage: node scripts/serve-built-site.cjs [--root build] [--port 4390] [--host 127.0.0.1]",
    );
    process.exit(0);
  }
  startSiteServer(options).then(
    (server) => {
      const { port } = server.address();
      console.log(
        `Serving ${path.resolve(options.root)} at http://${options.host}:${port}/`,
      );
      const shutdown = () => server.close(() => process.exit(0));
      process.on("SIGINT", shutdown);
      process.on("SIGTERM", shutdown);
    },
    (error) => {
      console.error(String((error && error.message) || error));
      process.exit(1);
    },
  );
}

module.exports = {
  createSiteServer,
  startSiteServer,
  DEFAULT_PORT,
  DEFAULT_HOST,
};
