/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./App.css";
import { urls } from "./App.jsx";

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

  getFullImageAndComment = async (id) => {
    try {
      const response = await fetch(urls.getFullImageAndComment(id), {
        signal: this.abortController.signal,
      });
      const currentImageData = await response.json();

      this.setState({ currentImageData });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const { id, handleModalHide } = this.props;

    const escKeyCloseModal = (event) => {
      if (event.keyCode === 27) {
        console.log("gb");

        window.removeEventListener("keydown", escKeyCloseModal);
        handleModalHide(event);
      }
    };
    window.addEventListener("keydown", escKeyCloseModal);

    this.getFullImageAndComment(id);
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  handleAddComment = async (event) => {
    event.preventDefault();

    const { currentImageData, form } = this.state;
    const { id, comments } = currentImageData;

    const newComment = {
      text: form.commentText,
      id: form.author,
      date: Date.now(),
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
        this.setState({ error: "Error: Bad server response. Try later" });
        return;
      }
    } catch (error) {
      this.setState({ error: "Error: Bad server response. Try later" });
      return;
    }

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

    return <img id={id} src={url} alt="" />;
  }

  renderForm() {
    const { form, error } = this.state;

    return (
      <form
        name="addComment"
        action=""
        method=""
        onSubmit={this.handleAddComment}
      >
        <input
          type="text"
          name="author"
          placeholder="Ваше имя"
          value={form.author}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="commentText"
          placeholder="Ваш комментарий"
          value={form.commentText}
          onChange={this.handleChange}
          required
        />
        <input type="submit" value="Оставить комментарий" />
        {error !== "" ? <span className="formError">{error}</span> : null}
      </form>
    );
  }

  renderComments() {
    const {
      currentImageData: { comments },
    } = this.state;

    return (
      <section className="comments">
        {comments.map(({ id, text, date }) => (
          <div key={date} id={id}>
            <p className="date">{new Date(date).toLocaleDateString("ru-RU")}</p>
            <p className="text">{text}</p>
          </div>
        ))}
      </section>
    );
  }

  render() {
    const { handleModalHide } = this.props;
    const {
      currentImageData: { comments = [] },
    } = this.state;

    return (
      <div id="ModalWindow" className="Modal Modal-shown">
        <div className="Modal_Content">
          {this.renderFullImage()}
          {comments.length > 0 ? this.renderComments() : null}
          {this.renderForm()}
          <a
            href=""
            title="Закрыть"
            className="closeButton"
            onClick={handleModalHide}
          />
        </div>
        <a href="" className="ModalFull" onClick={handleModalHide} />
      </div>
    );
  }
}

export default Modal;
