import React from "react";
import Header from "../Header/Header";
import MainFooter from "../MainFooter/MainFooter";

import s from "./Menu.module.css";
import arrow from "../../assets/img/leftArrow.svg";
import { NavLink } from "react-router-dom";

const Menu = props => {
  
  return (
    <div>
      <Header
        boxDeliveryBucket={props.boxDeliveryBucket}
        categories={props.categories}
        path={props.path}
      />

      <div className={s.Container}>
        <h3 className={s.Title}>Категории блюд</h3>

        {props.categories.map(el => (
          <NavLink className={s.Link} to={`/${el.name}`} key={el.id}>
            <img className={s.Img} src={el.image} alt="food_category" />
            <p className={s.Text}>{el.name}</p>
          </NavLink>
        ))}
        <NavLink to="/" className={s.Button}>
          <img className={s.Arrow} src={arrow} alt="arrow" />
          <p className={s.BtnText}>НАЗАД</p>
        </NavLink>
      </div>
      <MainFooter path={props.path} />
    </div>
  );
};

export default Menu;
