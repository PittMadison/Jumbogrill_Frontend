import React from "react";

import s from "./Wishes.module.css";

import logo from "../../../assets/img/jumbo_log_blackprint.svg";

const Wishes = props => {
  const skip = event => {
    props.nextStep(event);
    props.inputClear(event);
  };

  return (
    <form className={s.Form} onSubmit={props.nextStep}>
      <img className={s.Logo} src={logo} alt="logo" />

      <h5 className={s.Step}>Восьмой шаг</h5>
      <p className={s.Title}>Напишите нам свои пожелания</p>

      <textarea
        name="userWish"
        value={props.step.inputs.userWish}
        onChange={props.change}
        className={s.TextArea}
        type="text"
        maxLength="1500"
        placeholder="Ваши пожелания..."
        autoFocus
      />
      <div className={s.Buttons}>
        <button
          onClick={skip}
          className={s.SkipBtn}
          type="button"
          data-name="wishes"
        >
          пропустить
        </button>
        <button className={s.Button} type="submit">
          отправить
        </button>
      </div>
    </form>
  );
};

export default Wishes;
