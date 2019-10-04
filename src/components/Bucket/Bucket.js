import React from "react";
import s from "./Bucket.module.css";
import BucketTableRow from "./BucketTableRow/BucketTableRow";
import BucketOrder from "../../containers/BucketOrder/BucketOrder";
import BucketBoxes from "./BucketBoxes/BucketBoxes";

const Bucket = props => {
  return props.ordering ? (
    <BucketOrder
    clearBucket={props.clearBucket}
    takeMessage={props.takeMessage}
    modalToggle={props.modalToggle}
      orderForm={props.orderForm}
      boxDeliveryBucket={props.boxDeliveryBucket}
      orderingChange={props.orderingChange}
    />
  ) : (
    <div
      className={
          s.BucketWrapper
      }
    >
      <h4 className={s.BucketHeading}>Корзина</h4>
      <ul className={s.BucketList}>
        {props.boxDeliveryBucket.map(el => (
          <BucketBoxes
            key={el.id}
            id={el.id}
            name={el.name}
            image={el.image}
            price={el.price}
            count={el.count}
            removeFromBucketBox={props.removeFromBucketBox}
            addBoxCount={props.addBoxCount}
            subBoxCount={props.subBoxCount}
          />
        ))}
      </ul>
      {props.boxDeliveryBucket.length ? (
        <table className={s.Display2}>
          <thead>
            <tr className={s.BucketTableRow}>
              <th>Товар</th>
              <th>Цена</th>
              <th>Количество</th>
              <th>Сумма</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {props.boxDeliveryBucket.map(el => (
              <BucketTableRow
                key={el.id}
                id={el.id}
                name={el.name}
                image={el.image}
                price={el.price}
                count={el.count}
                removeFromBucketBox={props.removeFromBucketBox}
                addBoxCount={props.addBoxCount}
                subBoxCount={props.subBoxCount}
              />
            ))}
          </tbody>
        </table>
      ) : null}
        <p className={s.BucketPayment}>
        <span>ИТОГО К ОПЛАТЕ:</span>
        <span>
          {props.boxDeliveryBucket.reduce((acc, el) => acc + el.totalPrice, 0)}{" "}
          грн
        </span>
      </p>
      <button
        className={props.boxDeliveryBucket.length===0 ? s.BucketOrderDisabled : s.BucketOrderBtn}
        onClick={props.orderingChange}
        disabled={props.boxDeliveryBucket.length===0}
      >
        ОФОРМИТЬ ЗАКАЗ
      </button>
    </div>
  );
};

export default Bucket;
