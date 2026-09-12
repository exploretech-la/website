import { vi } from "vitest";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import {
  createMemoryRouter,
  RouterProvider,
  type DataRouter,
} from "react-router-dom";
import App from "./App";
import GA from "../util/GoogleAnalytics";

vi.mock("../util/GoogleAnalytics", () => ({
  default: {
    init: vi.fn(() => true),
    trackPageView: vi.fn(),
    trackEvent: vi.fn(),
    trackOutbound: vi.fn(),
  },
}));
let container: HTMLDivElement;
let root: Root;
let router: DataRouter;

beforeEach(() => {
  vi.clearAllMocks();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});
afterEach(async () => {
  await act(async () => root.unmount());
  router?.dispose();
  container.remove();
  vi.restoreAllMocks();
});
async function renderPath(path: string) {
  router = createMemoryRouter([{ path: "*", element: <App /> }], {
    initialEntries: [path],
  });
  await act(async () => root.render(<RouterProvider router={router} />));
}
it.each(["/our_team", "/our_team/"])(
  "records only the resolved page when entering %s",
  async (path) => {
    await renderPath(path);
    expect(router.state.location.pathname).toBe("/our_team/leadership");
    expect(vi.mocked(GA.trackPageView).mock.calls).toEqual([
      ["/our_team/leadership"],
    ]);
  },
);
it("records a new route with its query but not another view for an anchor", async () => {
  await renderPath("/ignite");
  await act(async () => {
    await router.navigate("/our_team/leadership?source=local");
  });
  await act(async () => {
    await router.navigate("/our_team/leadership?source=local#leadership");
  });
  expect(vi.mocked(GA.trackPageView).mock.calls).toEqual([
    ["/ignite"],
    ["/our_team/leadership?source=local"],
  ]);
});

it("groups static directory URLs and client routes without duplicate pageviews", async () => {
  await renderPath("/events/");
  await act(async () => {
    await router.navigate("/events");
  });
  await act(async () => {
    await router.navigate("/events?source=school");
  });
  expect(vi.mocked(GA.trackPageView).mock.calls).toEqual([
    ["/events"],
    ["/events?source=school"],
  ]);
});

it("keeps metadata consistent with the unknown-team leadership fallback", async () => {
  await renderPath("/our_team/leadership");
  const title = document.title;
  const canonical = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  )?.href;
  await act(async () => {
    await router.navigate("/our_team/not-a-department");
  });
  expect(container.querySelector(".team-content h2")?.textContent).toBe(
    "Leadership",
  );
  expect(document.title).toBe(title);
  expect(
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href,
  ).toBe(canonical);
});
