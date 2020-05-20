import React from "react";
import "./App.css";
import Modal from "./Modal.jsx";

export const urls = {
  getImages: () => "https://boiling-refuge-66454.herokuapp.com/images",
  getFullImageAndComment: (id) =>
    `https://boiling-refuge-66454.herokuapp.com/images/${id}`,
  postCommentToImage: (id) =>
    `https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images: [], isModalShown: false };
  }

  abortController = new AbortController();

  getImages = async () => {
    const response = await fetch(urls.getImages(), {
      signal: this.abortController.signal,
    });
    const images = await response.json();

    this.setState({ images });
  };

  componentDidMount() {
    this.getImages();
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  handleModalShow = (event) => {
    const {
      target: { id },
    } = event;

    this.setState({ isModalShown: true, currentImageID: id });
  };

  handleModalHide = (event) => {
    event.preventDefault();
    this.setState({ isModalShown: false });
  };

  render() {
    const { images, currentImageID, isModalShown } = this.state;

    console.log(images);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-header-h1">Test APP</h1>
        </header>
        <main>
          <div className="gallery" onClick={this.handleModalShow}>
            {images.map((img) => (
              <img
                key={img.id}
                id={img.id}
                src={img.url}
                alt="img from gallery"
              />
            ))}
          </div>
          {isModalShown ? (
            <Modal id={currentImageID} handleModalHide={this.handleModalHide} />
          ) : null}
        </main>
        <footer className="App-footer">
          <p className="App-footer-p">© 2018-2019</p>
        </footer>
      </div>
    );
  }
}
export default App;
