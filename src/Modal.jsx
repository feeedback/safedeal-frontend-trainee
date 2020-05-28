/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Modal.css";

class Modal extends React.Component {
  getFullImageAndComment = async (url, id, signal) => {
    try {
      const response = await fetch(url, { signal });
      const currentImageData = await response.json();
      return currentImageData;
    } catch (error) {
      throw error;
    }
  };
  postNewCommentToImage = async (commentData, url, signal) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: { "Content-Type": "application/json" },
        signal,
      });

      if (response.status === 204) {
        return true;
      } else {
        throw new Error("BadResponseStatus");
      }
    } catch (error) {
      throw error;
    }
  };

  abortController = new AbortController();

  _handleAddComment = async (event) => {
    event.preventDefault();

    const { currentImageData, form } = this.state;
    const { id, comments } = currentImageData;
    const { urls } = this.props;

    const commentObjectToPost = {
      name: form.author,
      comment: form.commentText,
    };

    this.postNewCommentToImage(
      commentObjectToPost,
      urls.postNewCommentToImage(id),
      this.abortController.signal
    )
      .then((res) => {
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
        
        const commentsEl = this.myRefCommentBlock.current;
        commentsEl.scrollTo(0,  commentsEl.scrollHeight - commentsEl.offsetHeight);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          this.setState({ error: "Error: Bad server response. Try later" });
          console.error(error);
        }
      });
  };

  _handleChangeInput = (event) => {
    const { name, value } = event.target;
    const { form } = this.state;

    this.setState({ form: { ...form, [name]: value }, error: "" });
  };

  constructor(props) {
    super(props);
    this.state = {
      currentImageData: {},
      form: { author: "", commentText: "" },
      error: "",
    };
    this.myRefCommentBlock = React.createRef();
  }

  componentDidMount() {
    const { id, _handleModalHide, urls } = this.props;

    const escKeyCloseModal = (event) => {
      if (event.keyCode === 27) {
        window.removeEventListener("keydown", escKeyCloseModal);
        _handleModalHide(event);
      }
    };
    window.addEventListener("keydown", escKeyCloseModal);

    this.getFullImageAndComment(
      urls.getFullImageAndComment(id),
      this.abortController.signal
    )
      .then((currentImageData) => this.setState({ currentImageData }))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  _renderFullImage() {
    const {
      currentImageData: { id, url },
    } = this.state;

    return (
      <img className="Modal_LargeImage" id={id} src={url} alt="Large img" />
    );
  }

  _renderForm() {
    const { form, error } = this.state;

    return (
      <form
        className="Modal_FormNewComment"
        name="addComment"
        action=""
        method=""
        onSubmit={this._handleAddComment}
      >
        <input
          className="Modal_FormNewComment_input"
          type="text"
          name="author"
          placeholder="Ваше имя"
          value={form.author}
          onChange={this._handleChangeInput}
          required
        />
        <input
          className="Modal_FormNewComment_input"
          type="text"
          name="commentText"
          placeholder="Ваш комментарий"
          value={form.commentText}
          onChange={this._handleChangeInput}
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

  _renderComments() {
    const {
      currentImageData: { comments = [] },
    } = this.state;

    return (
      <section className="Modal_Comments" ref={this.myRefCommentBlock}>
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
    const { _handleModalHide } = this.props;

    return (
      <div id="ModalWindow" className="Modal">
        <div className="Modal_contentWrapper">
          {this._renderFullImage()}
          {this._renderComments()}
          {this._renderForm()}
          <a
            href=""
            title="Закрыть"
            className="Modal_closeButton"
            onClick={_handleModalHide}
          />
        </div>
        <a
          href=""
          className="Modal_blurFullWindow"
          onClick={_handleModalHide}
        />
      </div>
    );
  }
}

export default Modal;
