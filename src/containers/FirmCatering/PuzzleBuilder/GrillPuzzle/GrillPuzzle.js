import React from "react";

import s from "./GrillPuzzle.module.css";

import { puzzleToggle } from "../../../../utils/helper";

import grillActive from "../../../../assets/img/cateringPuzzles/GrillShowActive.jpg";
import grillDisabled from "../../../../assets/img/cateringPuzzles/GrillShowDisabled.jpg";

const GrillPuzzle = props => {
  const grill = props.steps.find(el => el.name === "grill").grill;
  const serviceId = props.steps.find(el => el.name === "grill").serviceId;
  const grillPrice = grill ? props.steps.find(el=>el.name==='grill').services.find(el=>el.id===Number(serviceId)).price : 0;
  return (
    <div
      style={{
        backgroundImage: `url(${grill ? grillActive : grillDisabled})`
      }}
      className={
        puzzleToggle(props.steps, "grill")
          ? [s.Grill, s.WalkInGrill].join(" ")
          : s.Grill
      }
    >
      <h6 className={s.Title}>«Мангал Шоу»</h6>

      <p className={s.Total}>
        <span>ВСЕГО</span>
        <span>{grillPrice}</span>
        <span>грн</span>
      </p>
    </div>
  );
};

export default GrillPuzzle;
