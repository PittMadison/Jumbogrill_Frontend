import React, { Component, Fragment } from "react";

import { renamed } from "../../../../utils/helper";

import closeIcon from "../../../../assets/img/closeIcon.svg";
import pencil from "../../../../assets/img/pencil.svg";
import deleteBtn from "../../../../assets/img/deleteBtn.svg";
import logo from "../../../../assets/img/jumbo_log_blackprint.svg";

import s from "./MenuEdit.module.css";
import MenuAdd from "../MenuAdd/MenuAdd";

class MenuEdit extends Component {
  state = {
    change: false,
    add: false
  };

  changeToggle = () => this.setState({ change: !this.state.change });
  addToggle = () => this.setState({ add: !this.state.add });

  render() {
    let totalPrice = this.props.set.products
      .reduce(
        (acc, el) =>
          acc +
          (el.is_kega
            ? Math.round(
                Number(el.weight_for_catering) * Number(el.price) * 1000
              ) / 1000
            : Math.round(
                (Number(el.weight_for_catering) /
                  1000 /
                  (Number(el.weight) / 1000)) *
                  Number(el.price) *
                  Number(this.props.people) *
                  1000
              ) / 1000),
        0
      )
      .toFixed(2);

    let oneGuestPrice = (totalPrice / this.props.people).toFixed(2);

    let totalWeightKg = this.props.set.products
      .filter(el => !el.is_drink && !el.is_kega)
      .reduce(
        (acc, el) =>
          acc +
          Math.round(
            (Number(el.weight_for_catering) / 1000) *
              Number(this.props.people) *
              1000
          ) /
            1000,
        0
      )
      .toFixed(2);

    let totalWeightL = this.props.set.products
      .filter(el => el.is_drink || el.is_kega)
      .reduce(
        (acc, el) =>
          acc + el.is_kega
            ? Math.round(
                Number(el.weight) * Number(el.weight_for_catering) * 1000
              ) / 1000
            : Math.round(
                (Number(el.weight_for_catering) / 1000) *
                  Number(this.props.people) *
                  1000
              ) / 1000,
        0
      )
      .toFixed(2);

    let oneGuestWeightKg = (totalWeightKg / this.props.people).toFixed(2);
    let oneGuestWeightL = (totalWeightL / this.props.people).toFixed(2);

    const styles = this.state.change
      ? {}
      : {
          justifyContent: "flex-end"
        };
    const disabled = el => {
      if (el.weight_for_catering === 10 && !el.is_kega) {
        return true;
      } else if (el.weight_for_catering === 1 && el.is_kega) {
        return true;
      } else return false;
    };
    return (
      <Fragment>
        {this.state.add && (
          <MenuAdd
            window={this.props.window}
            addDishToSet={this.props.addDishToSet}
            deleteDish={this.props.deleteDish}
            categories={this.props.categories}
            set={this.props.set}
            addToggle={this.addToggle}
          />
        )}
        <div className={s.Wrapper}>
          <img
            onClick={this.props.detailsHandler}
            className={s.Close}
            src={closeIcon}
            alt="close_icon"
          />
          <div className={s.TopContext}>
            <h5 className={s.Title}>
            {this.props.window > 500 ? 'Меню: ' : ''}
              <span className={s.TitleCategory}>{this.props.set.name}</span>
            </h5>
            <div className={s.Counter}>
              <p className={s.PeopleNumber}>{this.props.window < 400 ? 'К-во человек' : 'Количество человек'}</p>

              <div className={s.ButtonsTop}>
                <button
                  disabled={
                    this.props.people === 1 || this.props.people === "1"
                  }
                  className={s.FirstButton}
                  onClick={this.props.guestNumberHandler}
                  name={renamed(this.props.set.name)}
                >
                  -
                </button>
                <button>
                  <p className={s.PeopleCounter}>{this.props.people}</p>
                </button>
                <button
                  className={s.LastButton}
                  onClick={this.props.guestNumberHandler}
                  name={renamed(this.props.set.name)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button onClick={this.changeToggle} className={s.ChangeBtn}>
            <img src={pencil} alt="pencil_pic" />
            <p>Изменить</p>
          </button>
          <div className={s.TableScroll}>
            <table className={s.Table}>
              <thead>
                <tr className={s.BucketTableRow}>
                  <th className={s.Positions}>{""}</th>
                  <th className={s.Portion}>Выход</th>
                  <th className={s.Pricing}>Цена</th>
                  <th>Порция на чел.</th>
                  <th className={s.Weight}>Общий вес кг</th>
                  <th className={s.Total}>Итого</th>
                </tr>
              </thead>
              <tbody>
                {this.props.set.products.map(el => (
                  <tr key={el.id}>
                    <th className={s.ProductName}>
                      {this.state.change ? (
                        <Fragment>
                          <img
                            onClick={this.props.deleteDish}
                            name={this.props.set.name}
                            id={el.id}
                            src={deleteBtn}
                            alt="delete_btn"
                          />
                          <p>{el.name}</p>
                        </Fragment>
                      ) : (
                        el.name
                      )}
                    </th>
                    <th>
                      {(el.is_kega
                        ? Number(el.weight)
                        : Number(el.weight / 1000)) +
                        (el.is_drink || el.is_kega ? " л" : " кг")}
                    </th>
                    <th>{el.price + " грн"}</th>
                    <th className={s.Buttons}>
                      <button
                        id={el.id}
                        name={this.props.set.name}
                        data-kega={el.is_kega}
                        onClick={this.props.onePersonWeight}
                        disabled={disabled(el)}
                        className={s.FirstButton}
                      >
                        -
                      </button>
                      <button>
                        <p className={s.PeopleCounterSet}>
                          {el.is_kega
                            ? Math.round(
                                (Number(el.weight_for_catering) *
                                  Number(el.weight) *
                                  1000) /
                                  Number(this.props.people)
                              ).toFixed(0)
                            : (Number(el.weight_for_catering)).toFixed(0)}
                        </p>
                      </button>
                      <button
                        id={el.id}
                        name={this.props.set.name}
                        data-kega={el.is_kega}
                        className={s.LastButton}
                        onClick={this.props.onePersonWeight}
                      >
                        +
                      </button>
                    </th>
                    <th>
                      {(el.is_kega
                        ? Math.round(
                            Number(el.weight) * Number(el.weight_for_catering)
                          )
                        : Math.round(
                            (Number(el.weight_for_catering) / 1000) *
                              Number(this.props.people) *
                              1000
                          ) / 1000) +
                        (el.is_drink || el.is_kega ? " л" : " кг")}
                    </th>
                    <th>
                      {(el.is_kega
                        ? (
                            Math.round(
                              Number(el.weight_for_catering) *
                                Number(el.price) *
                                1000
                            ) / 1000
                          ).toFixed(2)
                        : (
                            Math.round(
                              (Number(el.weight_for_catering) /
                                1000 /
                                (Number(el.weight) / 1000)) *
                                Number(el.price) *
                                Number(this.props.people) *
                                1000
                            ) / 1000
                          ).toFixed(2)) + " грн"}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={s.BotContext} style={styles}>
            <img className={s.Logo} src={logo} alt="logo" />

            {this.state.change && (
              <button className={s.AddBtn} onClick={this.addToggle}>
                Добавить
              </button>
            )}

            <div className={s.Results}>
              <p className={s.TotalPrice}>
                <span className={s.FieldName}>{"стоимость меню, грн: "}</span>
                <span className={s.FieldInfo}>{totalPrice + " грн"}</span>
              </p>
              <p className={s.OneGuestPrice}>
                <span className={s.FieldName}>
                  {"стоимость на 1 гостя, грн: "}
                </span>
                <span className={s.FieldInfo}>{oneGuestPrice + " грн"}</span>
              </p>
              <p className={s.TotalWeight}>
                <span className={s.FieldName}>
                  {"общий вес блюд, кг / литр: "}
                </span>
                <span className={s.FieldInfo}>
                  {totalWeightKg + " кг " + totalWeightL + " л"}
                </span>
              </p>
              <p className={s.OneGuestWeight}>
                <span className={s.FieldName}>
                  {"общий вес на 1 гостя, кг / литр: "}
                </span>
                <span className={s.FieldInfo}>
                  {oneGuestWeightKg + " кг " + oneGuestWeightL + " л"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MenuEdit;
