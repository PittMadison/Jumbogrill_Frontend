import React, { Component } from "react";
import s from "./OfficeServices.module.css";

import logo from "../../../assets/img/jumbo_log_blackprint.svg";
import closeIcon from "../../../assets/img/closeIcon.svg";

import {postReq} from '../../../utils/helper';

import {finalOrderPost} from '../../../utils/api';

export default class OfficeServices extends Component {

  render() {
 
    const postFunc = event => {
      event.preventDefault()
      postReq(this.props, finalOrderPost)
    }

    return (
      <form className={s.Form} onSubmit={this.props.step.name==='service' ? postFunc : null}>

      {this.props.step.name === 'rest' && <img onClick={this.props.serviceItemsToggle}
           className={s.Close}
            src={closeIcon}
            alt="close_icon"
      />}
      <img className={s.Logo} src={logo} alt="logo" />
      {this.props.step.name === 'service' && <h5 className={s.Step}>Третий шаг</h5>}
      <p className={s.Title}>Дополнительные услуги</p>

      <div className={s.TableWrapper}>

        <table className={s.Table}>
          <thead>
            <tr className={s.ServiceHead}>
              <th className={s.Service}>Услуга</th>
              <th className={s.Price}>Цена</th>
              <th className={s.Quantity}>Количество</th>
              <th className={s.Total}>Сумма</th>
            </tr>
          </thead>
          <tbody className={s.TableBody}>
            {this.props.step.serviceItems.map(el => (
              <tr key={el.id} className={s.ServiceRow}>
                <th>
                  <label className={s.Radio}>
                    {el.name}
                    <input onChange={this.props.checkOffice} type="checkbox" name={el.name} checked={this.props.step.inputs[el.name]} />
                    <span className={s.Checkmark} />
                  </label>
                </th>
                <th className={s.Price}>{el.price + ' грн'}</th>
                <th>
                  <div className={s.ButtonsTop}>
                    <button className={s.FirstButton} 
                        type='button'
                        disabled={el.quantity === 1 || el.quantity === "1"} 
                        onClick={this.props.quantityHandler} 
                        id={el.id}>
                      -
                    </button>
                    <button type='button'>
                      <p className={s.PeopleCounter}>{el.quantity}</p>
                    </button>
                    <button className={s.LastButton}
                        type='button' 
                        onClick={this.props.quantityHandler} 
                        id={el.id}>
                      +
                    </button>
                  </div>
                </th>
                <th className={s.Total}>{+(el.price*el.quantity).toFixed(2) + ' грн'}</th>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
        

        {this.props.step.name === 'service' && <button type='submit' className={s.Button}>В КОРЗИНУ</button>}
      </form>
    );
  }
}
