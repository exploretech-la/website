import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

import About from "./About";

let container: HTMLDivElement;
let root: Root;
let images: HTMLImageElement[];

const activeImage = () => container.querySelector(".carousel-item.active img");

const click = (element: Element | null | undefined) => {
  act(() => {
    element?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
};

const select = (index: number) => {
  click(container.querySelectorAll(".carousel-indicators button")[index]);
};

const fire = (element: HTMLImageElement, type: "load" | "error") => {
  act(() => {
    element.dispatchEvent(new Event(type));
  });
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => {
    root.render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
  });
  images = Array.from(container.querySelectorAll(".carousel-item img"));
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  container.remove();
});

it("skips a failed selected image and keeps backward navigation usable", () => {
  act(() => {
    [0, 1, 3, 4].forEach((index) =>
      images[index].dispatchEvent(new Event("load")),
    );
  });
  select(2);
  fire(images[2], "error");
  expect(activeImage()).toBe(images[3]);
  click(container.querySelector(".carousel-control-prev"));
  expect(activeImage()).toBe(images[1]);
});

it("does not let older image events override the newer selection", () => {
  fire(images[0], "load");
  select(1);
  select(3);
  fire(images[1], "load");
  expect(activeImage()).toBe(images[0]);
  fire(images[0], "error");
  fire(images[3], "load");
  expect(activeImage()).toBe(images[3]);
});

it("reconciles cached image successes and failures without waiting for new events", () => {
  const complete = vi
    .spyOn(HTMLImageElement.prototype, "complete", "get")
    .mockReturnValue(true);
  const width = vi
    .spyOn(HTMLImageElement.prototype, "naturalWidth", "get")
    .mockImplementation(function (this: HTMLImageElement) {
      return this.alt === "Dev Tools Workshop" ? 0 : 640;
    });
  try {
    act(() =>
      root.render(
        <MemoryRouter key="already-complete">
          <About />
        </MemoryRouter>,
      ),
    );
    images = Array.from(container.querySelectorAll(".carousel-item img"));
    select(1);
    expect(activeImage()).toBe(images[2]);
    click(container.querySelector(".carousel-control-prev"));
    expect(activeImage()).toBe(images[0]);
  } finally {
    complete.mockRestore();
    width.mockRestore();
  }
});
