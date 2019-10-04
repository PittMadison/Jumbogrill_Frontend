import React from "react";

import s from "./MenuPuzzle.module.css";

import { puzzleToggle, renamed } from "../../../../utils/helper";

const MenuPuzzle = props => {
  const menu = props.steps.find(el => el.name === "menu");

  let isBought = Object.keys(menu)
    .filter(el => menu.sets.map(elem => renamed(elem.name)).includes(el))
    .filter(element => menu[element] === true);

  let sets = menu.sets.filter(el => isBought.includes(renamed(el.name)));

  let totalPrice = sets
    .map(elem =>
      elem.products
        .reduce(
          (acc, el) =>
            acc +
            Math.round(
              (Number(el.weight_for_catering) /
                1000 /
                (Number(el.weight) / 1000)) *
                Number(el.price) *
                Number(
                  props.steps.find(el => el.name === "guest").inputs[
                    renamed(elem.name)
                  ]
                ) *
                1000
            ) /
              1000,
          0
        )
        .toFixed(2)
    )
    .reduce((accum, element) => accum + Number(element), 0);

  let guests = isBought.reduce(
    (acc, el) =>
      acc + Number(props.steps.find(el => el.name === "guest").inputs[el]),
    0
  );

  let oneGuestPrice = (totalPrice / guests).toFixed(2);
  console.log(sets);
  console.log(guests);
  return (
    <div
      className={
        puzzleToggle(props.steps, "menu")
          ? [s.Menu, s.WalkInMenu].join(" ")
          : s.Menu
      }
    >
      <h6 className={s.Title}>Меню</h6>
      <p className={s.Guests}>
        {"Кол-во гостей: "}
        <strong>{guests}</strong>
      </p>
      <p className={s.SinglePrice}>{oneGuestPrice + " грн /чел"}</p>

      <p className={s.Total}>
        <span>ВСЕГО</span>
        <span>{totalPrice}</span>
        <span>грн</span>
      </p>
    </div>
  );
};

export default MenuPuzzle;
