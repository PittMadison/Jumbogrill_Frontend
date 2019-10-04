import React from "react";
import { NavLink } from "react-router-dom";
import vegetables from "../../assets/img/vegetables.jpg";

import s from "./MainOfficeCatering.module.css";

const MainOfficeCatering = props => {
  return (
    <div className={s.Wrapper}>
      <div className={s.Items}>
        <h5>Офис-кейтеринг</h5>
        <p>Гриль прямо у Вас в офисе!</p>
        {/* <NavLink className={s.Button} to="/OfficeCatering">
          Подробнее
        </NavLink> */}
        <a href="tel:+380443339012" className={s.Button}>
              Связаться с нами
            </a>
        <img
          className={[s.Img, s.Display].join(" ")}
          src={vegetables}
          alt="vegetables"
        />
      </div>
      <img
        className={[s.Img, s.Display2].join(" ")}
        src={vegetables}
        alt="vegetables"
      />
    </div>
  );
};

export default MainOfficeCatering;
