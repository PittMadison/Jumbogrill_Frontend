import React from "react";
import { NavLink } from "react-router-dom";

import smallBox from "../../assets/img/smallBox.jpg";

import s from "./MainBoxDelivery.module.css";

const MainBoxDelivery = props => {
  return (
    <div>
      <div className={s.Wrapper}>
        <img
          className={[s.Img, s.Display2].join(" ")}
          src={smallBox}
          alt="vegetables"
        />
        <div className={s.Items}>
          <h5>BOX-доставка</h5>
          <p>Гриль прямо у Вас в офисе!</p>
          <NavLink className={s.Button} to="/BoxDelivery">
            Подробнее
          </NavLink>
          <img
            className={[s.Img, s.Display].join(" ")}
            src={smallBox}
            alt="vegetables"
          />
        </div>
      </div>
    </div>
  );
};

export default MainBoxDelivery;
