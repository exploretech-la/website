#!/usr/bin/env node
/**
 * Image pipeline for exploretech.la.
 *
 * `node scripts/images.js`          regenerate the optimized WebP assets, the
 *                                   manifest and src/constants/optimizedImages.js
 * `node scripts/images.js --check`   validate the checked-in outputs (no external
 *                                   tools required -- safe for CI / npm scripts)
 * `node scripts/images.js --help`    usage, including how to install cwebp/ffprobe
 *
 * Generation needs `cwebp`, `ffmpeg` and `ffprobe` on PATH. Validation needs
 * none of them: it re-reads the manifest, hashes the files, and parses WebP
 * headers directly.
 *
 * Node standard library only -- no dependencies.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const os = require("os");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CONFIG_PATH = path.join(__dirname, "image-sources.json");

const HELP = `
node scripts/images.js [--check] [--force] [--only <substring>] [--help]

  (no flag)   Generate every optimized WebP variant that is missing or stale,
              rewrite the manifest and regenerate the JS map. Requires cwebp,
              ffmpeg and ffprobe on PATH.
  --check     Verify the checked-in optimized assets without any external tool:
              inventory/manifest agreement, source freshness (sha256), output
              existence + sha256, WebP header dimensions, per-profile byte
              budgets, JS map freshness, and a scan of the app source for
              raster references that are not in the inventory. Exits 1 on any
              problem. This is the check to wire into npm scripts.
  --force     Re-encode every variant even when the source hash is unchanged.
  --only S    Restrict generation to sources whose path contains S.

Inputs / outputs
  scripts/image-sources.json     the inventory: one entry per actively rendered
                                 raster image, its profile and optional crop focus
  src/static/**                  originals, kept in the repo so regeneration is
                                 repeatable
  src/static/optimized/**        generated WebP variants (mirrors the source tree)
  src/static/optimized/manifest.json
                                 generated record of every variant: dimensions,
                                 byte size, sha256, source sha256, quality used
  src/constants/optimizedImages.js
                                 generated explicit map, default export, keyed by
                                 the ORIGINAL src/static-relative path:
                                   images['team/leadership/sandra-pan.jpg']
                                 Each value spreads straight onto a native <img>:
                                   { src, width, height, srcSet?, sizes? }

Profiles
  portrait    deliberate square crop then a single <=320x320 variant (People.jsx
              renders a fixed 160x160 box, so 320 covers 2x displays). Sources
              smaller than 320px are never upscaled.
  content     responsive variants at the profile widths (640/1280 by default),
              aspect ratio preserved, never upscaled; the widest variant is the
              src and any extra widths become a real-width srcSet.
  logo        near-lossless WebP preserves transparency and keeps flat artwork
              compact; SVG logos remain vector.

Crop focus (portrait profile)
  Square crops default to the centre of the source. Add a focus override to the
  inventory entry when the centre cuts the face:
    { "src": "team/.../person.jpg", "profile": "portrait", "focus": { "y": 0.3 } }
  focus.x / focus.y are fractions of the source width/height naming the point the
  crop is centred on (0 = left/top, 0.5 = centre, 1 = right/bottom). The crop box
  is clamped inside the image, so extreme values simply pin to an edge.

Byte budgets
  Each profile declares maxBytes. For lossy profiles the encoder steps quality
  down (in units of 6, never below minQuality) until the variant fits, and the
  quality actually used is recorded in the manifest so a degraded encode is
  visible rather than silent. If even minQuality does not fit, generation fails
  and asks you to raise the budget deliberately.

External tools (generation only)
  macOS     brew install webp ffmpeg
  Debian    sudo apt-get install webp ffmpeg
  ffmpeg    decodes each original to a temporary PNG. This is what applies EXIF
            orientation: team/operations/aansh-singh.jpeg is stored 4032x3024
            with a rotation tag, so encoding it directly would ship a sideways
            headshot. ffprobe ships with ffmpeg.
  cwebp     crops, resizes and encodes the WebP variants.
  ffprobe   reads exact pixel dimensions of the decoded source and of each
            generated variant.
  None of the three is needed by --check or by \`npm run build\`, which only use
  the checked-in assets and the Node standard library.
`;

// ---------------------------------------------------------------- helpers

function fail(message) {
  process.stderr.write("images: " + message + "\n");
  process.exit(1);
}

function readConfig() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  const seen = new Set();
  config.sources.forEach((source) => {
    if (!source.src) fail('inventory entry without "src"');
    if (seen.has(source.src)) fail("duplicate inventory entry: " + source.src);
    seen.add(source.src);
    if (!config.profiles[source.profile]) {
      fail('unknown profile "' + source.profile + '" for ' + source.src);
    }
  });
  return config;
}

function sha256(buffer) {
  return "sha256:" + crypto.createHash("sha256").update(buffer).digest("hex");
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function bytes(n) {
  if (n < 1024) return n + " B";
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + " KB";
  return (n / (1024 * 1024)).toFixed(2) + " MB";
}

/** Exact pixel size of a WebP file, straight from its chunk headers. */
function webpSize(buffer) {
  if (buffer.length < 30) return null;
  if (buffer.toString("ascii", 0, 4) !== "RIFF") return null;
  if (buffer.toString("ascii", 8, 12) !== "WEBP") return null;
  const fourcc = buffer.toString("ascii", 12, 16);
  if (fourcc === "VP8X") {
    return {
      width: buffer.readUIntLE(24, 3) + 1,
      height: buffer.readUIntLE(27, 3) + 1,
    };
  }
  if (fourcc === "VP8 ") {
    // 3-byte frame tag, 3-byte start code, then 14-bit width/height.
    if (buffer[23] !== 0x9d || buffer[24] !== 0x01 || buffer[25] !== 0x2a)
      return null;
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }
  if (fourcc === "VP8L") {
    if (buffer[20] !== 0x2f) return null;
    const bits = buffer.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }
  return null;
}

function probe(file) {
  let out;
  try {
    out = execFileSync(
      "ffprobe",
      [
        "-v",
        "error",
        "-select_streams",
        "v:0",
        "-show_entries",
        "stream=width,height",
        "-of",
        "csv=p=0",
        file,
      ],
      { encoding: "utf8" },
    );
  } catch (error) {
    fail(
      "ffprobe failed on " + file + " (see --help for install instructions)",
    );
  }
  const parts = out.trim().split(",");
  const width = Number(parts[0]);
  const height = Number(parts[1]);
  if (!width || !height) fail("ffprobe returned no dimensions for " + file);
  return { width: width, height: height };
}

function requireTool(name, args) {
  try {
    execFileSync(name, args, { stdio: "ignore" });
  } catch (error) {
    fail(
      "generation needs `" +
        name +
        "` on PATH. Run `node scripts/images.js --help`.",
    );
  }
}

let decodeCounter = 0;

/**
 * Decode an original to a temporary PNG with ffmpeg, which applies the EXIF
 * orientation tag. cwebp reads the pixels as a browser would display them, and
 * alpha survives because PNG is the intermediate. The caller unlinks the file.
 */
function decodeSource(input) {
  decodeCounter += 1;
  const file = path.join(
    os.tmpdir(),
    "etla-image-" + process.pid + "-" + decodeCounter + ".png",
  );
  try {
    execFileSync(
      "ffmpeg",
      ["-v", "error", "-i", input, "-f", "image2", "-c:v", "png", "-y", file],
      { stdio: ["ignore", "ignore", "pipe"] },
    );
  } catch (error) {
    const detail = error.stderr ? String(error.stderr).trim() : error.message;
    fail("ffmpeg failed to decode " + input + ": " + detail);
  }
  const size = probe(file);
  return { file: file, width: size.width, height: size.height };
}

// ---------------------------------------------------------------- generation

function cwebp(args) {
  try {
    execFileSync("cwebp", args, { stdio: ["ignore", "ignore", "pipe"] });
  } catch (error) {
    const detail = error.stderr ? String(error.stderr).trim() : error.message;
    fail("cwebp failed: " + detail);
  }
}

/**
 * Encode one variant, stepping quality down until it fits the budget.
 * Returns { width, height, bytes, hash, quality }.
 */
function encodeVariant(options) {
  const { input, output, profile, crop, resize } = options;
  const lossless = typeof profile.nearLossless === "number";
  const startQuality = profile.quality;
  const minQuality = lossless
    ? startQuality
    : profile.minQuality || startQuality;
  let quality = startQuality;

  for (;;) {
    const args = ["-quiet", "-m", "6", "-alpha_q", "100"];
    if (lossless) {
      args.push(
        "-near_lossless",
        String(profile.nearLossless),
        "-q",
        String(quality),
      );
    } else {
      args.push("-q", String(quality), "-sharp_yuv");
    }
    if (crop)
      args.push(
        "-crop",
        String(crop.x),
        String(crop.y),
        String(crop.width),
        String(crop.height),
      );
    args.push("-resize", String(resize.width), String(resize.height));
    args.push(input, "-o", output);
    cwebp(args);

    const buffer = fs.readFileSync(output);
    if (buffer.length <= profile.maxBytes || quality <= minQuality) {
      if (buffer.length > profile.maxBytes) {
        fail(
          output.slice(ROOT.length + 1) +
            " is " +
            bytes(buffer.length) +
            " at the minimum quality " +
            quality +
            ", over the " +
            bytes(profile.maxBytes) +
            " budget. Raise maxBytes for this profile in scripts/image-sources.json " +
            "deliberately, or narrow the variant widths.",
        );
      }
      const size = probe(output);
      if (quality !== startQuality) {
        process.stdout.write(
          "    quality reduced " +
            startQuality +
            " -> " +
            quality +
            " to fit the " +
            bytes(profile.maxBytes) +
            " budget\n",
        );
      }
      return {
        width: size.width,
        height: size.height,
        bytes: buffer.length,
        hash: sha256(buffer),
        quality: quality,
      };
    }
    quality = Math.max(minQuality, quality - 6);
  }
}

function variantWidths(profile, source, sourceWidth) {
  const configured = source.widths || profile.widths;
  const widths = [];
  configured
    .slice()
    .sort((a, b) => a - b)
    .forEach((width) => {
      const capped = Math.min(width, sourceWidth);
      if (widths.indexOf(capped) === -1) widths.push(capped);
    });
  return widths;
}

function squareCrop(sourceWidth, sourceHeight, focus) {
  const side = Math.min(sourceWidth, sourceHeight);
  const fx = focus && typeof focus.x === "number" ? focus.x : 0.5;
  const fy = focus && typeof focus.y === "number" ? focus.y : 0.5;
  const clamp = (value, max) => Math.max(0, Math.min(max, Math.round(value)));
  return {
    x: clamp(fx * sourceWidth - side / 2, sourceWidth - side),
    y: clamp(fy * sourceHeight - side / 2, sourceHeight - side),
    width: side,
    height: side,
  };
}

function outputPath(key, width) {
  const dir = path.dirname(key);
  const base = path.basename(key, path.extname(key));
  const name = base + "-" + width + "w.webp";
  return dir === "." ? name : dir + "/" + name;
}

function generate(config, flags) {
  requireTool("cwebp", ["-version"]);
  requireTool("ffmpeg", ["-version"]);
  requireTool("ffprobe", ["-version"]);

  const sourceRoot = path.join(ROOT, config.sourceRoot);
  const outputRoot = path.join(ROOT, config.outputRoot);
  const previous = readManifest(config);
  const previousByKey = new Map();
  if (previous)
    previous.entries.forEach((entry) => previousByKey.set(entry.key, entry));

  const entries = [];
  let generated = 0;
  let reused = 0;

  config.sources.forEach((source) => {
    if (flags.only && source.src.indexOf(flags.only) === -1) {
      const cached = previousByKey.get(source.src);
      if (cached) {
        entries.push(cached);
        reused += 1;
        return;
      }
    }
    const profile = config.profiles[source.profile];
    const input = path.join(sourceRoot, source.src);
    if (!fs.existsSync(input))
      fail("missing source " + config.sourceRoot + "/" + source.src);
    const sourceBuffer = fs.readFileSync(input);
    const sourceHash = sha256(sourceBuffer);

    const cached = previousByKey.get(source.src);
    if (
      !flags.force &&
      cached &&
      cached.sourceHash === sourceHash &&
      JSON.stringify(cached.request) ===
        JSON.stringify(requestOf(source, profile))
    ) {
      const intact = cached.outputs.every((output) => {
        const file = path.join(outputRoot, output.path);
        if (!fs.existsSync(file)) return false;
        return sha256(fs.readFileSync(file)) === output.hash;
      });
      if (intact) {
        entries.push(cached);
        reused += 1;
        return;
      }
    }

    process.stdout.write(
      "  " + source.src + " (" + bytes(sourceBuffer.length) + ")\n",
    );

    // ffmpeg applies EXIF orientation while decoding, so every measurement and
    // crop below is in the orientation a browser actually displays.
    const decoded = decodeSource(input);
    const stored = probe(input);
    const rotated =
      decoded.width !== stored.width || decoded.height !== stored.height;
    if (rotated) {
      process.stdout.write(
        "    EXIF orientation applied: stored " +
          stored.width +
          "x" +
          stored.height +
          " -> displayed " +
          decoded.width +
          "x" +
          decoded.height +
          "\n",
      );
    }

    let crop = null;
    let widths;
    if (profile.type === "portrait") {
      crop = squareCrop(decoded.width, decoded.height, source.focus);
      widths = [Math.min(profile.size, crop.width)];
    } else {
      widths = variantWidths(profile, source, decoded.width);
    }

    const outputs = widths.map((width) => {
      const relative = outputPath(source.src, width);
      const file = path.join(outputRoot, relative);
      mkdirp(path.dirname(file));
      const resize =
        profile.type === "portrait"
          ? { width: width, height: width }
          : { width: width, height: 0 };
      const result = encodeVariant({
        input: decoded.file,
        output: file,
        profile: profile,
        crop: crop,
        resize: resize,
      });
      process.stdout.write(
        "    " +
          relative +
          "  " +
          result.width +
          "x" +
          result.height +
          "  " +
          bytes(result.bytes) +
          "\n",
      );
      return {
        path: relative,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        hash: result.hash,
        quality: result.quality,
      };
    });
    fs.unlinkSync(decoded.file);

    generated += 1;
    entries.push({
      key: source.src,
      profile: source.profile,
      type: profile.type,
      request: requestOf(source, profile),
      sourceBytes: sourceBuffer.length,
      sourceWidth: decoded.width,
      sourceHeight: decoded.height,
      exifRotated: rotated,
      sourceHash: sourceHash,
      crop: crop,
      sizes: source.sizes || null,
      outputs: outputs,
    });
  });

  entries.sort((a, b) => (a.key < b.key ? -1 : 1));
  const manifest = {
    _comment: "GENERATED by scripts/images.js -- do not edit by hand.",
    version: 1,
    outputRoot: config.outputRoot,
    entries: entries,
  };
  const manifestFile = path.join(ROOT, config.manifestPath);
  mkdirp(path.dirname(manifestFile));
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + "\n");
  fs.writeFileSync(
    path.join(ROOT, config.mapPath),
    renderMap(config, manifest),
  );

  pruneOrphans(config, manifest);

  const totalSource = entries.reduce(
    (sum, entry) => sum + entry.sourceBytes,
    0,
  );
  const totalOutput = entries.reduce(
    (sum, entry) => sum + entry.outputs.reduce((s, o) => s + o.bytes, 0),
    0,
  );
  process.stdout.write(
    "\n" +
      entries.length +
      " sources (" +
      generated +
      " encoded, " +
      reused +
      " unchanged)\n" +
      "originals " +
      bytes(totalSource) +
      " -> generated " +
      bytes(totalOutput) +
      "\n" +
      "wrote " +
      config.manifestPath +
      " and " +
      config.mapPath +
      "\n",
  );
}

/** The part of an inventory entry that, when changed, invalidates the outputs. */
function requestOf(source, profile) {
  return {
    profile: source.profile,
    type: profile.type,
    widths: source.widths || profile.widths || null,
    size: profile.size || null,
    quality: profile.quality,
    minQuality: profile.minQuality || profile.quality,
    nearLossless:
      typeof profile.nearLossless === "number" ? profile.nearLossless : null,
    maxBytes: profile.maxBytes,
    focus: source.focus || null,
    sizes: source.sizes || null,
  };
}

/** Delete generated files that no entry claims, so the tree cannot drift. */
function pruneOrphans(config, manifest) {
  const outputRoot = path.join(ROOT, config.outputRoot);
  if (!fs.existsSync(outputRoot)) return;
  const keep = new Set([path.join(outputRoot, "manifest.json")]);
  manifest.entries.forEach((entry) => {
    entry.outputs.forEach((output) =>
      keep.add(path.join(outputRoot, output.path)),
    );
  });
  const walk = (dir) => {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((item) => {
      const file = path.join(dir, item.name);
      if (item.isDirectory()) {
        walk(file);
        if (fs.readdirSync(file).length === 0) fs.rmdirSync(file);
      } else if (!keep.has(file)) {
        fs.unlinkSync(file);
        process.stdout.write(
          "  removed orphan " + file.slice(ROOT.length + 1) + "\n",
        );
      }
    });
  };
  walk(outputRoot);
}

// ---------------------------------------------------------------- JS map

/**
 * A deterministic, collision-free ES import binding for one generated file.
 * The whole output-relative path goes into the name, so two variants can only
 * collide when their paths differ by punctuation alone; the numeric suffix
 * keeps even that case stable, because callers feed paths in sorted order.
 */
function importIdentifier(outputRelativePath, taken) {
  const base =
    "img_" +
    outputRelativePath.replace(/\.webp$/, "").replace(/[^A-Za-z0-9]+/g, "_");
  let name = base;
  let counter = 2;
  while (taken.has(name)) {
    name = base + "_" + counter;
    counter += 1;
  }
  taken.add(name);
  return name;
}

function renderMap(config, manifest) {
  // `static` is a bundler resolve alias (see vite.config.mjs / jsconfig.json).
  const assetRoot = config.outputRoot.replace(/^src\//, "");
  const paths = new Set();
  manifest.entries.forEach((entry) =>
    entry.outputs.forEach((output) => paths.add(output.path)),
  );
  const names = new Map();
  const taken = new Set();
  Array.from(paths)
    .sort()
    .forEach((file) => names.set(file, importIdentifier(file, taken)));

  const lines = [];
  lines.push("// GENERATED by scripts/images.js -- do not edit.");
  lines.push("//");
  lines.push(
    "// Optimized WebP variants keyed by the ORIGINAL src/static-relative path.",
  );
  lines.push("// Each value spreads straight onto a native <img>:");
  lines.push("//");
  lines.push('//   import images from "constants/optimizedImages";');
  lines.push(
    '//   <img {...images["team/leadership/sandra-pan.jpg"]} alt="Sandra Pan" />',
  );
  lines.push("//");
  lines.push(
    "// Regenerate with `npm run images` after editing scripts/image-sources.json.",
  );
  lines.push("");
  names.forEach((name, file) => {
    lines.push("import " + name + ' from "' + assetRoot + "/" + file + '";');
  });
  lines.push("");
  lines.push("const images = {");
  manifest.entries.forEach((entry) => {
    const outputs = entry.outputs.slice().sort((a, b) => a.width - b.width);
    const largest = outputs[outputs.length - 1];
    lines.push('  "' + entry.key + '": {');
    lines.push("    src: " + names.get(largest.path) + ",");
    if (outputs.length > 1) {
      lines.push("    srcSet: [");
      outputs.forEach((output) => {
        lines.push(
          "      " + names.get(output.path) + ' + " ' + output.width + 'w",',
        );
      });
      lines.push('    ].join(", "),');
    }
    if (entry.sizes) lines.push('    sizes: "' + entry.sizes + '",');
    lines.push("    width: " + largest.width + ",");
    lines.push("    height: " + largest.height + ",");
    lines.push("  },");
  });
  lines.push("};");
  lines.push("");
  lines.push("export default images;");
  lines.push("");
  return lines.join("\n");
}

// ---------------------------------------------------------------- check

function readManifest(config) {
  const file = path.join(ROOT, config.manifestPath);
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    return null;
  }
}

function collectSourceFiles(root, extensions) {
  const files = [];
  if (!fs.existsSync(root)) return files;
  const walk = (dir) => {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((item) => {
      const file = path.join(dir, item.name);
      if (item.isDirectory()) walk(file);
      else if (extensions.indexOf(path.extname(item.name)) !== -1)
        files.push(file);
    });
  };
  walk(root);
  return files;
}

const RASTER_REFERENCE =
  /["'`]([^"'`\n]*static\/[^"'`\n]+\.(?:png|jpe?g|gif|webp))["'`]/gi;
const MAP_LOOKUP = /images\[\s*["'`]([^"'`\n]+)["'`]\s*\]/g;

function scanReferences(config, keys, problems) {
  const scan = config.scan || {};
  const roots = scan.roots || [];
  const extensions = scan.extensions || [".js", ".jsx"];
  const allowPrefixes = scan.allowUnoptimized || [];
  const allowPaths = scan.allowUnoptimizedPaths || [];

  roots.forEach((root) => {
    collectSourceFiles(path.join(ROOT, root), extensions).forEach((file) => {
      const relative = file.slice(ROOT.length + 1);
      const lines = fs.readFileSync(file, "utf8").split("\n");
      lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (
          trimmed.indexOf("//") === 0 ||
          trimmed.indexOf("*") === 0 ||
          trimmed.indexOf("/*") === 0
        ) {
          return; // commented-out code is not shipped
        }
        const where = relative + ":" + (index + 1);

        RASTER_REFERENCE.lastIndex = 0;
        let match;
        while ((match = RASTER_REFERENCE.exec(line)) !== null) {
          const key = match[1].slice(
            match[1].indexOf("static/") + "static/".length,
          );
          if (allowPrefixes.some((prefix) => key.indexOf(prefix) === 0))
            continue;
          if (allowPaths.indexOf(key) !== -1) continue;
          if (!keys.has(key)) {
            problems.push(
              where +
                ': raster "' +
                key +
                '" is referenced but not in scripts/image-sources.json. ' +
                "Add it (or allowlist its family under scan.allowUnoptimized) and run `npm run images`.",
            );
          } else {
            problems.push(
              where +
                ': "' +
                key +
                '" is optimized -- import the generated map instead ' +
                '(images["' +
                key +
                '"]) so the original megabytes are not shipped.',
            );
          }
        }

        MAP_LOOKUP.lastIndex = 0;
        while ((match = MAP_LOOKUP.exec(line)) !== null) {
          if (!keys.has(match[1])) {
            problems.push(
              where +
                ': images["' +
                match[1] +
                '"] is not a generated key. ' +
                "Check the path, or add the source to scripts/image-sources.json.",
            );
          }
        }
      });
    });
  });
}

function check(config) {
  const problems = [];
  const manifest = readManifest(config);
  if (!manifest) {
    fail(
      "no readable " + config.manifestPath + " -- run `node scripts/images.js`",
    );
  }

  const sourceRoot = path.join(ROOT, config.sourceRoot);
  const outputRoot = path.join(ROOT, config.outputRoot);
  const manifestKeys = new Set(manifest.entries.map((entry) => entry.key));
  const inventoryKeys = new Set(config.sources.map((source) => source.src));

  config.sources.forEach((source) => {
    if (!manifestKeys.has(source.src)) {
      problems.push(
        source.src +
          ": in the inventory but not generated -- run `npm run images`",
      );
    }
  });
  manifest.entries.forEach((entry) => {
    if (!inventoryKeys.has(entry.key)) {
      problems.push(
        entry.key +
          ": generated but no longer in the inventory -- run `npm run images`",
      );
    }
  });

  const expectedFiles = new Set();
  manifest.entries.forEach((entry) => {
    const source = config.sources.find((item) => item.src === entry.key);
    const profile = source ? config.profiles[source.profile] : null;
    const sourceFile = path.join(sourceRoot, entry.key);

    if (!fs.existsSync(sourceFile)) {
      problems.push(
        entry.key +
          ": original is missing -- generation is no longer repeatable",
      );
    } else {
      const buffer = fs.readFileSync(sourceFile);
      if (
        buffer.length !== entry.sourceBytes ||
        sha256(buffer) !== entry.sourceHash
      ) {
        problems.push(
          entry.key +
            ": original changed since generation -- run `npm run images`",
        );
      }
    }

    if (source && profile) {
      const request = requestOf(source, profile);
      if (JSON.stringify(request) !== JSON.stringify(entry.request)) {
        problems.push(
          entry.key +
            ": profile/focus settings changed since generation -- run `npm run images`",
        );
      }
    }

    entry.outputs.forEach((output) => {
      const file = path.join(outputRoot, output.path);
      expectedFiles.add(file);
      if (!fs.existsSync(file)) {
        problems.push(
          output.path + ": generated file is missing -- run `npm run images`",
        );
        return;
      }
      const buffer = fs.readFileSync(file);
      if (buffer.length !== output.bytes || sha256(buffer) !== output.hash) {
        problems.push(
          output.path +
            ": generated file does not match the manifest -- run `npm run images`",
        );
        return;
      }
      if (profile && buffer.length > profile.maxBytes) {
        problems.push(
          output.path +
            ": " +
            bytes(buffer.length) +
            " exceeds the " +
            source.profile +
            " budget of " +
            bytes(profile.maxBytes),
        );
      }
      const size = webpSize(buffer);
      if (!size) {
        problems.push(output.path + ": not a readable WebP file");
      } else if (size.width !== output.width || size.height !== output.height) {
        problems.push(
          output.path +
            ": is " +
            size.width +
            "x" +
            size.height +
            " but the manifest says " +
            output.width +
            "x" +
            output.height,
        );
      } else if (entry.type === "portrait" && size.width !== size.height) {
        problems.push(
          output.path +
            ": portrait variants must be square, got " +
            size.width +
            "x" +
            size.height,
        );
      } else if (size.width > entry.sourceWidth) {
        problems.push(
          output.path +
            ": " +
            size.width +
            "px is wider than the " +
            entry.sourceWidth +
            "px original (upscaled)",
        );
      }
    });
  });

  if (fs.existsSync(outputRoot)) {
    collectSourceFiles(outputRoot, [".webp"]).forEach((file) => {
      if (!expectedFiles.has(file)) {
        problems.push(
          file.slice(ROOT.length + 1) +
            ": orphaned generated file -- run `npm run images`",
        );
      }
    });
  }

  const mapFile = path.join(ROOT, config.mapPath);
  if (!fs.existsSync(mapFile)) {
    problems.push(config.mapPath + ": missing -- run `npm run images`");
  } else if (fs.readFileSync(mapFile, "utf8") !== renderMap(config, manifest)) {
    problems.push(config.mapPath + ": stale -- run `npm run images`");
  }

  scanReferences(config, manifestKeys, problems);

  if (problems.length) {
    process.stderr.write(
      "images --check found " + problems.length + " problem(s):\n",
    );
    problems.forEach((problem) =>
      process.stderr.write("  - " + problem + "\n"),
    );
    process.exit(1);
  }

  const totalOutput = manifest.entries.reduce(
    (sum, entry) => sum + entry.outputs.reduce((s, o) => s + o.bytes, 0),
    0,
  );
  const variants = manifest.entries.reduce(
    (sum, entry) => sum + entry.outputs.length,
    0,
  );
  process.stdout.write(
    "images --check ok: " +
      manifest.entries.length +
      " sources, " +
      variants +
      " variants, " +
      bytes(totalOutput) +
      " generated\n",
  );
}

// ---------------------------------------------------------------- entry point

function main(argv) {
  const flags = { check: false, force: false, only: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      process.stdout.write(HELP);
      return;
    } else if (arg === "--check") {
      flags.check = true;
    } else if (arg === "--force") {
      flags.force = true;
    } else if (arg === "--only") {
      flags.only = argv[i + 1];
      i += 1;
      if (!flags.only) fail("--only needs a substring");
    } else {
      fail('unknown argument "' + arg + '" (try --help)');
    }
  }

  const config = readConfig();
  if (flags.check) check(config);
  else generate(config, flags);
}

main(process.argv.slice(2));
