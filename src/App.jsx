import React from "react";
import "./App.css";
import Gallery from "./Gallery.jsx";
import Modal from "./Modal.jsx";

const urls = {
  getImages: () => "https://boiling-refuge-66454.herokuapp.com/images",
  getFullImageAndComment: (id) =>
    `https://boiling-refuge-66454.herokuapp.com/images/${id}`,
  postCommentToImage: (id) =>
    `https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`,
};

const App = (props) => {
  return (
    <div className="App">
      <header className="App_header">
        <h1 className="App_header_h1">Test APP</h1>
      </header>
      <main className="App_main">
        <Gallery urls={urls}>
          <Modal urls={urls} />
        </Gallery>
      </main>
      <footer className="App_footer">
        <p className="App_footer_p">© 2018-2019</p>
      </footer>
    </div>
  );
};
export default App;
