import React from "react";

import s from "./Restaurant.module.css";

import pork from "../../assets/img/pork.jpg";
import fish from "../../assets/img/fishes.jpg";
import kebab from "../../assets/img/kebab.jpg";
import chicken from "../../assets/img/chicken.jpg";
import prawns from "../../assets/img/prawns.jpg";

import { porkArray, fishArray, kebabArray } from "../../utils/restaurantData";
import Header from "../Header/Header";
import MainFooter from "../MainFooter/MainFooter";

const Restaurant = props => {
  return (
    <div>
      <Header
        boxDeliveryBucket={props.boxDeliveryBucket}
        categories={props.categories}
        path={props.path}
      />
      <div className={s.Restaurant}>
        <h4 className={s.Title}>SET MENU</h4>
        <div className={s.Pork}>
          <img className={s.PorkImg} src={pork} alt="pork" />
          <div className={s.PorkMenu}>
            <h5 className={s.Sets}>Мясной сет</h5>

            {porkArray.map(el => (
              <div key={el.rusName} className={s.PorkItems}>
                <div className={s.PorkText}>
                  <p className={s.Bordered}>{el.rusName}</p>
                  <p>{el.engName}</p>
                </div>
                <p className={s.PorkPrice}>
                  {el.price}
                  <span className={s.PorkCurrency}>{el.curr}</span>
                </p>
              </div>
            ))}
            <p className={s.Specials}>
              <span>+ Напиток на выбор: Клюквенный морс или Узвар /</span>
              <span>+ Complimentary drink: Cranberry mors or Uzvar</span>
            </p>
          </div>
        </div>

        <div className={s.Fish}>
          <div className={s.FishMenu}>
            <h5 className={s.Sets}>Рыбный сет</h5>
            {fishArray.map(el => (
              <div key={el.rusName} className={s.FishItems}>
                <div className={s.FishText}>
                  <p className={s.Bordered}>{el.rusName}</p>
                  <p>{el.engName}</p>
                </div>
                <p className={s.FishPrice}>
                  {el.price}
                  <span>{el.curr}</span>
                </p>
              </div>
            ))}
            <p className={s.Specials}>
              <span>+ Напиток на выбор: Клюквенный морс или Узвар /</span>
              <span>+ Complimentary drink: Cranberry mors or Uzvar</span>
            </p>
          </div>
          <img className={s.FishImg} src={fish} alt="fish" />
        </div>

        <div className={s.Kebab}>
          <img className={s.KebabImg} src={kebab} alt="kebab" />
          <div className={s.KebabMenu}>
            <h5 className={s.Sets}>Люля-кебаб сет</h5>

            {kebabArray.map(el => (
              <div key={el.rusName} className={s.KebabItems}>
                <div className={s.KebabText}>
                  <p className={s.Bordered}>{el.rusName}</p>
                  <p>{el.engName}</p>
                </div>
                <p className={s.KebabPrice}>
                  {el.price}
                  <span>{el.curr}</span>
                </p>
              </div>
            ))}
            <p className={s.Specials}>
              <span>+ Напиток на выбор: Клюквенный морс или Узвар /</span>
              <span>+ Complimentary drink: Cranberry mors or Uzvar</span>
            </p>
          </div>
        </div>

        <div className={s.BottomMenus}>
          x
          <div className={s.Chicken}>
            <img className={s.ChickenImg} src={chicken} alt="pork" />
            <div className={s.ChickenItems}>
              <div className={s.ChickenText}>
                <p className={s.Bordered}>Куриные Крылышки /</p>
                <p>Chicken wings</p>
              </div>
              <p className={s.ChickenPrice}>
                249 <span>UAH</span>
              </p>
            </div>
          </div>
          <div className={s.Prawns}>
            <img className={s.PrawnsImg} src={prawns} alt="pork" />
            <div className={s.PrawnsItems}>
              <div className={s.PrawnsText}>
                <p className={s.Bordered}>Креветки /</p>
                <p>King Prawns</p>
              </div>
              <p className={s.PrawnsPrice}>
                399 <span>UAH</span>
              </p>
            </div>
          </div>
        </div>

        <MainFooter path={props.path} />
      </div>
    </div>
  );
};

export default Restaurant;
