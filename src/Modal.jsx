import React from "react";
import "./App.css";

class Modal extends React.Component {
  renderFullImage() {
    const {
      currentImageData: { id, url },
    } = this.props;

    return <img id={id} src={url} alt="" />;
  }

  renderForm() {
    const {
      currentImageData: { id },
    } = this.props;

    return (
      <form name="addComment" action="" method="">
        <input type="text" name="author" placeholder="Ваше имя" />
        <input type="text" name="commentText" placeholder="Ваш комментарий" />
        <input type="submit" value="Оставить комментарий" />
      </form>
    );
  }

  renderComments() {
    const {
      currentImageData: { comments },
    } = this.props;
    return (
      <section className="comments">
        {comments.map(({ id, text, date }) => (
          <div key={id} id={id}>
            <p className="date">{new Date(date).toLocaleDateString("ru-RU")}</p>
            <p className="text">{text}</p>
          </div>
        ))}
      </section>
    );
  }

  render() {
    const {
      HandleModalHide,
      currentImageData: { comments = [] },
    } = this.props;

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
            onClick={HandleModalHide}
          />
        </div>
        <a href="" className="ModalFull" onClick={HandleModalHide}></a>
      </div>
    );
  }
}

export default Modal;
