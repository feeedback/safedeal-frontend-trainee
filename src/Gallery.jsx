/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Gallery.css";

class Gallery extends React.PureComponent {
  getImages = async (urls, signal) => {
    try {
      const response = await fetch(urls.getImages(), { signal });
      const images = await response.json();
      return images;
    } catch (error) {
      throw error;
    }
  };

  abortController = new AbortController();

  constructor(props) {
    super(props);
    this.state = { images: [], isModalShown: false, currentImageID: null };
  }

  componentDidMount() {
    const { urls } = this.props;

    this.getImages(urls, this.abortController.signal)
      .then((images) => this.setState({ images }))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  _handleModalShow = (event) => {
    event.preventDefault();

    this.setState({ isModalShown: true, currentImageID: event.target.id });
  };

  _handleModalHide = (event) => {
    event.preventDefault();

    this.setState({ isModalShown: false });
  };

  render() {
    const { images, currentImageID, isModalShown } = this.state;
    return (
      <>
        <div className="Gallery" onClick={this._handleModalShow}>
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
              _handleModalHide: this._handleModalHide,
            })
          : null}
      </>
    );
  }
}

export default Gallery;
