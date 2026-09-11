// Capture a built site, or compare it with a baseline from the same browser.
// PLAYWRIGHT_MODULE optionally selects an existing local Playwright installation.
const { chromium, firefox, webkit } = require(
  process.env.PLAYWRIGHT_MODULE || "@playwright/test",
);
const fs = require("node:fs/promises");
const path = require("node:path");
const assert = require("node:assert/strict");
const routes = [
  "/",
  "/our_team/leadership",
  "/our_team/content",
  "/our_team/design",
  "/our_team/operations",
  "/our_team/external",
  "/our_team/web-dev",
  "/our_team/marketing",
  "/ignite",
  "/register",
  "/resources",
  "/resources2023",
  "/resources2026",
  "/not-found",
];
const widths = (
  process.env.WIDTHS ||
  "320,390,575,576,577,767,768,769,991,992,993,1199,1200,1201,1440"
)
  .split(",")
  .map(Number);
const base = process.env.SITE_URL || "http://127.0.0.1:4391";
const output =
  process.env.OUTPUT_DIR || "/tmp/exploretech-refactor-baseline/visual";
const engine = process.env.ENGINE || "chromium";
(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await { chromium, firefox, webkit }[engine].launch();
  const results = [];
  try {
    for (const width of widths)
      for (const route of routes) {
        const context = await browser.newContext({
          viewport: { width, height: 900 },
          reducedMotion: "reduce",
        });
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await context.route("**/*", (request) => {
          const url = new URL(request.request().url());
          if (
            url.origin === new URL(base).origin ||
            ["fonts.googleapis.com", "fonts.gstatic.com"].includes(url.hostname)
          )
            return request.continue();
          return request.fulfill({
            status: 200,
            contentType: "text/html",
            body: "External content intercepted for visual capture",
          });
        });
        await page.goto(base + route, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        await page.addStyleTag({
          content:
            "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}html{scroll-behavior:auto!important}",
        });
        // Reveal lazy media before recording, then return to the initial viewport.
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 700) {
            scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 20));
          }
          scrollTo(0, 0);
          await Promise.all(
            Array.from(document.images)
              .filter((i) => i.loading !== "lazy" || i.complete)
              .map((i) => i.decode().catch(() => {})),
          );
        });
        const snapshot = await page.evaluate(() => {
          const selectors =
            ".Header,.Hero,.team-title,.team-navigation,.team-content,.People,.person-image,.Footer,section,h1,h2,h3,h4,p,.card,.content-card,.video-frame,.btn,.action,table";
          const props = [
            "fontFamily",
            "fontSize",
            "fontWeight",
            "lineHeight",
            "color",
            "backgroundColor",
            "paddingTop",
            "paddingRight",
            "paddingBottom",
            "paddingLeft",
            "marginTop",
            "marginRight",
            "marginBottom",
            "marginLeft",
            "borderRadius",
            "objectFit",
            "objectPosition",
            "display",
            "flexDirection",
            "flexWrap",
            "gap",
            "overflowX",
          ];
          return {
            text: document.body.innerText.replace(/\s+/g, " ").trim(),
            title: document.title,
            links: Array.from(document.querySelectorAll("a[href]")).map(
              (a) => ({
                text: a.textContent.trim(),
                href: a.getAttribute("href"),
                target: a.target,
              }),
            ),
            images: Array.from(document.images).map((i) => ({
              alt: i.alt,
              src: new URL(i.src).pathname,
              loading: i.loading,
              width: i.width,
              height: i.height,
            })),
            overflow: document.documentElement.scrollWidth > innerWidth,
            geometry: Array.from(document.querySelectorAll(selectors)).map(
              (e) => {
                const r = e.getBoundingClientRect(),
                  s = getComputedStyle(e);
                return {
                  tag: e.tagName,
                  class: e.className,
                  x: r.x,
                  y: r.y,
                  width: r.width,
                  height: r.height,
                  style: Object.fromEntries(props.map((p) => [p, s[p]])),
                };
              },
            ),
          };
        });
        const name = `${engine}-${width}-${route.replaceAll("/", "_") || "home"}`;
        await page.screenshot({
          path: path.join(output, name + ".png"),
          fullPage: true,
          animations: "disabled",
        });
        await fs.writeFile(
          path.join(output, name + ".json"),
          JSON.stringify(snapshot, null, 2),
        );
        let maxGeometryDelta = 0;
        if (process.env.BASELINE_DIR) {
          const before = JSON.parse(
            await fs.readFile(
              path.join(process.env.BASELINE_DIR, name + ".json"),
              "utf8",
            ),
          );
          const comparable = structuredClone(snapshot);
          assert.equal(
            snapshot.geometry.length,
            before.geometry.length,
            `Element count changed: ${name}`,
          );
          for (let index = 0; index < snapshot.geometry.length; index++) {
            // Class names belong to the implementation, not the visual contract.
            // Retain them in raw snapshots for diagnosis; compare their rendered effects.
            delete comparable.geometry[index].class;
            delete before.geometry[index].class;
            for (const key of ["x", "y", "width", "height"]) {
              const delta = Math.abs(
                snapshot.geometry[index][key] - before.geometry[index][key],
              );
              maxGeometryDelta = Math.max(maxGeometryDelta, delta);
              // Two Chromium layout quanta can differ when React changes text-node boundaries.
              // Keep the raw measurements; tolerate less than 1/20th of a CSS pixel only.
              assert.ok(
                delta <= 0.05,
                `${name} geometry[${index}].${key} changed by ${delta}px`,
              );
              comparable.geometry[index][key] = before.geometry[index][key];
            }
          }
          assert.deepEqual(comparable, before, `Parity failed: ${name}`);
        }
        assert.deepEqual(errors, [], `Application errors: ${name}`);
        results.push({ route, width, name, status: "pass", maxGeometryDelta });
        await fs.writeFile(
          path.join(output, "results.json"),
          JSON.stringify(results, null, 2),
        );
        console.log("Captured", name);
        await context.close();
      }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
