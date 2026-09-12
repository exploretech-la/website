import {
  expect,
  test,
  type Browser,
  type Page,
  type Route,
} from "@playwright/test";
import {
  AUDIENCES,
  PROGRAMS,
  CONTACT_EMAIL,
} from "../src/content/participation";

// Run against generated HTML, not Vite's SPA fallback. Vendor requests are
// blocked even after video activation; no test submits a form or sends email.
const TEAM_SECTIONS = [
  { slug: "leadership", heading: "Leadership" },
  { slug: "content", heading: "Content" },
  { slug: "design", heading: "Design" },
  { slug: "operations", heading: "Operations" },
  { slug: "external", heading: "External" },
  { slug: "web-dev", heading: "Web Dev" },
  { slug: "marketing", heading: "Marketing" },
];
const ARCHIVES = [
  { path: "/register", year: "2021" },
  { path: "/resources", year: "2022" },
  { path: "/resources2023", year: "2023" },
  { path: "/resources2026", year: "2026" },
];
const ROUTES = [
  "/",
  "/events",
  "/get-involved",
  "/ignite",
  ...ARCHIVES.map(({ path }) => path),
  ...TEAM_SECTIONS.map(({ slug }) => `/our_team/${slug}`),
];
const WIDTHS = [320, 390, 768, 1024, 1440];
const THIRD_PARTY = /google-analytics|googletagmanager|youtube|doubleclick/;
type Offline = {
  readonly external: string[];
  readonly pageErrors: string[];
  hold: { fragment: string; wait: Promise<void>; release: () => void } | null;
  fail: string | null;
};

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
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /hydrat|server rendered|Minified React error/i.test(message.text())
    )
      state.pageErrors.push(message.text());
  });
  await page.route("**/*", async (route: Route) => {
    const url = route.request().url();
    if (new URL(url).origin !== origin) {
      state.external.push(url);
      await route.abort();
      return;
    }
    if (state.fail && url.includes(state.fail)) {
      await route.abort("failed");
      return;
    }
    if (state.hold && url.includes(state.hold.fragment)) await state.hold.wait;
    await route.continue();
  });
  return state;
}

async function tabForward(page: Page, browserName: string) {
  // macOS WebKit's native link-navigation shortcut includes controls that Tab skips.
  // This respects the browser preference without changing the user's OS settings.
  await page.keyboard.press(
    browserName === "webkit" && process.platform === "darwin"
      ? "Alt+Tab"
      : "Tab",
  );
}

async function expectNoOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({
    document:
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
    grids: Array.from(
      document.querySelectorAll(".People"),
      (grid) => grid.scrollWidth - grid.clientWidth,
    ),
  }));
  expect(overflow.document, "page has horizontal overflow").toBeLessThanOrEqual(
    1,
  );
  for (const width of overflow.grids)
    expect(width, "people grid clips cards horizontally").toBeLessThanOrEqual(
      1,
    );
}

function activeSlideAlt(page: Page) {
  return page.locator(".carousel-item.active img").getAttribute("alt");
}
function slideButtons(page: Page) {
  return page.locator(".carousel-indicators button");
}

test.describe("routes and generated HTML", () => {
  for (const path of ROUTES) {
    test(`renders and hydrates ${path}`, async ({ page, baseURL }) => {
      const offline = await goOffline(page, baseURL);
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(page.locator("main h1")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toHaveCount(1);
      await expect(page.locator("main footer")).toHaveCount(0);
      await expect(page.locator(".PageNotFound")).toHaveCount(0);
      expect(new URL(page.url()).pathname.replace(/\/$/, "") || "/").toBe(path);
      // Exercise hydrated controls rather than merely waiting for static HTML.
      await page
        .getByRole("link", { name: /skip to (main )?content/i })
        .focus();
      await page.keyboard.press("Enter");
      await expect(page.locator("main")).toBeFocused();
      expect(offline.pageErrors, path).toEqual([]);
      expect(
        offline.external.filter((url) => THIRD_PARTY.test(url)),
        path,
      ).toEqual([]);
    });
  }

  test("every published route has useful HTML and distinct metadata without JavaScript", async ({
    browser,
    baseURL,
    request,
  }) => {
    const context = await browser.newContext({
      baseURL,
      javaScriptEnabled: false,
    });
    const page = await context.newPage();
    await goOffline(page, baseURL);
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    try {
      for (const path of ROUTES) {
        if (path !== "/") {
          const redirect = await request.get(
            `${path}?ref=static&value=one%20two`,
            { maxRedirects: 0 },
          );
          expect(redirect.status(), path).toBe(301);
          expect(redirect.headers().location).toBe(
            `${path}/?ref=static&value=one%20two`,
          );
        }
        const response = await page.goto(path);
        expect(response?.status(), path).toBe(200);
        expect(await response?.text(), path).toMatch(/<h1(?:\s|>)/);
        await expect(page.locator("main h1")).toBeVisible();
        const archive = ARCHIVES.find((entry) => entry.path === path);
        if (archive)
          await expect(page.locator("main h1")).toContainText(archive.year);
        if (path === "/events") {
          for (const program of Object.values(PROGRAMS))
            await expect(
              page.getByText(program.status, { exact: true }),
            ).toBeVisible();
        }
        if (path === "/get-involved") {
          for (const audience of Object.values(AUDIENCES))
            await expect(
              page.getByRole("link", {
                name: audience.actionLabel,
                exact: true,
              }),
            ).toHaveAttribute("href", audience.inquiryHref);
        }
        const title = await page.title();
        const description = await page
          .locator('meta[name="description"]')
          .getAttribute("content");
        expect(title, path).toContain("exploretech.la");
        expect(description?.trim().length, path).toBeGreaterThan(30);
        expect(titles.has(title), `duplicate title on ${path}`).toBe(false);
        expect(
          descriptions.has(description ?? ""),
          `duplicate description on ${path}`,
        ).toBe(false);
        titles.add(title);
        descriptions.add(description ?? "");
        const canonical = await page
          .locator('link[rel="canonical"]')
          .getAttribute("href");
        expect(canonical, path).toMatch(/^https:\/\/www\.exploretech\.la\//);
        expect(
          new URL(canonical ?? "").pathname.replace(/\/$/, "") || "/",
        ).toBe(path);
        await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
          "content",
          title,
        );
        await expect(
          page.locator('meta[property="og:description"]'),
        ).toHaveAttribute("content", description ?? "");
        await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
          "content",
          canonical ?? "",
        );
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
          "content",
          /^https:\/\/.+\/placeholder\.png$/,
        );
        await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
          "content",
          /summary/,
        );
      }
      await page.goto("/");
      await page
        .getByRole("contentinfo")
        .getByRole("link", { name: "Meet the team", exact: true })
        .click();
      await expect(page).toHaveURL(/\/our_team\/leadership\/$/);
      await expect(page.locator(".Team h1")).toBeVisible();
    } finally {
      await context.close();
    }
  });

  test("aliases and unknown paths retain the Pages restoration fallback", async ({
    page,
    baseURL,
    request,
  }) => {
    const offline = await goOffline(page, baseURL);
    for (const path of ["/our_team", "/our_team/"]) {
      expect((await request.get(path, { maxRedirects: 0 })).status()).toBe(404);
      await page.goto(`${path}?ref=newsletter#top`);
      await expect(page).toHaveURL(
        /\/our_team\/leadership\/?\?ref=newsletter#top$/,
      );
      await expect(page.locator(".team-navigation a.active")).toHaveText(
        "Leadership",
      );
    }
    const missing = await request.get("/no-such-page?ref=archive");
    expect(missing.status()).toBe(404);
    await page.goto("/no-such-page?ref=archive#top");
    await expect(page.locator(".PageNotFound")).toBeVisible();
    await expect(page).toHaveURL(/\/no-such-page\?ref=archive#top$/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex,follow",
    );
    const missingTitle = await page.title();
    await page
      .locator(".PageNotFound")
      .getByRole("link", { name: "Explore programs", exact: true })
      .click();
    await expect(page.locator(".Events")).toBeVisible();
    await expect(page).not.toHaveTitle(missingTitle);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "index,follow",
    );
    expect(offline.pageErrors).toEqual([]);
  });

  test("a generated deep link preserves query and hash", async ({
    page,
    baseURL,
  }) => {
    await goOffline(page, baseURL);
    const response = await page.goto("/our_team/design?ref=newsletter#top");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/our_team\/design\/?\?ref=newsletter#top$/);
    await expect(page.locator(".team-navigation a.active")).toHaveText(
      "Design",
    );
  });
});

test.describe("participation and archives", () => {
  test("home audience paths reach real inquiry links, not applications or newsletter substitutes", async ({
    page,
    baseURL,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await goOffline(page, baseURL);
    for (const [id, audience] of Object.entries(AUDIENCES)) {
      await page.goto("/");
      await page.locator(`main a[href="${audience.path}"]`).first().click();
      await expect(page).toHaveURL(new RegExp(`/get-involved#${id}$`));
      const section = page.locator(`#${id}`);
      await expect(section).toBeVisible();
      const inquiry = section.getByRole("link", {
        name: audience.actionLabel,
        exact: true,
      });
      await expect(inquiry).toHaveAttribute("href", audience.inquiryHref);
      await expect(inquiry).toBeInViewport();
      const destination = new URL((await inquiry.getAttribute("href")) ?? "");
      expect(destination.protocol).toBe("mailto:");
      expect(destination.pathname).toBe(CONTACT_EMAIL);
      expect(destination.searchParams.get("subject")).toBeTruthy();
    }
  });

  test("program status and inquiry actions stay consistent", async ({
    page,
    baseURL,
  }) => {
    await goOffline(page, baseURL);
    await page.goto("/events");
    for (const program of Object.values(PROGRAMS)) {
      await expect(
        page.getByText(program.status, { exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: program.actionLabel, exact: true }),
      ).toHaveAttribute("href", program.inquiryHref);
    }
    await page.goto("/ignite");
    await expect(
      page.getByText(PROGRAMS.ignite.status, { exact: true }).first(),
    ).toBeVisible();
    for (const inquiry of await page
      .getByRole("link", { name: PROGRAMS.ignite.actionLabel, exact: true })
      .all()) {
      await expect(inquiry).toHaveAttribute(
        "href",
        PROGRAMS.ignite.inquiryHref,
      );
    }
    await expect(page.locator("main")).toContainText(/2026/);
    await expect(page.locator("main")).not.toContainText(
      /currently accepting|four.week|4.week/i,
    );
    await expect(
      page.getByRole("link", { name: /apply|sign up|rsvp/i }),
    ).toHaveCount(0);
  });

  for (const archive of ARCHIVES) {
    test(`${archive.year} is an archive, not an active attendance or feedback flow`, async ({
      page,
      baseURL,
    }) => {
      await goOffline(page, baseURL);
      await page.goto(archive.path);
      await expect(page.locator("main h1")).toContainText(archive.year);
      await expect(page.locator("main h1")).toContainText(/archive/i);
      await expect(
        page.locator('main a[href*="zoom.us"], main a[href*="socio.events"]'),
      ).toHaveCount(0);
      await expect(
        page
          .locator("main")
          .getByRole("button", { name: /feedback|register|apply/i }),
      ).toHaveCount(0);
      await expect(
        page.locator("main").getByRole("link", {
          name: /submit.*feedback|register now|apply now/i,
        }),
      ).toHaveCount(0);
      await page.goto("/events");
      await expect(
        page.locator(`main a[href="${archive.path}"]`).first(),
      ).toContainText(archive.year);
    });
  }

  test("event shortcuts and workshop filtering expose compact, recoverable details", async ({
    page,
    baseURL,
  }) => {
    await goOffline(page, baseURL);
    await page.goto("/resources2026");
    const navigation = page.getByRole("navigation", { name: "Event sections" });
    for (const [name, id] of [
      ["Schedule", "schedule"],
      ["Workshops", "workshops"],
      ["Maps", "maps"],
      ["Help", "help"],
    ]) {
      await navigation.getByRole("link", { name, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`#${id}`)).toBeInViewport();
      await expect(page.locator(`#${id}`)).toBeFocused();
    }
    const search = page.getByRole("searchbox", {
      name: "Filter workshops and panels",
    });
    const details = page.locator("#workshops details");
    const count = await details.count();
    expect(count).toBeGreaterThan(1);
    await expect(details.first()).not.toHaveAttribute("open", "");
    await details.first().locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(details.first()).toHaveAttribute("open", "");
    await search.fill("no-such-workshop-xyz");
    await expect(
      page.getByText("No workshops or panels match your search."),
    ).toBeVisible();
    await expect(page.locator("#workshops [role=status]")).toContainText(
      `0 of ${count}`,
    );
    await page
      .getByRole("button", { name: "Clear filter", exact: true })
      .click();
    await expect(search).toHaveValue("");
    await expect(details).toHaveCount(count);
    await expect(page.locator("#workshops [role=status]")).toContainText(
      `${count} of ${count}`,
    );
  });

  for (const path of ["/register", "/resources"]) {
    test(`FAQ keyboard expansion and named panels on ${path}`, async ({
      page,
      baseURL,
    }) => {
      await goOffline(page, baseURL);
      await page.goto(path);
      const questions = page.locator(
        ".FAQ button[aria-expanded][aria-controls]",
      );
      expect(await questions.count()).toBeGreaterThan(0);
      for (const question of await questions.all()) {
        await expect(question).toHaveAccessibleName(/\S/);
        const id = await question.getAttribute("aria-controls");
        if (!id) throw new Error("FAQ has no panel target");
        const panel = page.locator(`[id="${id}"]`);
        await expect(question).toHaveAttribute("aria-expanded", "false");
        await question.focus();
        await page.keyboard.press("Enter");
        await expect(question).toHaveAttribute("aria-expanded", "true");
        await expect(panel).toBeVisible();
        await expect(panel).toHaveAttribute("role", "region");
        await expect(panel).toHaveAttribute(
          "aria-labelledby",
          (await question.getAttribute("id")) ?? "",
        );
        await expect(panel).toHaveAccessibleName(/\S/);
        await page.keyboard.press("Space");
        await expect(question).toHaveAttribute("aria-expanded", "false");
        await expect(panel).not.toBeVisible();
      }
    });
  }
});

test.describe("responsive layout and controls", () => {
  for (const width of WIDTHS) {
    test(`${width}px keeps the mission and all seven team grids readable`, async ({
      page,
      baseURL,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await goOffline(page, baseURL);
      await page.goto("/");
      await expect(page.locator("main h1")).toBeInViewport();
      await expect(page.locator("main h1")).toContainText(
        /high school students/i,
      );
      await expectNoOverflow(page);
      for (const section of TEAM_SECTIONS) {
        await page.goto(`/our_team/${section.slug}`);
        await expect(
          page.getByRole("heading", { name: section.heading, exact: true }),
        ).toBeVisible();
        await expect(page.locator(".team-navigation a.active")).toHaveText(
          section.heading,
        );
        const cards = page.locator(".person");
        expect(await cards.count()).toBeGreaterThan(0);
        for (const text of await cards.allTextContents())
          expect(text.trim()).not.toBe("");
        await expectNoOverflow(page);
      }
      for (const path of [
        "/events",
        "/get-involved",
        "/ignite",
        "/resources2026",
        "/register",
      ]) {
        await page.goto(path);
        await expectNoOverflow(page);
      }
    });
  }

  test("core controls meet touch size, primary contrast, and visible keyboard focus", async ({
    page,
    baseURL,
    browserName,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await goOffline(page, baseURL);
    for (const path of [
      "/",
      "/events",
      "/get-involved",
      "/ignite",
      "/our_team/design",
      "/resources2026",
      "/register",
    ]) {
      await page.goto(path);
      const controls = page.locator(
        ".action, .site-nav-toggle, .team-navigation a, #team-department, .photo-gallery button, .FAQ button, main summary, main input[type=search], .section-links a, .participation-section > a.text-link",
      );
      for (const control of await controls.all()) {
        if (!(await control.isVisible())) continue;
        const box = await control.boundingBox();
        expect(
          Math.round((box?.width ?? 0) * 100) / 100,
          `${path}: ${await control.innerText()}`,
        ).toBeGreaterThanOrEqual(44);
        expect(
          Math.round((box?.height ?? 0) * 100) / 100,
          `${path}: ${await control.innerText()}`,
        ).toBeGreaterThanOrEqual(44);
      }
      for (const action of await page.locator(".action-primary").all()) {
        if (!(await action.isVisible())) continue;
        const ratio = await action.evaluate((node) => {
          const style = getComputedStyle(node);
          const luminance = (color: string) => {
            const [r = 0, g = 0, b = 0] = (color.match(/[\d.]+/g) ?? [])
              .slice(0, 3)
              .map(Number)
              .map((channel) => {
                const value = channel / 255;
                return value <= 0.04045
                  ? value / 12.92
                  : ((value + 0.055) / 1.055) ** 2.4;
              });
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
          };
          const foreground = luminance(style.color);
          const background = luminance(style.backgroundColor);
          return (
            (Math.max(foreground, background) + 0.05) /
            (Math.min(foreground, background) + 0.05)
          );
        });
        expect(ratio, `${path}: primary text contrast`).toBeGreaterThanOrEqual(
          4.5,
        );
        await tabForward(page, browserName);
        await action.focus();
        expect(
          await action.evaluate((node) => {
            const style = getComputedStyle(node);
            return (
              node.matches(":focus-visible") &&
              ((style.outlineStyle !== "none" &&
                parseFloat(style.outlineWidth) > 0) ||
                style.boxShadow !== "none")
            );
          }),
          `${path}: no visible keyboard focus`,
        ).toBe(true);
      }
    }
  });

  test("the phone department selector reaches every team without a horizontal strip", async ({
    page,
    baseURL,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await goOffline(page, baseURL);
    await page.goto("/our_team/leadership");
    const department = page.getByRole("combobox", { name: "Department" });
    await department.focus();
    for (const section of TEAM_SECTIONS) {
      await department.selectOption(section.slug);
      await expect(page).toHaveURL(new RegExp(`/our_team/${section.slug}/?$`));
      await expect(page.locator(".team-content h2")).toHaveText(
        section.heading,
      );
      await expect(department).toHaveValue(section.slug);
      await expect(department).toBeFocused();
      await expectNoOverflow(page);
    }
  });

  test("missing portraits retain identity and offscreen portraits stay deferred", async ({
    page,
    baseURL,
  }) => {
    await goOffline(page, baseURL);
    await page.goto("/our_team/leadership");
    const loading = await page
      .locator(".person img")
      .evaluateAll((images) =>
        images.map((image) => image.getAttribute("loading")),
      );
    expect(loading).toContain("eager");
    expect(loading).toContain("lazy");
    for (const profile of await page.locator(".person-profile").all()) {
      const name = (await profile.locator(".person-name").innerText())
        .replace(/\s+/g, " ")
        .trim();
      const role = (await profile.locator(".person-title").innerText())
        .replace(/\s+/g, " ")
        .trim();
      await expect(profile).toHaveAccessibleName(`${name} ${role}`);
    }
    let missing = 0;
    for (const section of TEAM_SECTIONS) {
      await page.goto(`/our_team/${section.slug}`);
      for (const card of await page.locator(".person:not(:has(img))").all()) {
        missing += 1;
        await expect(card.locator(".person-name")).toHaveText(/\S/);
        await expect(card.locator(".person-image")).toHaveText(/\S/);
      }
    }
    expect(missing).toBeGreaterThan(0);
  });
});

test.describe("keyboard navigation and history", () => {
  test("desktop menus support native keyboard navigation and return focus on Escape", async ({
    page,
    baseURL,
    browserName,
  }) => {
    await goOffline(page, baseURL);
    await page.goto("/");
    const about = page.getByRole("button", { name: "About", exact: true });
    await about.focus();
    await page.keyboard.press("Enter");
    await expect(about).toHaveAttribute("aria-expanded", "true");
    await tabForward(page, browserName);
    await expect(
      page.getByRole("link", { name: "Our story", exact: true }),
    ).toBeFocused();
    await tabForward(page, browserName);
    await expect(
      page.getByRole("link", { name: "Our Team", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(about).toHaveAttribute("aria-expanded", "false");
    await expect(about).toBeFocused();
  });

  test("skip link is first, phone menu closes on navigation and Escape", async ({
    page,
    baseURL,
    browserName,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await goOffline(page, baseURL);
    await page.goto("/");
    const skip = page.getByRole("link", { name: /skip to (main )?content/i });
    await tabForward(page, browserName);
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
    const toggle = page.locator(".site-nav-toggle");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
    await toggle.click();
    await page
      .locator(".site-nav-panel")
      .getByRole("button", { name: "About", exact: true })
      .click();
    await page
      .locator(".site-nav-panel")
      .getByRole("link", { name: /Our Team/i })
      .click();
    await expect(page).toHaveURL(/\/our_team\/leadership\/?$/);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("main h1")).toBeFocused();
  });

  test("repeated home hashes scroll again after the phone menu closes", async ({
    page,
    baseURL,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await goOffline(page, baseURL);
    await page.goto("/");
    const about = page.locator("#about");
    for (let index = 0; index < 2; index += 1) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.locator(".site-nav-toggle").click();
      await page
        .locator(".site-nav-panel")
        .getByRole("button", { name: "About", exact: true })
        .click();
      await page.locator('.site-nav-panel a[href="/#about"]').click();
      await expect(page.locator(".site-nav-toggle")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
      await expect(page).toHaveURL(/#about$/);
      await expect
        .poll(() =>
          about.evaluate((node) => Math.abs(node.getBoundingClientRect().top)),
        )
        .toBeLessThan(100);
    }
  });

  test("reduced-motion phone hash focus does not wait for an animation timeout", async ({
    page,
    baseURL,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await goOffline(page, baseURL);
    await page.goto("/");
    await page.locator(".site-nav-toggle").click();
    await expect(page.locator(".site-nav-panel")).toHaveClass(/\bshow\b/);
    await page.clock.install();
    await page
      .locator(".site-nav-panel")
      .getByRole("button", { name: "About", exact: true })
      .click();
    await page.locator('.site-nav-panel a[href="/#about"]').click();
    // No clock advancement: the old 300ms fallback would leave this unsettled.
    await expect(page.locator(".site-nav-panel")).not.toHaveClass(
      /disclosure-transition|\bshow\b/,
    );
    await expect(page.locator("#about")).toBeFocused();
    await expect
      .poll(() =>
        page
          .locator("#about")
          .evaluate((node) => Math.abs(node.getBoundingClientRect().top)),
      )
      .toBeLessThan(40);
  });

  test("pushed pages focus their heading at the top; Back restores the reading position", async ({
    page,
    baseURL,
  }) => {
    await goOffline(page, baseURL);
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 1200));
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(600);
    const previous = await page.evaluate(() => window.scrollY);
    // Trigger the link without Playwright scrolling the header into view first.
    await page
      .locator('.Header a[href="/our_team/leadership"]')
      .evaluate((node) => {
        if (node instanceof HTMLElement) node.click();
      });
    await expect(page.locator("main h1")).toBeFocused();
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeLessThan(100);
    await page.goBack();
    await expect(page.locator("div.Home")).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(600);
    expect(
      Math.abs((await page.evaluate(() => window.scrollY)) - previous),
    ).toBeLessThan(100);
  });
});

test.describe("media", () => {
  test("footer links and archived video buttons have specific names; activation keeps geometry and moves focus", async ({
    page,
    baseURL,
  }) => {
    const offline = await goOffline(page, baseURL);
    await page.goto("/resources");
    for (const link of await page
      .getByRole("contentinfo")
      .getByRole("link")
      .all())
      await expect(link).toHaveAccessibleName(/\S/);
    for (const summary of await page
      .locator("#workshops details summary")
      .all())
      await summary.click();
    const facades = page.locator(".video-facade");
    expect(await facades.count()).toBeGreaterThan(1);
    const names = [];
    for (const facade of await facades.all()) {
      await expect(facade).toHaveAccessibleName(/^Play video: .+/);
      await expect(facade).not.toHaveAccessibleName(/Embedded youtube/i);
      names.push(await facade.getAttribute("aria-label"));
    }
    expect(new Set(names).size).toBe(names.length);
    expect(offline.external.filter((url) => url.includes("youtube"))).toEqual(
      [],
    );
    await expect(page.locator("iframe")).toHaveCount(0);
    const facade = facades.first();
    const frame = page.locator(".video-frame").first();
    const before = await frame.boundingBox();
    await facade.focus();
    await page.keyboard.press("Enter");
    const iframe = page.locator(".video-frame iframe").first();
    await expect(iframe).toHaveAttribute("src", /youtube\.com\/embed\//);
    await expect(iframe).toHaveAttribute("title", /\S/);
    await expect(iframe).toBeFocused();
    const after = await frame.boundingBox();
    if (!before || !after) throw new Error("video frame has no reserved box");
    expect(Math.abs(after.width - before.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(after.height - before.height)).toBeLessThanOrEqual(1);
    expect(Math.abs(before.width / before.height - 16 / 9)).toBeLessThan(0.02);
    await expect
      .poll(() => offline.external.some((url) => url.includes("youtube")))
      .toBe(true);
    expect(offline.pageErrors).toEqual([]);
  });

  test("shared documents retain working URLs, format and truthful size labels", async ({
    page,
    baseURL,
    request,
  }) => {
    await goOffline(page, baseURL);
    const checked = new Set<string>();
    for (const { path } of ARCHIVES) {
      await page.goto(path);
      const links = page.locator('main a[href*="/static/media/"]');
      expect(await links.count(), path).toBeGreaterThan(0);
      for (const link of await links.all()) {
        const href = await link.getAttribute("href");
        if (!href) throw new Error("document has no URL");
        await expect(link).toContainText(/PDF|JPG|PNG/);
        await expect(link).toContainText(/\d+(?:\.\d+)?\s*(?:MB|kB)/);
        await expect(link).toContainText(/opens in a new tab/i);
        if (checked.has(href)) continue;
        checked.add(href);
        const response = await request.head(href);
        expect(response.status(), `${path}: ${href}`).toBe(200);
        const bytes = Number(response.headers()["content-length"]);
        expect(bytes).toBeGreaterThan(0);
        const label =
          bytes >= 1_000_000
            ? `${(bytes / 1_000_000).toFixed(1)} MB`
            : `${(bytes / 1000).toFixed(1)} kB`;
        await expect(link).toContainText(label);
      }
    }
    const missing = await request.get(
      "/static/media/not-a-real-file.abcdef12.pdf",
    );
    expect(missing.status()).toBe(404);
    expect(missing.headers()["content-type"]).toContain("text/plain");
  });
});

test.describe("manual gallery", () => {
  type Slide = { readonly alt: string; readonly asset: string };
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
          const file =
            new URL(image.getAttribute("src") ?? "", location.href).pathname
              .split("/")
              .pop() ?? "";
          return {
            alt: image.getAttribute("alt") ?? "",
            asset: file.split(/-\d+w\./)[0] ?? file,
          };
        }),
      );
    } finally {
      await context.close();
    }
  }

  for (const reducedMotion of ["reduce", "no-preference"] satisfies Array<
    "reduce" | "no-preference"
  >) {
    test(`keyboard dots select manually with no autoplay (${reducedMotion})`, async ({
      page,
      baseURL,
    }) => {
      await page.emulateMedia({ reducedMotion });
      await goOffline(page, baseURL);
      await page.goto("/");
      const buttons = slideButtons(page);
      expect(await buttons.count()).toBeGreaterThan(2);
      for (const button of await buttons.all())
        await expect(button).toHaveAccessibleName(/\S/);
      const initial = await activeSlideAlt(page);
      await page.clock.install();
      await page.clock.fastForward(20_000);
      expect(await activeSlideAlt(page)).toBe(initial);
      await buttons.nth(1).focus();
      await page.keyboard.press("Enter");
      await expect.poll(() => activeSlideAlt(page)).not.toBe(initial);
      await expect(buttons.nth(1)).toHaveAttribute("aria-pressed", "true");
      const selected = await activeSlideAlt(page);
      await page.clock.fastForward(20_000);
      expect(await activeSlideAlt(page)).toBe(selected);
      if (reducedMotion === "reduce") {
        expect(
          await page
            .locator(".photo-gallery")
            .evaluate(
              (node) =>
                node
                  .getAnimations({ subtree: true })
                  .filter((animation) => animation.playState === "running")
                  .length,
            ),
        ).toBe(0);
      }
      await page
        .getByRole("button", { name: "Previous photo", exact: true })
        .click();
      await expect.poll(() => activeSlideAlt(page)).toBe(initial);
      await page
        .getByRole("button", { name: "Next photo", exact: true })
        .click();
      await expect.poll(() => activeSlideAlt(page)).toBe(selected);
      await expect(page.locator(".gallery-status")).toContainText(
        selected ?? "",
      );
    });
  }

  test("a slow selection keeps the visible slide and a stale load cannot replace a newer selection", async ({
    browser,
    baseURL,
  }) => {
    const slides = await readSlides(browser, baseURL);
    const first = slides[0];
    const slow = slides[2];
    const newer = slides[3];
    if (!first || !slow || !newer)
      throw new Error("gallery needs four authored slides for this regression");
    const context = await browser.newContext({ baseURL });
    const page = await context.newPage();
    const offline = await goOffline(page, baseURL);
    const { promise, resolve } = Promise.withResolvers<void>();
    offline.hold = { fragment: slow.asset, wait: promise, release: resolve };
    try {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await expect.poll(() => activeSlideAlt(page)).toBe(first.alt);
      await slideButtons(page).nth(2).click();
      await page.waitForTimeout(500);
      expect(await activeSlideAlt(page)).toBe(first.alt);
      await slideButtons(page).nth(3).click();
      await expect.poll(() => activeSlideAlt(page)).toBe(newer.alt);
      resolve();
      await page.waitForLoadState("load");
      await page.waitForTimeout(500);
      expect(await activeSlideAlt(page)).toBe(newer.alt);
      await slideButtons(page).nth(2).click();
      await expect.poll(() => activeSlideAlt(page)).toBe(slow.alt);
      expect(offline.pageErrors).toEqual([]);
    } finally {
      resolve();
      await context.close();
    }
  });

  test("a broken slide is skipped without locking manual selection", async ({
    browser,
    baseURL,
  }) => {
    const slides = await readSlides(browser, baseURL);
    const first = slides[0];
    const broken = slides[1];
    const next = slides[2];
    if (!first || !broken || !next)
      throw new Error(
        "gallery needs three authored slides for this regression",
      );
    const context = await browser.newContext({ baseURL });
    const page = await context.newPage();
    const offline = await goOffline(page, baseURL);
    offline.fail = broken.asset;
    try {
      await page.goto("/");
      await slideButtons(page).nth(1).click();
      await expect.poll(() => activeSlideAlt(page)).toBe(next.alt);
      expect(await activeSlideAlt(page)).not.toBe(broken.alt);
      await slideButtons(page).nth(0).click();
      await expect.poll(() => activeSlideAlt(page)).toBe(first.alt);
      expect(offline.pageErrors).toEqual([]);
    } finally {
      await context.close();
    }
  });
});
