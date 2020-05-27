import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
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

it("render right header text", () => {
  act(() => {
    render(<App />, container);
  });

  const linkElement = document.querySelector("header > h1");
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.textContent).toBe("Test APP");
});

it("should render App", () => {
  act(() => {
    render(<App />, container);
    // получаем элемент button и кликаем на него несколько раз
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"App\\">
      <header class=\\"App_header\\">
        <h1 class=\\"App_header_h1\\">Test APP</h1>
      </header>
      <main class=\\"App_main\\">
        <div class=\\"Gallery\\"></div>
      </main>
      <footer class=\\"App_footer\\">
        <p class=\\"App_footer_p\\">© 2018-2019</p>
      </footer>
    </div>"
  `); /* ... автоматически заполняется Jest ... */
});

it("fetch mock and Modal open/close", async () => {
  const fakeImages = [
    { id: 237, url: "https://picsum.photos/id/237/300/200" },
    { id: 238, url: "https://picsum.photos/id/238/300/200" },
    { id: 239, url: "https://picsum.photos/id/239/300/200" },
    { id: 240, url: "https://picsum.photos/id/240/300/200" },
    { id: 241, url: "https://picsum.photos/id/241/300/200" },
    { id: 242, url: "https://picsum.photos/id/242/300/200" },
  ];

  const fakeImageData = {
    id: 237,
    url: "https://picsum.photos/id/237/600/400",
    comments: [{ id: 153, text: "Крутая фотка", date: 1578054737927 }],
  };

  const urls = {
    getImages: () => "https://boiling-refuge-66454.herokuapp.com/images",
    getFullImageAndComment: (id) =>
      `https://boiling-refuge-66454.herokuapp.com/images/${id}`,
    postNewCommentToImage: (id) =>
      `https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`,
  };
  jest.spyOn(global, "fetch").mockImplementation((url) => {
    switch (url) {
      case urls.getImages():
        return Promise.resolve({
          json: () => Promise.resolve(fakeImages),
        });

      case urls.getFullImageAndComment(237):
        return Promise.resolve({
          json: () => Promise.resolve(fakeImageData),
        });

      default:
        console.log("WHY");
    }
  });

  // Используем act асинхронно, чтобы передать успешно завершённые промисы
  await act(async () => {
    render(<App />, container);
  });

  const imgClickable = document.querySelector(".Gallery_image");
  expect(imgClickable).not.toBe(null);

  imgClickable.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"App\\">
      <header class=\\"App_header\\">
        <h1 class=\\"App_header_h1\\">Test APP</h1>
      </header>
      <main class=\\"App_main\\">
        <div class=\\"Gallery\\"><img class=\\"Gallery_image\\" id=\\"237\\" src=\\"https://picsum.photos/id/237/300/200\\" alt=\\"img from gallery\\"><img class=\\"Gallery_image\\" id=\\"238\\" src=\\"https://picsum.photos/id/238/300/200\\" alt=\\"img from gallery\\"><img class=\\"Gallery_image\\" id=\\"239\\" src=\\"https://picsum.photos/id/239/300/200\\" alt=\\"img from gallery\\"><img class=\\"Gallery_image\\" id=\\"240\\" src=\\"https://picsum.photos/id/240/300/200\\" alt=\\"img from gallery\\"><img class=\\"Gallery_image\\" id=\\"241\\" src=\\"https://picsum.photos/id/241/300/200\\" alt=\\"img from gallery\\"><img class=\\"Gallery_image\\" id=\\"242\\" src=\\"https://picsum.photos/id/242/300/200\\" alt=\\"img from gallery\\"></div>
        <div id=\\"ModalWindow\\" class=\\"Modal\\">
          <div class=\\"Modal_contentWrapper\\"><img class=\\"Modal_LargeImage\\" alt=\\"Large img\\">
            <section class=\\"Modal_Comments\\"></section>
            <form class=\\"Modal_FormNewComment\\" name=\\"addComment\\" action=\\"\\" method=\\"\\"><input class=\\"Modal_FormNewComment_input\\" type=\\"text\\" name=\\"author\\" placeholder=\\"Ваше имя\\" required=\\"\\" value=\\"\\"><input class=\\"Modal_FormNewComment_input\\" type=\\"text\\" name=\\"commentText\\" placeholder=\\"Ваш комментарий\\" required=\\"\\" value=\\"\\"><input class=\\"Modal_FormNewComment_input Modal_FormNewComment_submit\\" type=\\"submit\\" value=\\"Оставить комментарий\\"></form><a href=\\"\\" title=\\"Закрыть\\" class=\\"Modal_closeButton\\"></a>
          </div><a href=\\"\\" class=\\"Modal_blurFullWindow\\"></a>
        </div>
      </main>
      <footer class=\\"App_footer\\">
        <p class=\\"App_footer_p\\">© 2018-2019</p>
      </footer>
    </div>"
  `);

  const closeModalButton = document.querySelector(".Modal_closeButton");
  expect(closeModalButton).not.toBe(null);

  closeModalButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"App\\">
      <header class=\\"App_header\\">
        <h1 class=\\"App_header_h1\\">Test APP</h1>
      </header>
      <main class=\\"App_main\\">
        <div class=\\"Gallery\\"><img class=\\"Gallery_image\\" id=\\"237\\" src=\\"https://picsum.photos/id/237/300/200\\" alt=\\"img from gallery\\"><img class=\\"Gallery_image\\" id=\\"238\\" src=\\"https://picsum.photos/id/238/300/200\\" alt=\\"img from gallery\\"><img class=\\"Gallery_image\\" id=\\"239\\" src=\\"https://picsum.photos/id/239/300/200\\" alt=\\"img from gallery\\"><img class=\\"Gallery_image\\" id=\\"240\\" src=\\"https://picsum.photos/id/240/300/200\\" alt=\\"img from gallery\\"><img class=\\"Gallery_image\\" id=\\"241\\" src=\\"https://picsum.photos/id/241/300/200\\" alt=\\"img from gallery\\"><img class=\\"Gallery_image\\" id=\\"242\\" src=\\"https://picsum.photos/id/242/300/200\\" alt=\\"img from gallery\\"></div>
      </main>
      <footer class=\\"App_footer\\">
        <p class=\\"App_footer_p\\">© 2018-2019</p>
      </footer>
    </div>"
  `);
  // выключаем фиктивный fetch, чтобы убедиться, что тесты полностью изолированы
  global.fetch.mockRestore();
});
