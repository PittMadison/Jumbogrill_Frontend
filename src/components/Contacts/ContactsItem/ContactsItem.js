import React, { Component } from "react";

import s from "./ContactsItem.module.css";

import { contactsPost } from "../../../utils/api";

import facebook from "../../../assets/img/facebook.svg";
import youtube from "../../../assets/img/youtube.svg";
import instagram from "../../../assets/img/instagram.svg";

export default class ContactsItem extends Component {
  state = {
    name: "",
    phone: "",
    comment: ""
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

  postFetch = event => {
    event.preventDefault();
    contactsPost(this.state);
    this.props.takeMessage(event);
    this.resetForm();
    this.props.modalToggle();
  };

  render() {
    return (
      <div className={s.Wrapper}>
        <div className={s.ContactItems}>
          <h4 className={s.Title}>Контакты</h4>
          <div className={s.Contacts}>
            <p className={s.ContactOne}>044 333-90-12</p>
            <p className={s.ContactThree}>hello@jumbogrill.ua</p>
            <p className={s.ContactTwo}>Голосеевский проспект, 87б</p>
          </div>
          <div className={s.SocialLinks}>
            <p>Мы в социальных сетях:</p>
            <div className={s.SocialLinksItems}>
              <a href="https://www.facebook.com/jumbogrillua/">
                <img src={facebook} alt="facebook" />
              </a>
              <a
                className={s.MidLink}
                href="https://www.youtube.com/watch?v=2n66sLkfNuI"
              >
                <img src={youtube} alt="youtube" />
              </a>
              <a href="https://www.instagram.com/jumbogrill/">
                <img src={instagram} alt="instagram" />
              </a>
            </div>
          </div>
        </div>

        <form data-message='contact' onSubmit={this.postFetch} action="submit" className={s.Form}>
          <h5>Свяжитесь с нами</h5>
          <label htmlFor="name">Ваше имя</label>
          <input
            type="text"
            required
            name="name"
            value={this.state.name}
            onChange={this.inputHandler}
          />
          <label htmlFor="phone">Телефон</label>
          <input
            type="text"
            required
            name="phone"
            value={this.state.phone}
            onFocus={this.initial}
            onChange={this.inputHandler}
          />
          <label htmlFor="comment">Комментарий</label>
          <textarea
            type="text"
            name="comment"
            value={this.state.comment}
            onChange={this.inputHandler}
            maxLength="250"
          />
          <button type="submit">Отправить</button>
        </form>
      </div>
    );
  }
}
