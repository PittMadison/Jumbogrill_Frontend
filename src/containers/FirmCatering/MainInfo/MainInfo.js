import React from "react";
import moment from 'moment';
import logo from "../../../assets/img/jumbo_log_blackprint.svg";

import s from "./MainInfo.module.css";

const MainInfo = props => {
  console.log(props);
  let dateControl = document.querySelector('input[type="date"]');
  const time = moment(new Date(), 'MM/DD/YYYY')


  console.log(time.format('DD/MM/YYYY'))
  console.log(dateControl)
  return (
    props.path === '/Catering' ?
    <form className={s.Form} onSubmit={props.nextStep}>
      <img className={s.Logo} src={logo} alt="logo" />
      <h4 className={s.Title}>Основная информация</h4>

      <input
        placeholder="Дата"
        name="date"
        value={props.step.inputs.date}
        className={s.Input}
        onFocus={props.focus}
        onBlur={props.blur}
        onChange={props.change}
        required
      />
      <input
        onChange={props.change}
        value={props.step.inputs.phone}
        name="phone"
        placeholder="Ваш телефон"
        className={s.Input}
        type="tel"
        required
      />
      <input
        onChange={props.change}
        value={props.step.inputs.place}
        name="place"
        placeholder="Место проведения"
        className={s.Input}
        type="text"
        required
      />

      <div className={s.RadioButtons}>
        <label className={s.Radio}>
          Компания
          <input
            onChange={props.check}
            type="checkbox"
            name="company"
            checked={props.step.checkboxes.company}
          />
          <span className={s.Checkmark} />
        </label>

        <label className={s.Radio}>
          Ивент-компания
          <input
            type="checkbox"
            name="event"
            onChange={props.check}
            checked={props.step.checkboxes.event}
          />
          <span className={s.Checkmark} />
        </label>

        <label className={s.Radio}>
          Частное лицо
          <input
            type="checkbox"
            name="private"
            onChange={props.check}
            checked={props.step.checkboxes.private}
          />
          <span className={s.Checkmark} />
        </label>
      </div>
      
      <button className={s.Button}>Дальше</button>
    </form> 
    :
    <form className={s.Form} onSubmit={props.nextStep}>
      <img className={s.Logo} src={logo} alt="logo" />
      <h4 className={s.Title}>Основная информация</h4>

      <input
        onChange={props.change}
        value={props.step.inputs.place}
        name="place"
        placeholder="Локация"
        className={s.Input}
        type="text"
        required
      />

      <input
        placeholder="Дата"
        name="date"
        value={props.step.inputs.date}
        className={s.Input}
        onFocus={props.focus}
        onBlur={props.blur}
        onChange={props.change}
        required
      />
      <input
        onChange={props.change}
        value={props.step.inputs.phone}
        name="phone"
        placeholder="Ваш телефон"
        className={s.Input}
        type="tel"
        required
      />
      

      <div style={{justifyContent: 'space-evenly'}} className={s.RadioButtons}>
        <label className={s.Radio}>
          Компания
          <input
            onChange={props.check}
            type="checkbox"
            name="company"
            checked={props.step.checkboxes.company}
          />
          <span className={s.Checkmark} />
        </label>

        <label className={s.Radio}>
          Частное лицо
          <input
            type="checkbox"
            name="private"
            onChange={props.check}
            checked={props.step.checkboxes.private}
          />
          <span className={s.Checkmark} />
        </label>
      </div>
      
      <button className={s.Button}>Дальше</button>
    </form> 
  );
};

export default MainInfo;
