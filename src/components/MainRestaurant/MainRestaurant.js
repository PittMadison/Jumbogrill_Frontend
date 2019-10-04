import React from "react";
import { NavLink } from "react-router-dom";
import restaurant from "../../assets/img/restaurantBox.jpg";
import fishPlate from "../../assets/img/fishPlate.jpg";

import s from "./MainRestaurant.module.css";

const MainRestaurant = props => {
  return (
    <div>
      <div className={s.Wrapper}>
        <div className={s.Items}>
          <h5>Ресторан</h5>
          <h6 className={s.Orange}>Jumbo Grill</h6>
          <p>Посетите наше заведение!</p>
          <NavLink className={s.Button} to="/Restaurant">
            Подробнее
          </NavLink>
          <img
            className={[s.Img, s.Display].join(" ")}
            src={fishPlate}
            alt="vegetables"
          />
        </div>
        <img
          className={[s.Img, s.Display2].join(" ")}
          src={restaurant}
          alt="vegetables"
        />
      </div>
    </div>
  );
};

export default MainRestaurant;
