import React from "react";

import logo from "../../../assets/img/jumbo_log_blackprint.svg";

import s from "./GuestInfo.module.css";

const GuestInfo = props => {
  const submit = event => {
    if (
      Number(props.step.inputs.total) -
        Number(props.step.inputs.meat) -
        Number(props.step.inputs.vegan) -
        Number(props.step.inputs.child) ===
        0 &&
      Number(props.step.inputs.total) > 0
    ) {
      props.nextStep(event);
    } else {
      event.preventDefault();
      props.takeMessage(event);
      props.modalToggle();
    }
  };

  return (
    <form data-message='guests' onSubmit={submit} className={s.Form}>
      <img className={s.Logo} src={logo} alt="logo" />

      <h5 className={s.Step}>Первый шаг</h5>
      <p className={s.Title}>Количество гостей</p>

      <input
        placeholder="Общее количество гостей"
        type="number"
        name="total"
        min="0"
        value={props.step.inputs.total}
        className={s.Input}
        onChange={props.change}
        required
      />
      <input
        onChange={props.change}
        name="meat"
        value={props.step.inputs.meat}
        min="0"
        placeholder="Мясоеды"
        className={s.Input}
        type="number"
      />
      <input
        onChange={props.change}
        name="vegan"
        value={props.step.inputs.vegan}
        min="0"
        placeholder="Вегетарианцы"
        className={s.Input}
        type="number"
      />

      <input
        onChange={props.change}
        name="child"
        value={props.step.inputs.child}
        min="0"
        placeholder="Дети"
        className={s.Input}
        type="number"
      />

      <button className={s.Button}>Дальше</button>
    </form>
  );
};

export default GuestInfo;
