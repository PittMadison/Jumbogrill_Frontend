import React, { Component } from "react";
import "./ModalRequest.css";
import closeBtn from "../../assets/img/closeWhite.svg";


import { pickBoxPost } from "../../utils/api";

export default class ModalRequest extends Component {
  state = {
    name: "",
    phone: "",
    email: ""
  };

  resetForm = () => {
    let newState = {...this.state};
    let array = Object.keys(newState);
    array.forEach(el=> newState[el] = '')
    this.setState({
        ...newState,
    })
}
  inputHandler = event => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  render() {
    const styles = this.props.modalRequest
      ? { display: "block" }
      : { display: "none" };

    const submit = event => {
      event.preventDefault();
      pickBoxPost(this.state);
      this.props.modalToggle();
      this.props.takeMessage(event);
      this.resetForm();
      this.props.modalRequestChange();
    };

  const closeOnDiv = event => event.target.className === 'wrapper zoom' ? this.props.modalRequestChange() : null;

    return (
      <div onClick={closeOnDiv} className="wrapper zoom" style={styles}>
        <div id="modal">
          <div className="modal-content">
            <h2>Оставьте заявку</h2>
            <form data-message="personal" onSubmit={submit}>
              <input onChange={this.inputHandler} value={this.state.name} type="text" placeholder="Ваше имя" required name="name" id="catName" />
              <label className="mainInfoLabel" htmlFor="catName">
                Ваше имя
              </label>
              <input onChange={this.inputHandler} value={this.state.phone} type="text" placeholder="Ваш телефон" required name="phone" id="catPhone" />
              <label className="mainInfoLabel" htmlFor="catPhone">
                Ваш телефон
              </label>
              <input onChange={this.inputHandler} value={this.state.email} type="email" placeholder="Ваш E-mail" required name="email" id="catEmail" />
              <label className="mainInfoLabel" htmlFor="catEmail">
                Ваш E-mail
              </label>
              <button className="button" type="submit">
                Оставить заявку
              </button>
            </form>
            <button onClick={this.props.modalRequestChange} className="do-close">
              <img src={closeBtn} alt="close_button" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
