import React, { Fragment, Component } from "react";

import s from "./BuffetInfo.module.css";

import rightArrow from "../../../assets/img/rightArrow.svg";
import cateringLogo from "../../../assets/img/cateringLogo.svg";

import buffet from "../../../assets/img/buffetImg.jpg";
class BuffetInfo extends Component {
  state = {
    details: false,
    serviceId: 0,
    window: 0
  };

  componentDidMount = () => {
    window.addEventListener('resize', this.getWindowWidth);
    this.setState({window: window.innerWidth})

    if(this.state.window <= 900) this.setState({details: true});
  } 

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.getWindowWidth);
  } 

  getWindowWidth = () => {
    this.setState({window: window.innerWidth})
  }

  detailsHandler = () => this.setState({ details: !this.state.details });
  detailsFalse = () => this.setState({ details: false });

  render() {
    const buy = event => {
      event.preventDefault();
      event.target.innerText==='ОТМЕНИТЬ'? this.props.setIdToZero() : this.props.serviceIdHandler(event);
      this.props.serviceToggle(event);
      this.props.buffetBuyToggle(event);
    };
    const defaultCase = (event) => 
      event.target.innerText==='ПРОПУСТИТЬ'?
      this.props.selectServingByDefault():null
    ;
    const back = event => {
      this.detailsFalse();
      this.props.backStep(event);
    };

    console.log(this.props.finalOrder);

    return (
      <Fragment>
        <img className={s.Logo} src={cateringLogo} alt="logo" />
        <form onSubmit={this.props.finalOrder ? this.props.returnToFinal : this.props.nextStep}
        className = {s.Form} >
          <div className={s.Main}>
            <h4 className={s.Title}>Четвёртый шаг</h4>
            <p className={s.SubTitle}>Создайте удобство для Вашего отдыха</p>
            <h5 className={s.Service}>
              «Фуршетная линия» 
            </h5>
            <p className={s.ListTitle}>Входит в стоимость:</p>
            <ul className={s.List}>
              <li>- Шатры JUMBO GRILL</li>
              <li>- Фирменные столы</li>
              <li>- Чафендиши</li>
              <li>- Этажерка для канапе (300 грн) </li>
              <li>- Текстиль</li>
              <li>- Два шатра (1200грн)</li>
            </ul>
            <p className={s.Extra}>Дополнительная информация:</p>
            <p className={s.Info}>
              <span className={s.Price}>* </span>Логистика 20км входит в
              стоимость
            </p>
            <button
              className={s.Button}
              type="button"
              onClick={this.detailsHandler}
            >
              <span>Подробнее</span>
              <img src={rightArrow} alt="arrow" />
            </button>
            <button className={s.BackButton} type="button" onClick={back}>
              <img className={s.LeftArrow} src={rightArrow} alt="arrow" />
              <span>НАЗАД</span>
            </button>
          </div>

          {this.state.details && (
            <div className={s.Details}>
              <div className={s.Title900}>
                <h4 className={s.Title}>Четвёртый шаг</h4>
                <p className={s.SubTitle}>Создайте удобство для Вашего отдыха</p>
              </div>
              <img className={s.BuffetPic} src={buffet} alt="buffet_pic" />
              <p className={s.Description}>
                Фуршетная линия сделает Ваш отдых комфортным и незабываемым
                Фуршетная линия сделает
              </p>
              <ul>
                {this.props.step.services.map(el => (
                  <li key={el.id} className={s.BuffetItem}>
                    <p className={s.ItemName}>
                      <span className={s.ItemService}>«Фуршетная линия»</span>
                      <span className={s.ItemPrice}>
                        {"на " +  el.from_people + "-" +  el.up_to_people + " человек: " +  el.price + " грн"}
                      </span>
                    </p>
                    <button
                      id={el.id}
                      data-name="buffet"
                      onClick={buy}
                      className={this.props.step.services.find(elm=>elm.id===Number(el.id)).is_selected?[s.BuyBtn, s.Green].join(' '):s.BuyBtn}
                      type="button"
                    >
                      {this.props.step.services.find(elm=>elm.id===Number(el.id)).is_selected?'ОТМЕНИТЬ':'ВЫБРАТЬ'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={defaultCase} data-name="buffet" className={s.SkipBtn} type="submit">
            {this.props.step.services.some(el=>el.is_selected)?'ДАЛЬШЕ':'ПРОПУСТИТЬ'}
          </button>
          {!this.props.finalOrder && <button onClick={back} className={[s.SkipBtn, s.Btn900].join(' ')} type="button">
            {'НАЗАД'}
          </button>}
        </form>
      </Fragment>
    );
  }
}

export default BuffetInfo;
