import React from "react";

import s from "./RestPuzzle.module.css";

import { puzzleToggle } from "../../../../utils/helper";

import restActive from "../../../../assets/img/cateringPuzzles/RestZoneActive.jpg";
import restDisabled from "../../../../assets/img/cateringPuzzles/RestZoneDisabled.jpg";

const RestPuzzle = props => {
  const rest = props.steps.find(el => el.name === "rest").rest;
  const serviceId = props.steps.find(el => el.name === "rest").serviceId;

  const restPrice = rest ? props.steps.find(el=>el.name==='rest').services.find(el=>el.id===Number(serviceId)).price : 0;

  const inputs = Object.keys(props.steps.find(el=>el.name === 'rest').inputs);
  const trueInputs = inputs.filter(el=>props.steps.find(el=>el.name === 'rest').inputs[el]===true);
  const serviceItems = props.steps.find(el=>el.name === 'rest').serviceItems;
  const resultsItems = serviceItems.filter(el=>trueInputs.includes(el.name));
  
  const itemsPrice = trueInputs.length > 0 ? resultsItems.reduce((acc, val) => acc + +(+val.price * +val.quantity).toFixed(2),0) : 0;

  return (
    <div
      style={{
        backgroundImage: `url(${rest || trueInputs.length > 0 ? restActive : restDisabled})`
      }}
      className={
        puzzleToggle(props.steps, "rest")
          ? [s.Rest, s.WalkInRest].join(" ")
          : s.Rest
      }
    >
      <h6 className={s.Title}>Зона отдыха</h6>

      <p className={s.Total}>
        <span>ВСЕГО</span>
        <span>{restPrice + itemsPrice}</span>
        <span>грн</span>
      </p>
    </div>
  );
};

export default RestPuzzle;
