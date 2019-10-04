import React from "react";

import logo from "../../../../assets/img/jumbo_log_blackprint.svg";
import pic from "../../../../assets/img/buffetDescription.jpg";
import leftArrowBlack from "../../../../assets/img/leftArrowBlack.svg";

import {renamed} from '../../../../utils/helper'; 

import s from "./ServingDetails.module.css";

const ServingDetails = props => {
  console.log(props.buffet)
  return (
    <div className={s.Form}>
      <img className={s.Logo} src={logo} alt="logo" />
      <h4 className={s.Step}>Третий шаг</h4>
      <div className={s.Context}>
        <img src={pic} alt="buffet_pic" />
        <div className={s.Description}>
          <h5 className={s.Title}>{props.buffet.name}</h5>
          <p className={s.Text}>{props.buffet.description}</p>
        </div>
      </div>
      <p className={s.Price}>
        {"Стоимость: "}
        <strong>{props.buffet.price}</strong>
        {" грн"}
      </p>
      <div className={s.Buttons}>
        <button onClick={props.detailsToggle} className={s.BackBtn}>
          <img className={s.Arrow} src={leftArrowBlack} alt="left_arrow" />
          <p>НАЗАД</p>
        </button>
        <button id={props.buffet.id} type="button" data-name={renamed(props.buffet.name)} onClick={props.buy} className={props.step[renamed(props.buffet.name)] ? s.Green : ''}>
                      {props.step[renamed(props.buffet.name)] ? "Отменить" : "Выбрать"}
                    </button>
      </div>
    </div>
  );
};

export default ServingDetails;
