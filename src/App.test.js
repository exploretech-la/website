import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import App from "./App";
import GA from "util/GoogleAnalytics";

jest.mock("util/GoogleAnalytics", () => ({
  init: jest.fn(() => true),
  trackPageView: jest.fn(),
  trackEvent: jest.fn(),
}));

let container;
let scrollTo;
const originalScrollIntoView = Element.prototype.scrollIntoView;

beforeEach(() => {
  jest.clearAllMocks();
  container = document.createElement("div");
  document.body.appendChild(container);
  scrollTo = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
  Element.prototype.scrollIntoView = jest.fn();
});

afterEach(() => {
  act(() => {
    ReactDOM.unmountComponentAtNode(container);
  });
  container.remove();
  scrollTo.mockRestore();
  if (originalScrollIntoView)
    Element.prototype.scrollIntoView = originalScrollIntoView;
  else delete Element.prototype.scrollIntoView;
});

it.each(["/our_team", "/our_team/"])(
  "records only the resolved page when entering %s",
  (path) => {
    const history = createMemoryHistory({ initialEntries: [path] });
    act(() => {
      ReactDOM.render(
        <Router history={history}>
          <App />
        </Router>,
        container
      );
    });
    expect(history.location.pathname).toBe("/our_team/leadership");
    expect(GA.trackPageView.mock.calls).toEqual([["/our_team/leadership"]]);
  }
);

it("records a new route with its query but not another view for an anchor", () => {
  const history = createMemoryHistory({ initialEntries: ["/ignite"] });
  act(() => {
    ReactDOM.render(
      <Router history={history}>
        <App />
      </Router>,
      container
    );
  });
  act(() => history.push("/our_team/leadership?source=local"));
  act(() => history.push("/our_team/leadership?source=local#leadership"));
  expect(GA.trackPageView.mock.calls).toEqual([
    ["/ignite"],
    ["/our_team/leadership?source=local"],
  ]);
});
