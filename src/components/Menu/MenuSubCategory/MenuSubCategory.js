import React from "react";

import s from "./MenuSubCategory.module.css";

const MenuSubCategory = props => {
  console.log(props.subCategory.product);
  return (
    <div className={s.MenuSubCategory}>
      <div className={s.Title}>
        <div className={s.Category}>
          <h5 className={s.CategoryTitle}>{props.subCategory.name}</h5>
          <div className={s.DishInfo}>
            <p className={s.DishName}>Наименование</p>
            <p className={s.DishWeight}>Выход</p>
            <p className={s.DishPrice}>Цена</p>
          </div>
          {props.subCategory.product.map(el => (
            <div key={el.id} className={s.DishBox}>
              <p className={s.Dish}>{el.name}</p>
              <p className={s.Weight}>
                {(el.is_kega ? el.weight : el.weight / 1000) +
                  (el.is_drink || el.is_kega ? " л" : " кг")}
              </p>
              <p className={s.Price}>{el.price} грн</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSubCategory;
