import React, { Fragment } from "react";
import s from "./BucketTableRow.module.css";

import close from "../../../assets/img/closeWhite.svg";


const BucketTableRow = props => {
  return (
    <Fragment>
      <tr className={s.BucketTableRow}>
        <th className={s.BucketTableRowHead}>
          <img className={s.Img} src={props.image} alt="food_box_pic" />
          <p>{props.name}</p>
        </th>
        <td className={s.TablePriceCell}>{+(props.price).toFixed(2) + ' грн'}</td>
        <td>
          <div className={s.BucketTableRowButtons}>
            <button
              disabled={props.count === 1 ? true : false}
              id={props.id}
              onClick={props.subBoxCount}
            >
              -
            </button>
            <button className={s.BucketTableRowMidBtn}>
              <p className={s.BucketTableRowCount}>{props.count}</p>
            </button>
            <button id={props.id} onClick={props.addBoxCount}>
              +
            </button>
          </div>
        </td>
        <td>
          <p className={s.Pricing}>{+(props.count * props.price).toFixed(2) + ' грн'}</p>
        </td>
        <td>
          <button
            onClick={props.removeFromBucketBox}
            className={s.BucketDeleteButton}
            id={props.id}
          >
            <img onClick={props.removeFromBucketBox} id={props.id} src={close} alt="close_icon"/>
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default BucketTableRow;
