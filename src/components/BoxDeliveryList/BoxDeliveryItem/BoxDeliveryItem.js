import React, { Fragment } from "react";
import s from "./BoxDeliveryItem.module.css";

const BoxDeliveryItem = props => {
  const popUp = event => {
    props.boxPopUpOn();
    props.boxInfoHandler(event);
  };

  return (
    <Fragment>
      <li className={s.BoxDeliveryItem}>
        <h4 className={s.BoxDeliveryItemName}>{props.name}</h4>
        <div
          className={s.BoxDeliveryItemImg}
          onClick={popUp}
          id={props.id}
          style={{
            backgroundImage: `url(${props.image})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
        <p className={s.BoxDeliveryItemPriceWeight}>
          <span>{props.ingredients.reduce((acc,el) => acc + el.weight, 0) + ' грамм'}</span>
        </p>
        <div className={s.BoxDeliveryItemCounter}>
          <div className={s.BoxDeliveryItemButtons}>
            <button
              disabled={props.defaultCount === 1 ? true : false}
              id={props.id}
              onClick={props.subDefaultCount}
            >
              -
            </button>
            <button>
              <p className={s.BoxDeliveryItemCount}>{props.defaultCount}</p>
            </button>
            <button id={props.id} onClick={props.addDefaultCount}>
              +
            </button>
          </div>
          <p className={s.BoxDeliveryItemResult}>
            {+(props.price * props.defaultCount).toFixed(2) + " грн"}
          </p>
        </div>
        <button
          id={props.id}
          className={s.BoxDeliveryItemBucket}
          onClick={props.addToBucketBox}
        >
          В КОРЗИНУ
        </button>
      </li>
    </Fragment>
  );
};

export default BoxDeliveryItem;
