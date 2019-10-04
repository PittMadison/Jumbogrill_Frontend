import React from "react";

import s from "./BucketBoxes.module.css";

import close from "../../../assets/img/closeWhite.svg";


const BucketBoxes = props => {
  const {
    id,
    name,
    image,
    price,
    count,
    removeFromBucketBox,
    addBoxCount,
    subBoxCount
  } = props;

  return (
    <li className={s.Item}>
      <h5 className={s.Name}>{name}</h5>
      <div
        className={s.BoxDeliveryItemImg}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      <div className={s.BottomItems}>
        <div className={s.Amount}>
          <p className={s.AmountText}>Количество</p>
          <div className={s.BoxDeliveryItemButtons}>
            <button
              disabled={count === 1 ? true : false}
              id={id}
              onClick={subBoxCount}
            >
              -
            </button>
            <button>
              <p className={s.BoxDeliveryItemCount}>{count}</p>
            </button>
            <button id={id} onClick={addBoxCount}>
              +
            </button>
          </div>
        </div>
        <div className={s.Pricing}>
          <p className={s.PricingAmount}>Сумма</p>
          <p className={s.PricingSum}>{count * price} грн</p>
        </div>
      </div>
      <button
        onClick={removeFromBucketBox}
        className={s.BucketDeleteButton}
        id={id}
      >
        <img id={id} onClick={removeFromBucketBox} src={close} alt="close_icon"/>
      </button>
    </li>
  );
};

export default BucketBoxes;
