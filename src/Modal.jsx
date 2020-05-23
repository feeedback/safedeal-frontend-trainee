/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Modal.css";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageData: {},
      form: { author: "", commentText: "" },
      error: "",
    };
  }

  abortController = new AbortController();

  getFullImageAndComment = async (urls, id) => {
    try {
      const response = await fetch(urls.getFullImageAndComment(id), {
        signal: this.abortController.signal,
      });
      const currentImageData = await response.json();
      this.setState({ currentImageData });
    } catch (error) {
      if (error.name !== "AbortError") {
        throw error;
      }
    }
  };

  componentDidMount() {
    const { id, handleModalHide, urls } = this.props;

    const escKeyCloseModal = (event) => {
      if (event.keyCode === 27) {
        window.removeEventListener("keydown", escKeyCloseModal);
        handleModalHide(event);
      }
    };
    window.addEventListener("keydown", escKeyCloseModal);

    this.getFullImageAndComment(urls, id);
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  handleAddComment = async (event) => {
    event.preventDefault();

    const { currentImageData, form } = this.state;
    const { id, comments } = currentImageData;
    const { urls } = this.props;

    const requestError = () => {
      this.setState({ error: "Error: Bad server response. Try later" });
      return;
    };

    try {
      const response = await fetch(urls.postCommentToImage(id), {
        method: "POST",
        body: JSON.stringify({
          name: form.author,
          comment: form.commentText,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        signal: this.abortController.signal,
      });

      if (response.status !== 204) {
        requestError();
        return;
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        requestError();
      }

      return;
    }

    const newComment = {
      text: form.commentText,
      id: form.author,
      date: Date.now(),
    };

    this.setState({
      currentImageData: {
        ...currentImageData,
        comments: [...comments, newComment],
      },
      form: { author: "", commentText: "" },
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const { form } = this.state;

    this.setState({ form: { ...form, [name]: value }, error: "" });
  };

  renderFullImage() {
    const {
      currentImageData: { id, url },
    } = this.state;

    return (
      <img className="Modal_LargeImage" id={id} src={url} alt="Large img" />
    );
  }

  renderForm() {
    const { form, error } = this.state;

    return (
      <form
        className="Modal_FormNewComment"
        name="addComment"
        action=""
        method=""
        onSubmit={this.handleAddComment}
      >
        <input
          className="Modal_FormNewComment_input"
          type="text"
          name="author"
          placeholder="Ваше имя"
          value={form.author}
          onChange={this.handleChange}
          required
        />
        <input
          className="Modal_FormNewComment_input"
          type="text"
          name="commentText"
          placeholder="Ваш комментарий"
          value={form.commentText}
          onChange={this.handleChange}
          required
        />
        <input
          className="Modal_FormNewComment_input Modal_FormNewComment_submit"
          type="submit"
          value="Оставить комментарий"
        />
        {error !== "" ? (
          <span className="Modal_FormNewComment_error">{error}</span>
        ) : null}
      </form>
    );
  }

  renderComments() {
    const {
      currentImageData: { comments = [] },
    } = this.state;

    return (
      <section className="Modal_Comments">
        {comments.map(({ id, text, date }) => (
          <div key={date} id={id} className="Modal_Comments_commentWrapper">
            <p className="Modal_Comments_p Modal_Comments_date">
              {new Date(date).toLocaleDateString("ru-RU")}
            </p>
            <p className="Modal_Comments_p">{text}</p>
          </div>
        ))}
      </section>
    );
  }

  render() {
    const { handleModalHide } = this.props;

    return (
      <div id="ModalWindow" className="Modal">
        <div className="Modal_contentWrapper">
          {this.renderFullImage()}
          {this.renderComments()}
          {this.renderForm()}
          <a
            href=""
            title="Закрыть"
            className="Modal_closeButton"
            onClick={handleModalHide}
          />
        </div>
        <a href="" className="Modal_blurFullWindow" onClick={handleModalHide} />
      </div>
    );
  }
}

export default Modal;
