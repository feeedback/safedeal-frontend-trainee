import React from "react";
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import App from "./App.jsx";

let container = null;
beforeEach(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // подчищаем после завершения
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("render header", () => {
  act(() => {
    render(<App />, container);
  });

  const linkElement = document.querySelector("header > h1");
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.textContent).toBe("Test APP");
});
