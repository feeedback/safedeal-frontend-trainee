/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Gallery.css";

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images: [], isModalShown: false, currentImageID: null };
  }

  abortController = new AbortController();

  getImages = async (urls) => {
    try {
      const response = await fetch(urls.getImages(), {
        signal: this.abortController.signal,
      });
      const images = await response.json();
      this.setState({ images });
    } catch (error) {
      throw error;
    }
  };

  componentDidMount() {
    const { urls } = this.props;

    this.getImages(urls);
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  handleModalShow = (event) => {
    event.preventDefault();

    this.setState({ isModalShown: true, currentImageID: event.target.id });
  };

  handleModalHide = (event) => {
    event.preventDefault();

    this.setState({ isModalShown: false });
  };

  render() {
    const { images, currentImageID, isModalShown } = this.state;
    return (
      <>
        <div className="Gallery" onClick={this.handleModalShow}>
          {images.map((img) => (
            <img
              className="Gallery_image"
              key={img.id}
              id={img.id}
              src={img.url}
              alt="img from gallery"
            />
          ))}
        </div>
        {isModalShown
          ? React.cloneElement(this.props.children, {
              id: currentImageID,
              handleModalHide: this.handleModalHide,
            })
          : null}
      </>
    );
  }
}

export default Gallery;
