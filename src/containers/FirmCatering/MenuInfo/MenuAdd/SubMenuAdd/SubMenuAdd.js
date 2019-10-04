import React from "react";

import s from "./SubMenuAdd.module.css";

import closeIcon from "../../../../../assets/img/closeIcon.svg";

const SubMenuAdd = props => {
 
  let products = props.category.items.reduce(
    (acc, el) => acc.concat(el.product),
    []
  );
  
  return (
    <div className={s.Wrapper}>
      <img
        onClick={props.detailsHandler}
        className={s.Close}
        src={closeIcon}
        alt="close_icon"
      />
      <h5 className={s.Title}>{props.category.name}</h5>
      <div className={s.TableWrapper}>
        <table className={s.Table}>
          <thead>
            <tr className={s.TableRow}>
              <th>Наименование</th>
              <th className={s.Weight}>Выход</th>
              <th className={s.Pricing}>Цена</th>
              <th className={s.Add}>{""}</th>
            </tr>
          </thead>
          <tbody>
            {products.map(el => (
              <tr className={s.DishRow} key={el.id}>
                <td>{el.name}</td>
                <td>
                  {(el.is_kega ? el.weight : el.weight / 1000) +
                    (el.is_drink || el.is_kega ? " л" : " кг")}
                </td>
                <td>{el.price + " грн"}</td>
                <td id='btn'>
                  <button
                    style={
                      props.set.products.some(elem => elem.id === el.id)
                        ? { color: "#6b6b6b3b", border: "1px solid #DCDCDC" }
                        : {}
                    }
                    className={s.AddBtn}
                    disabled={props.set.products.some(
                      elem => elem.id === el.id
                    )}
                    onClick={props.addDishToSet}
                    data-set={props.set.name}
                    name={props.category.name}
                    id={el.id}
                  >
                    {props.window < 600 ? '\u2795' : 'Добавить'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubMenuAdd;
