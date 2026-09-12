import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { build } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "build");
const template = await fs.readFile(path.join(output, "index.html"), "utf8");
if (
  !template.includes('<div id="root"></div>') ||
  !template.includes("<title>")
) {
  throw new Error(
    "The built HTML must contain one empty #root and a title for static rendering.",
  );
}
const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
const temporary = await fs.mkdtemp(path.join(root, ".prerender-"));

try {
  await build({
    root,
    logLevel: "warn",
    build: {
      ssr: "src/app/prerender.tsx",
      outDir: temporary,
      emptyOutDir: true,
      copyPublicDir: false,
      rolldownOptions: { output: { entryFileNames: "entry.mjs" } },
    },
  });
  const {
    renderPage,
    SITE_PAGES,
    SHARE_IMAGE,
    SHARE_IMAGE_ALT,
    SITE_ORIGIN,
    canonicalUrl,
  } = await import(pathToFileURL(path.join(temporary, "entry.mjs")).href);
  const emittedPaths = new Set();
  for (const page of SITE_PAGES) {
    if (
      !/^\/(?:[a-z0-9_-]+(?:\/[a-z0-9_-]+)*)?$/.test(page.path) ||
      emittedPaths.has(page.path)
    ) {
      throw new Error(`Invalid or duplicate static page path: ${page.path}`);
    }
    emittedPaths.add(page.path);
    const canonical = canonicalUrl(page);
    const head = [
      `<title>${escapeHtml(page.title)}</title>`,
      `<meta name="description" content="${escapeHtml(page.description)}">`,
      `<meta name="robots" content="index,follow">`,
      `<link rel="canonical" href="${escapeHtml(canonical)}">`,
      ...Object.entries({
        "og:type": "website",
        "og:site_name": "exploretech.la",
        "og:title": page.title,
        "og:description": page.description,
        "og:url": canonical,
        "og:image": SHARE_IMAGE,
        "og:image:alt": SHARE_IMAGE_ALT,
      }).map(
        ([key, value]) =>
          `<meta property="${key}" content="${escapeHtml(value)}">`,
      ),
      ...Object.entries({
        "twitter:card": "summary_large_image",
        "twitter:title": page.title,
        "twitter:description": page.description,
        "twitter:image": SHARE_IMAGE,
        "twitter:image:alt": SHARE_IMAGE_ALT,
      }).map(
        ([key, value]) => `<meta name="${key}" content="${escapeHtml(value)}">`,
      ),
    ].join("\n    ");
    const html = template
      .replace(/<title>.*?<\/title>/s, head)
      .replace(
        '<div id="root"></div>',
        `<div id="root" data-page="${escapeHtml(page.path)}">${renderPage(page.path === "/" ? "/" : `${page.path}/`)}</div>`,
      );
    const directory = path.join(output, page.path.slice(1));
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(path.join(directory, "index.html"), html);
  }
  const locations = SITE_PAGES.map(
    (page) => `  <url><loc>${escapeHtml(canonicalUrl(page))}</loc></url>`,
  ).join("\n");
  await fs.writeFile(
    path.join(output, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locations}\n</urlset>\n`,
  );
  await fs.writeFile(
    path.join(output, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`,
  );
  console.log(
    `Prerendered ${SITE_PAGES.length} public routes with page-specific metadata, sitemap and robots.txt`,
  );
} finally {
  await fs.rm(temporary, { recursive: true, force: true });
}
