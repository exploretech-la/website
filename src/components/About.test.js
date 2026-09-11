import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import About from "./About";

let container;
let images;
const activeImage = () => container.querySelector(".carousel-item.active img");
const select = (index) => {
  act(() => {
    Simulate.click(
      container.querySelectorAll(".carousel-indicators li")[index]
    );
  });
};
const settle = () => {
  act(() => {
    jest.advanceTimersByTime(700);
  });
};

beforeEach(() => {
  jest.useFakeTimers();
  container = document.createElement("div");
  document.body.appendChild(container);
  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
      container
    );
  });
  images = Array.from(container.querySelectorAll(".carousel-item img"));
});

afterEach(() => {
  act(() => {
    ReactDOM.unmountComponentAtNode(container);
  });
  container.remove();
  jest.useRealTimers();
});

it("skips a failed selected image and keeps backward navigation usable", () => {
  act(() => {
    [0, 1, 3, 4].forEach((index) => Simulate.load(images[index]));
  });
  select(2);
  act(() => {
    Simulate.error(images[2]);
  });
  settle();
  expect(activeImage()).toBe(images[3]);
  act(() => {
    Simulate.click(container.querySelector(".carousel-control-prev"));
  });
  settle();
  expect(activeImage()).toBe(images[1]);
});

it("does not let older image events override the newer selection", () => {
  act(() => {
    Simulate.load(images[0]);
  });
  select(1);
  select(3);
  act(() => {
    Simulate.load(images[1]);
  });
  settle();
  expect(activeImage()).toBe(images[0]);
  act(() => {
    Simulate.error(images[0]);
  });
  act(() => {
    Simulate.load(images[3]);
  });
  settle();
  expect(activeImage()).toBe(images[3]);
});
