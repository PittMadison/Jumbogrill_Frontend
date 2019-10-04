import React from "react";
import s from "./BucketTableOrder.module.css";

const BucketTableOrder = props => {
  return (
    <table className={s.BucketOrderTable}>
      <thead className={s.BucketTableOrderHead}>
        <tr>
          <th className={s.BucketTableOrderHeadCells}>BOX-доставка</th>
          <th className={s.BucketTableOrderHeadCells}>Цена</th>
        </tr>
      </thead>
      <tbody>
        {props.boxDeliveryBucket.map(el => {
          return (
            <tr key={el.id}>
              <td className={s.BucketTableOrderCells}>{el.name}</td>
              <td className={[s.BucketTableOrderCells, s.Pricing].join(" ")}>
                {el.totalPrice + " грн"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BucketTableOrder;
