import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";

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
  click(container.querySelectorAll(".carousel-indicators li")[index]);
};

const fire = (element: HTMLImageElement, type: "load" | "error") => {
  act(() => {
    element.dispatchEvent(new Event(type));
  });
};

/** Longer than the 600ms slide, so the carousel has settled on a slide. */
const settle = () => {
  act(() => {
    vi.advanceTimersByTime(700);
  });
};

beforeEach(() => {
  vi.useFakeTimers();
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
  vi.useRealTimers();
});

it("skips a failed selected image and keeps backward navigation usable", () => {
  act(() => {
    [0, 1, 3, 4].forEach((index) =>
      images[index].dispatchEvent(new Event("load")),
    );
  });
  select(2);
  fire(images[2], "error");
  settle();
  expect(activeImage()).toBe(images[3]);
  click(container.querySelector(".carousel-control-prev"));
  settle();
  expect(activeImage()).toBe(images[1]);
});

it("does not let older image events override the newer selection", () => {
  fire(images[0], "load");
  select(1);
  select(3);
  fire(images[1], "load");
  settle();
  expect(activeImage()).toBe(images[0]);
  fire(images[0], "error");
  fire(images[3], "load");
  settle();
  expect(activeImage()).toBe(images[3]);
});
