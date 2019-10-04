import React from "react";

import s from "./CarPuzzle.module.css";

import { puzzleToggle } from "../../../../utils/helper";

import carActive from "../../../../assets/img/cateringPuzzles/JumboCarActive.jpg";
import carDisabled from "../../../../assets/img/cateringPuzzles/JumboCarDisabled.jpg";

const CarPuzzle = props => {
  const car = props.steps.find(el => el.name === "car").car;
  const serviceName = Object.keys(props.steps.find(el => el.name === "car").checkboxes).filter(el=>props.steps.find(el=>el.name==='car').checkboxes[el]===true)[0];
  console.log(serviceName);
  const carPrice = car ? props.steps.find(el=>el.name==='car').services.find(el=>el.name===serviceName).price : 0;
  return (
    <div
      style={{
        backgroundImage: `url(${car ? carActive : carDisabled})`
      }}
      className={
        puzzleToggle(props.steps, "car")
          ? [s.Car, s.WalkInCar].join(" ")
          : s.Car
      }
    >
      <h6 className={s.Title}>Jumbo Car</h6>

      <p className={s.Total}>
        <span>ВСЕГО</span>
        <span>{carPrice}</span>
        <span>грн</span>
      </p>
    </div>
  );
};

export default CarPuzzle;
