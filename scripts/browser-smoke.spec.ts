import {
  expect,
  test,
  type Browser,
  type Page,
  type Route,
} from "@playwright/test";

/**
 * Durable browser smoke for the built site.
 *
 * Scope: the behaviour that has broken before and that unit tests cannot see —
 * GitHub Pages deep-link restoration, the mobile menu, hash and history
 * scrolling, team rendering and lazy portraits, the click-to-load video
 * facade, shared document links, and the carousel's slow/failed image paths.
 *
 * Nothing here talks to a third party. Every request that is not same-origin
 * is aborted and recorded, so "no YouTube before activation" and "no analytics
 * beacons" are assertions rather than hopes.
 */

declare global {
  interface Window {
    /** Arguments of each window.scrollTo call, installed by the history test. */
    __scrolls?: unknown[][];
  }
}

const TEAM_SECTIONS = [
  { slug: "leadership", heading: "Leadership" },
  { slug: "content", heading: "Content" },
  { slug: "design", heading: "Design" },
  { slug: "operations", heading: "Operations" },
  { slug: "external", heading: "External" },
  { slug: "web-dev", heading: "Web Dev" },
  { slug: "marketing", heading: "Marketing" },
] as const;

const ROUTES = [
  // The header also carries a `Home` class on the home page, hence `div`.
  { path: "/", marker: "div.Home" },
  { path: "/register", marker: ".Register" },
  { path: "/resources", marker: ".Resources" },
  { path: "/resources2023", marker: ".Resources" },
  { path: "/resources2026", marker: ".Resources" },
  { path: "/ignite", marker: ".Ignite" },
  ...TEAM_SECTIONS.map((section) => ({
    path: `/our_team/${section.slug}`,
    marker: ".Team",
  })),
] as const;

// The Google Fonts stylesheet is a deliberate first-party design choice and is
// merely blocked here; tracking and video vendors must never be reached.
const THIRD_PARTY = /google-analytics|googletagmanager|youtube|doubleclick/;

type Offline = {
  /** Every cross-origin URL the page tried to reach, in order. */
  readonly external: string[];
  /** Uncaught page errors. No route is allowed to produce one. */
  readonly pageErrors: string[];
  /** Same-origin URL fragment whose response waits for `hold.release()`. */
  hold: { fragment: string; wait: Promise<void>; release: () => void } | null;
  /** Same-origin URL fragment whose request fails, modelling a broken asset. */
  fail: string | null;
};

/**
 * Cut a page off from the internet and record what it reached for.
 *
 * The returned object stays live: setting `hold` or `fail` on it shapes
 * later requests, which is how the carousel's slow and broken image paths are
 * exercised without shipping a test-only hook into the app.
 */
async function goOffline(
  page: Page,
  baseURL: string | undefined,
): Promise<Offline> {
  const origin = new URL(baseURL ?? "http://127.0.0.1:4390").origin;
  const state: Offline = {
    external: [],
    pageErrors: [],
    hold: null,
    fail: null,
  };

  page.on("pageerror", (error) => state.pageErrors.push(String(error)));

  await page.route("**/*", async (route: Route) => {
    const url = route.request().url();
    if (!url.startsWith(origin)) {
      state.external.push(url);
      await route.abort();
      return;
    }
    if (state.fail && url.includes(state.fail)) {
      await route.abort("failed");
      return;
    }
    if (state.hold && url.includes(state.hold.fragment)) {
      await state.hold.wait;
    }
    await route.continue();
  });

  return state;
}

function activeTeamNav(page: Page) {
  return page.locator(".team-navigation a.active");
}

function activeSlideAlt(page: Page) {
  return page.locator(".carousel-item.active img").getAttribute("alt");
}

test.describe("routes", () => {
  for (const route of ROUTES) {
    test(`renders ${route.path}`, async ({ page, baseURL }) => {
      const offline = await goOffline(page, baseURL);
      await page.goto(route.path);

      await expect(page.locator(route.marker)).toBeVisible();
      await expect(page.locator(".PageNotFound")).toHaveCount(0);
      await expect(page.locator(".Header")).toBeVisible();
      // Restoration must leave the clean path in the address bar.
      await expect(page).toHaveURL(
        new RegExp(`${route.path.replace(/\//g, "\\/")}$`),
      );
      expect(offline.pageErrors, `uncaught errors on ${route.path}`).toEqual(
        [],
      );
      expect(
        offline.external.filter((url) => THIRD_PARTY.test(url)),
        `third-party requests on ${route.path}`,
      ).toEqual([]);
    });
  }

  test("unknown paths show the not-found page and restore the title", async ({
    page,
    baseURL,
  }) => {
    await goOffline(page, baseURL);
    const response = await page.goto("/no-such-page");
    // GitHub Pages answers with its 404 document before the SPA restores.
    expect(response?.status()).toBe(404);
    await expect(page.locator(".PageNotFound")).toBeVisible();
    await expect(page).toHaveTitle("Page Not Found • exploretech.la");

    await page.locator(".PageNotFound a").first().click();
    await expect(page.locator("div.Home")).toBeVisible();
    await expect(page).not.toHaveTitle("Page Not Found • exploretech.la");
  });

  test("/our_team and its trailing slash land on leadership", async ({
    page,
    baseURL,
  }) => {
    await goOffline(page, baseURL);

    await page.goto("/our_team");
    await expect(page).toHaveURL(/\/our_team\/leadership$/);
    await expect(activeTeamNav(page)).toHaveText("Leadership");

    await page.goto("/our_team/");
    await expect(page).toHaveURL(/\/our_team\/leadership$/);
    await expect(activeTeamNav(page)).toHaveText("Leadership");
  });

  test("a deep link keeps its query and hash through the Pages restore", async ({
    page,
    baseURL,
  }) => {
    await goOffline(page, baseURL);
    const response = await page.goto("/our_team/design?ref=newsletter#top");
    expect(response?.status()).toBe(404);

    await expect(page.locator(".Team")).toBeVisible();
    await expect(activeTeamNav(page)).toHaveText("Design");
    await expect(page).toHaveURL(/\/our_team\/design\?ref=newsletter#top$/);
  });
});

test.describe("team", () => {
  for (const section of TEAM_SECTIONS) {
    test(`${section.slug} lists people`, async ({ page, baseURL }) => {
      await goOffline(page, baseURL);
      await page.goto(`/our_team/${section.slug}`);

      await expect(
        page.getByRole("heading", { name: "Meet Our Team" }),
      ).toBeVisible();
      await expect(activeTeamNav(page)).toHaveCount(1);
      await expect(
        page.locator(".Team h3", { hasText: section.heading }).first(),
      ).toBeVisible();

      const cards = page.locator(".person");
      const count = await cards.count();
      expect(count, `${section.slug} renders no people`).toBeGreaterThan(0);

      // Every card carries text, including the members with no portrait.
      const texts = await cards.evaluateAll((nodes) =>
        nodes.map((node) => (node.textContent ?? "").trim()),
      );
      expect(
        texts.filter((text) => text.length === 0),
        `blank cards in ${section.slug}`,
      ).toEqual([]);
      expect(await cards.locator("img").count()).toBeLessThanOrEqual(count);
    });
  }

  test("portraits past the fold are lazy", async ({ page, baseURL }) => {
    await goOffline(page, baseURL);
    await page.goto("/our_team/leadership");

    const loading = await page
      .locator(".person img")
      .evaluateAll((images) =>
        images.map((image) => (image as HTMLImageElement).loading),
      );
    expect(loading.length).toBeGreaterThan(2);
    // The shared People component keeps the first two eager and defers the rest.
    expect(loading.slice(0, 2)).toEqual(["eager", "eager"]);
    expect(loading.slice(2).every((value) => value === "lazy")).toBe(true);
  });

  test("a member without a portrait still renders", async ({
    page,
    baseURL,
  }) => {
    await goOffline(page, baseURL);
    let cardsWithoutImage = 0;
    for (const section of TEAM_SECTIONS) {
      await page.goto(`/our_team/${section.slug}`);
      await expect(page.locator(".person").first()).toBeVisible();
      cardsWithoutImage += await page.locator(".person:not(:has(img))").count();
    }
    // Two roster members deliberately have no photo; their cards must survive.
    expect(cardsWithoutImage).toBeGreaterThan(0);
  });
});

test.describe("navigation", () => {
  test("dropdown arrow keys retain the first and last item boundaries", async ({
    page,
    baseURL,
  }) => {
    await goOffline(page, baseURL);
    await page.goto("/");
    const trigger = page.locator("#navbar-home");
    await trigger.focus();
    await trigger.press("ArrowUp");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
    await trigger.press("ArrowDown");
    const links = page.locator(".site-menu-link");
    await expect(links.first()).toBeFocused();
    await page.keyboard.press("ArrowUp");
    await expect(links.first()).toBeFocused();
    for (let index = 0; index < 5; index++)
      await page.keyboard.press("ArrowDown");
    await expect(links.last()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });

  test.describe("on a phone", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("the menu opens, navigates and closes", async ({ page, baseURL }) => {
      await goOffline(page, baseURL);
      await page.goto("/");

      const toggle = page.locator(".site-nav-toggle");
      const collapse = page.locator(".site-nav-panel");
      await expect(toggle).toBeVisible();

      await toggle.click();
      await expect(collapse).toHaveClass(/show/);

      await collapse.getByRole("link", { name: "Our Team" }).click();
      await expect(page).toHaveURL(/\/our_team\/leadership$/);
      await expect(collapse).not.toHaveClass(/show/);
    });

    test("a hash link closes the menu and still reaches its section", async ({
      page,
      baseURL,
    }) => {
      await goOffline(page, baseURL);
      await page.goto("/");

      const collapse = page.locator(".site-nav-panel");
      await page.locator(".site-nav-toggle").click();
      await expect(collapse).toHaveClass(/show/);

      await collapse.locator("#navbar-home").click();
      await collapse.getByRole("link", { name: "About", exact: true }).click();

      await expect(collapse).not.toHaveClass(/show/);
      // The final scroll happens after the menu finishes closing, so the
      // section must be at the top once the collapse animation is done.
      await expect
        .poll(() =>
          page
            .locator("#about")
            .evaluate((node) => Math.abs(node.getBoundingClientRect().top)),
        )
        .toBeLessThan(80);
    });
  });

  test("repeating the same hash scrolls back to the section", async ({
    page,
    baseURL,
  }) => {
    await goOffline(page, baseURL);
    await page.goto("/");

    const about = page.locator("#about");
    await expect(about).toHaveCount(1);

    const openAbout = async () => {
      await page.locator("#navbar-home").click();
      await page.getByRole("link", { name: "About", exact: true }).click();
    };

    await openAbout();
    await expect(page).toHaveURL(/#about$/);
    await expect
      .poll(() =>
        about.evaluate((node) => Math.abs(node.getBoundingClientRect().top)),
      )
      .toBeLessThan(80);

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);

    // Same hash again: the location does not change, so the app has to scroll
    // deliberately rather than rely on the browser.
    await openAbout();
    await expect
      .poll(() =>
        about.evaluate((node) => Math.abs(node.getBoundingClientRect().top)),
      )
      .toBeLessThan(80);
  });

  test("a new page starts at the top and Back does not", async ({
    page,
    baseURL,
  }) => {
    await goOffline(page, baseURL);
    await page.goto("/");
    await expect(page.locator("div.Home")).toBeVisible();

    // Record the app's own scrolling. The spy survives client navigation
    // because these are same-document history moves, and it separates "the
    // app scrolled you to the top" from "the browser restored a position",
    // which a scroll offset alone cannot.
    await page.evaluate(() => {
      const scrolls: unknown[][] = [];
      window.__scrolls = scrolls;
      const original = window.scrollTo.bind(window);
      window.scrollTo = (x?: number | ScrollToOptions, y?: number) => {
        if (typeof x === "number") {
          scrolls.push([x, y ?? 0]);
          original(x, y ?? 0);
        } else {
          scrolls.push([x]);
          original(x);
        }
      };
    });
    await page.evaluate(() => window.scrollTo(0, 1200));
    await expect
      .poll(() => page.evaluate(() => Math.round(window.scrollY)))
      .toBeGreaterThan(600);

    await page
      .locator(".Header")
      .getByRole("link", { name: "Our Team" })
      .click();
    await expect(page.locator(".Team")).toBeVisible();
    // A pushed route starts at the top of the new page.
    await expect
      .poll(() => page.evaluate(() => Math.round(window.scrollY)))
      .toBeLessThan(100);
    expect(await page.evaluate(() => window.__scrolls)).toContainEqual([0, 0]);

    await page.evaluate(() => {
      window.__scrolls?.splice(0);
    });
    await page.goBack();
    await expect(page.locator("div.Home")).toBeVisible();
    await page.waitForTimeout(500);

    // Going back must leave scrolling to the browser's restoration.
    const scrollsOnBack = await page.evaluate(() => window.__scrolls);
    expect(scrollsOnBack, "the app scrolled during a Back navigation").toEqual(
      [],
    );
  });
});

test.describe("media", () => {
  test("archived videos load nothing until activated, and keep their box", async ({
    page,
    baseURL,
  }) => {
    const offline = await goOffline(page, baseURL);
    await page.goto("/resources");

    const facade = page.locator(".video-facade").first();
    await expect(facade).toBeVisible();
    expect(
      offline.external.filter((url) => url.includes("youtube")),
      "a video requested YouTube before activation",
    ).toEqual([]);
    await expect(page.locator("iframe")).toHaveCount(0);

    const frame = page.locator(".video-frame").first();
    const before = await frame.boundingBox();

    // Keyboard activation: the facade is a real button, not a clickable div.
    await facade.focus();
    await expect(facade).toBeFocused();
    await page.keyboard.press("Enter");

    const iframe = page.locator(".video-frame iframe").first();
    await expect(iframe).toHaveCount(1);
    await expect(iframe).toHaveAttribute("src", /youtube\.com\/embed\//);

    const after = await frame.boundingBox();
    if (!before || !after) throw new Error("the video frame has no box");
    expect(Math.abs(after.width - before.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(after.height - before.height)).toBeLessThanOrEqual(1);
    // Activation is the only thing that may reach YouTube, and it is blocked here.
    await expect
      .poll(() => offline.external.some((url) => url.includes("youtube")))
      .toBe(true);
  });

  test("shared documents and maps resolve", async ({
    page,
    baseURL,
    request,
  }) => {
    await goOffline(page, baseURL);
    const checked = new Set<string>();

    for (const path of [
      "/resources",
      "/resources2023",
      "/resources2026",
      "/register",
    ]) {
      await page.goto(path);
      const hrefs = await page
        .locator('a[href*="/static/media/"]')
        .evaluateAll((links) =>
          links.map((link) => (link as HTMLAnchorElement).href),
        );
      expect(hrefs.length, `no document links on ${path}`).toBeGreaterThan(0);

      for (const href of hrefs) {
        if (checked.has(href)) continue;
        checked.add(href);
        const response = await request.head(href);
        expect(response.status(), `${href} on ${path}`).toBe(200);
        expect(Number(response.headers()["content-length"])).toBeGreaterThan(0);
      }
    }

    // The test server must not dress a missing asset up as the SPA shell.
    const missing = await request.get(
      "/static/media/not-a-real-file.abcdef12.pdf",
    );
    expect(missing.status()).toBe(404);
    expect(missing.headers()["content-type"]).toContain("text/plain");
  });
});

test.describe("carousel", () => {
  type Slide = { readonly alt: string; readonly asset: string };

  /**
   * Read the slide list from a throwaway context.
   *
   * Slides are responsive, and which srcset candidate the browser picks is
   * not known before it requests one, so slides are identified by the shared
   * part of their filename rather than by one URL. The throwaway context also
   * leaves the real page's HTTP cache empty, which is what lets the held and
   * failed requests reach the route handler at all.
   */
  async function readSlides(
    browser: Browser,
    baseURL: string | undefined,
  ): Promise<Slide[]> {
    const context = await browser.newContext({ baseURL });
    try {
      const page = await context.newPage();
      await goOffline(page, baseURL);
      await page.goto("/");
      await expect(page.locator(".carousel-item.active img")).toBeVisible();
      return await page.locator(".carousel-item img").evaluateAll((images) =>
        images.map((image) => {
          const slide = image as HTMLImageElement;
          const file = new URL(slide.src).pathname.split("/").pop() ?? "";
          return { alt: slide.alt, asset: file.split(/-\d+w\./)[0] };
        }),
      );
    } finally {
      await context.close();
    }
  }

  test("a slow slide keeps the current one visible until it loads", async ({
    browser,
    baseURL,
  }) => {
    const slides = await readSlides(browser, baseURL);
    expect(slides.length).toBeGreaterThan(2);

    const context = await browser.newContext({ baseURL });
    const page = await context.newPage();
    const offline = await goOffline(page, baseURL);
    const { promise, resolve } = Promise.withResolvers<void>();
    offline.hold = {
      fragment: slides[2].asset,
      wait: promise,
      release: resolve,
    };
    // `load` would wait for the held image, so settle on the parsed document.
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".carousel-item.active img")).toBeVisible();

    const firstAlt = await activeSlideAlt(page);
    expect(firstAlt).toBe(slides[0].alt);

    await page.locator(".carousel-indicators li").nth(2).click();
    // The requested slide has not arrived, so the visible one must not change.
    await page.waitForTimeout(1000);
    expect(await activeSlideAlt(page)).toBe(firstAlt);

    offline.hold.release();
    await expect
      .poll(() => activeSlideAlt(page), { timeout: 10_000 })
      .toBe(slides[2].alt);
    expect(offline.pageErrors).toEqual([]);
    await context.close();
  });

  test("a broken slide is skipped and the carousel keeps working", async ({
    browser,
    baseURL,
  }) => {
    const slides = await readSlides(browser, baseURL);
    expect(slides.length).toBeGreaterThan(2);

    const context = await browser.newContext({ baseURL });
    const page = await context.newPage();
    const offline = await goOffline(page, baseURL);
    offline.fail = slides[1].asset;
    await page.goto("/");

    const firstAlt = await activeSlideAlt(page);
    await page.locator(".carousel-indicators li").nth(1).click();

    // The broken slide is passed over rather than displayed or retried.
    await expect
      .poll(() => activeSlideAlt(page), { timeout: 5_000 })
      .toBe(slides[2].alt);
    const seen: (string | null)[] = [];
    for (let sample = 0; sample < 15; sample += 1) {
      seen.push(await activeSlideAlt(page));
      await page.waitForTimeout(200);
    }
    expect(seen, "the broken slide was displayed").not.toContain(slides[1].alt);

    // Selection still works afterwards: the failure did not lock the carousel.
    await page.locator(".carousel-indicators li").nth(0).click();
    await expect
      .poll(() => activeSlideAlt(page), { timeout: 5_000 })
      .toBe(firstAlt);
    expect(offline.pageErrors).toEqual([]);
    await context.close();
  });
});
