// Compare emitted public media, not source filenames or bundler import graphs.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
function mediaFiles(root, directory = "") {
  return fs
    .readdirSync(path.join(root, directory), { withFileTypes: true })
    .flatMap((entry) => {
      const relative = path.posix.join(directory, entry.name);
      if (entry.isDirectory()) return mediaFiles(root, relative);
      return /\.(?:png|jpe?g|gif|webp|svg|ico|pdf|woff2?|ttf)$/i.test(
        entry.name,
      )
        ? [relative]
        : [];
    });
}
function manifest(root) {
  return Object.fromEntries(
    mediaFiles(root)
      .sort()
      .map((name) => [
        name,
        crypto
          .createHash("sha256")
          .update(fs.readFileSync(path.join(root, name)))
          .digest("hex"),
      ]),
  );
}
const [baseline, candidate = "build"] = process.argv.slice(2);
if (!baseline)
  throw new Error(
    "Usage: node scripts/asset-parity.cjs <baseline-build-directory> [candidate-build-directory]",
  );
const before = manifest(baseline),
  after = manifest(candidate);
for (const [url, hash] of Object.entries(before))
  assert.equal(after[url], hash, `Public media changed or disappeared: ${url}`);
for (const file of ["404.html", "CNAME"]) {
  assert.ok(
    fs
      .readFileSync(path.join(baseline, file))
      .equals(fs.readFileSync(path.join(candidate, file))),
    `Hosting file changed: ${file}`,
  );
}
console.log(
  `Preserved ${Object.keys(before).length} public asset URLs and SHA-256 hashes; ${Object.keys(after).length - Object.keys(before).length} additions`,
);
