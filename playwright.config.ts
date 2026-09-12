import { defineConfig, devices } from "@playwright/test";

/**
 * Browser smoke suite for the production build.
 *
 * The suite runs against `build/` served by `scripts/serve-built-site.cjs`,
 * which reproduces generated route directories and GitHub Pages' 404-to-root
 * restoration. A dev-server SPA fallback cannot prove HTTP status, raw HTML,
 * metadata, trailing-slash redirects, or hydration.
 *
 *   npm run build && npm run test:browser
 *
 * Chromium only. This is a behaviour gate for CI, not the cross-engine visual
 * matrix, which stays a session tool.
 */
const port = Number(process.env.SMOKE_PORT ?? 4390);
// Use a separately generated build when investigating a build-specific failure.
const root = process.env.SMOKE_ROOT ?? "build";
const host = "127.0.0.1";
const baseURL = `http://${host}:${port}`;
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "scripts",
  testMatch: /browser-smoke\.spec\.ts/,
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : undefined,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: isCI ? [["github"], ["list"]] : [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "off",
    // The site is static and offline in this suite; nothing needs a slow net.
    actionTimeout: 10_000,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
  webServer: {
    command: `node scripts/serve-built-site.cjs --root ${root} --port ${port} --host ${host}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 30_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
