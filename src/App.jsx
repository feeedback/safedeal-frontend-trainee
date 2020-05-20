import React from "react";
import "./App.css";
import Modal from "./Modal.jsx";

const urls = {
  getImages: () => "https://boiling-refuge-66454.herokuapp.com/images",
  getFullImageAndComment: (id) =>
    `https://boiling-refuge-66454.herokuapp.com/images/${id}`,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images: [], currentImageData: {}, isModalShown: false };
  }

  getImages = async () => {
    const response = await fetch(urls.getImages());
    const images = await response.json();

    this.setState({ images });
  };

  componentDidMount() {
    this.getImages();
  }

  handleShownFullImage = async (event) => {
    const {
      target: { id },
    } = event;

    const response = await fetch(urls.getFullImageAndComment(id));
    const currentImageData = await response.json();

    this.setState({ currentImageData, isModalShown: true });
  };

  HandleModalHide = (event) => {
    event.preventDefault();
    this.setState({ isModalShown: false });
  };

  render() {
    const { images, currentImageData, isModalShown } = this.state;

    console.log(images);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-header-h1">Test APP</h1>
        </header>
        <main>
          <div className="gallery" onClick={this.handleShownFullImage}>
            {images.map((img) => (
              <img key={img.id} id={img.id} src={img.url} alt="image" />
            ))}
          </div>
          {isModalShown ? (
            <Modal
              HandleModalHide={this.HandleModalHide}
              currentImageData={currentImageData}
            />
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
