import React from "react";

import s from "./BuffetPuzzle.module.css";

import { puzzleToggle } from "../../../../utils/helper";

import buffetActive from "../../../../assets/img/cateringPuzzles/BuffetActive.jpg";
import buffetDisabled from "../../../../assets/img/cateringPuzzles/BuffetDisabled.jpg";

const BuffetPuzzle = props => {
  const buffet = props.steps.find(el => el.name === "serving").buffet;
  const serviceId = props.steps.find(el => el.name === "buffet").serviceId;
  const buffetPrice = buffet ? props.steps.find(el=>el.name==='buffet').services.find(el=>el.id===Number(serviceId)).price : 0

  return (
    <div
      style={{
        backgroundImage: `url(${buffet ? buffetActive : buffetDisabled})`
      }}
      className={
        puzzleToggle(props.steps, "buffet")
          ? [s.Buffet, s.WalkInBuffet].join(" ")
          : s.Buffet
      }
    >
      <h6 className={s.Title}>
        <span>Фуршетная</span>
        <span>зона</span>
      </h6>

      <p className={s.Total}>
        <span>ВСЕГО</span>
        <span>{buffetPrice}</span>
        <span>грн</span>
      </p>
    </div>
  );
};

export default BuffetPuzzle;
