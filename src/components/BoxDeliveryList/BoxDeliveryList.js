import React from "react";
import glovoLogo from "../../assets/img/glovo_icon.svg";
import uberEatsLogo from "../../assets/img/uber_eats_icon.svg";
import s from "./BoxDeliveryList.module.css";
import BoxDeliveryItem from "./BoxDeliveryItem/BoxDeliveryItem";
import jumboDelivery from "../../assets/img/jumboBoxDel.svg";

const BoxDeliveryList = props => {
  return props.boxDeliveryData.length === 0 ? (
    <p className={s.BoxDeliveryMessage}>Page is loading</p>
  ) : (
    <div className={s.BoxDeliveryWrapper}>
      <div className={s.BoxDeliveryHeadingWrapper}>
        <div className={s.HeadTop}>
          <h4 className={s.BoxDeliveryHeading}>BOX-доставка</h4>
          <div className={s.BoxDeliveryHeadingIcons}>
            <p>
              До{" "}
              <span>
                <strong>3000 грн</strong>{" "}
              </span>
              доставка только:
            </p>
            {/* <img src={glovoLogo} alt="glovo_icon" /> */}
            <a href="https://www.ubereats.com/ru-UA/kyiv/food-delivery/jumbo-grill/NdofxFbNQDC07Z4Z9Tqghw/">
                <img
                className={s.UberEats}
                src={uberEatsLogo}
                alt="uber_eats_icon"
              />
            </a>
          </div>
        </div>
        <div className={s.HeadBottom}>
          <button onClick={props.modalRequestChange}>
            Подбор индивидиального бокса
          </button>
          <div className={s.DeliveryKiev}>
            <p className={s.KievDeliveryText}>
              <span>
                От 3000 грн <strong>бесплатно</strong> по Киеву:
              </span>
              <span>
                Прием заказов с <strong>8:00</strong> до <strong>20:00</strong>
              </span>
              <span>
                Время на приготовление и доставки заказа до <strong>4-x</strong>{" "}
                часов
              </span>
            </p>
            <img src={jumboDelivery} alt="jumbo_delivery" />
          </div>
        </div>
      </div>
      <ul className={s.BoxDeliveryList}>
        {props.boxDeliveryData.map(el => (
          <BoxDeliveryItem
            ingredients={el.box_ingredient}
            boxInfoHandler={props.boxInfoHandler}
            boxPopUpOn={props.boxPopUpOn}
            id={el.id}
            key={el.id}
            price={el.price}
            weight={el.weight}
            name={el.name}
            description={el.description}
            image={el.image}
            defaultCount={el.default_count}
            addDefaultCount={props.addDefaultCount}
            subDefaultCount={props.subDefaultCount}
            boxDeliveryData={props.boxDeliveryData}
            addToBucketBox={props.addToBucketBox}
          />
        ))}
      </ul>
    </div>
  );
};

export default BoxDeliveryList;
