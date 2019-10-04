import React from "react";

import s from "./BoxDeliveryPopUp.module.css";
import close from "../../../assets/img/closeWhite.svg";

const BoxDeliveryPopUp = props => {
  const popUpBox = props.boxDeliveryData.find(el => el.id === props.popUpBoxId);

  const closeOnBacking = event => event.target.className === s.Backing ? props.boxPopUpOff() : null;

  const buy = event => {
    props.addToBucketBox(event);
    props.boxPopUpOff()
  }

  return (
    <div onClick={closeOnBacking} className={s.Backing}>
      <div className={s.Wrapper}>
        <button onClick={props.boxPopUpOff} className={s.CloseBtn}>
          <img src={close} alt="close" />
        </button>
        <h4 className={s.BoxTitle}>{popUpBox.name}</h4>
        <p className={s.TotalWeight}>{'( Общий вес: ' + popUpBox.box_ingredient.reduce((acc, el)=>acc+el.weight,0) + ' грамм )'}</p>
        <div className={s.BoxContent}>
          <div
            className={s.Img}
            style={{
              backgroundImage: `url(${popUpBox.image})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          />
          <div className={s.BoxInfo}>
            <ul className={s.BoxList}>
              {popUpBox.box_ingredient.map(el => (
                <li className={s.Ingredients} key={el.id}>
                  <p className={s.Name}>{el.name}</p>
                  <p className={s.Dots} />
                  <p className={s.Weight}>{el.weight + " г"}</p>
                </li>
              ))}
            </ul>
            <div className={s.BoxDeliveryItemCounter}>
              <div className={s.BoxDeliveryItemButtons}>
                <button
                  disabled={popUpBox.default_count === 1 ? true : false}
                  id={popUpBox.id}
                  onClick={props.subDefaultCount}
                >
                  -
                </button>
                <button>
                  <p className={s.BoxDeliveryItemCount}>
                    {popUpBox.default_count}
                  </p>
                </button>
                <button id={popUpBox.id} onClick={props.addDefaultCount}>
                  +
                </button>
              </div>
              <p className={s.BoxDeliveryItemResult}>
                {+(popUpBox.price * popUpBox.default_count).toFixed(2)} грн
              </p>
            </div>
            <button
              id={popUpBox.id}
              className={s.BoxDeliveryItemBucket}
              onClick={buy}
            >
              В КОРЗИНУ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxDeliveryPopUp;
