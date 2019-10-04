import React, { Fragment, Component } from "react";

import s from "./GrillInfo.module.css";

import buffet from "../../../assets/img/buffetImg.jpg";

import rightArrow from "../../../assets/img/rightArrow.svg";
import cateringLogo from "../../../assets/img/cateringLogo.svg";
class GrillInfo extends Component {
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

  render() {
    const buy = event => {
      event.preventDefault();
      event.target.innerText==='ОТМЕНИТЬ'? this.props.setIdToZero() : this.props.serviceIdHandler(event);
      this.props.serviceToggle(event);
      this.props.flagToggle(event)
    };
    return (
      <Fragment>
        <img className={s.Logo} src={cateringLogo} alt="logo" />
        <form onSubmit={this.props.finalOrder ? this.props.returnToFinal : this.props.nextStep} className={s.Form}>
          <div className={s.Main}>
            <h4 className={s.Title}>Пятый шаг</h4>
            <p className={s.SubTitle}>Создайте удобство для Вашего отдыха</p>
            <h5 className={s.Service}>Зона «Мангал Шоу»</h5>
            <p className={s.ListTitle}>Входит в стоимость:</p>
            <ul className={s.List}>
              <li>- Мастер-класс от шеф - повара JUMBO GRILL по приготовлению гриля</li>
              <li>- Team building - активное участие гостей в приготовлении еды</li>
              <li>- Гриль установка</li>
              <li>- Зона разборки</li>
              <li>- Персонал</li>
            </ul>
            <p className={s.Extra}>Дополнительная информация:</p>
            <p className={s.Info}>
              <span className={s.Price}>* </span>Логистика 20км входит в стоимость
            </p>
            <button className={s.Button} type="button" onClick={this.detailsHandler}>
              <span>Подробнее</span>
              <img src={rightArrow} alt="arrow" />
            </button>
          </div>

          {this.state.details && (
            <div className={s.Details}>
            <div className={s.Title900}>
              <h4 className={s.Title}>Пятый шаг</h4>
              <p className={s.SubTitle}>Создайте удобство для Вашего отдыха</p>
            </div>
              <img className={s.BuffetPic} src={buffet} alt="buffet_pic" />
              <p className={s.Description}>Фуршетная линия сделает Ваш отдых комфортным и незабываемым Фуршетная линия сделает</p>
              <ul>
                {this.props.step.services.map(el => (
                  <li key={el.id} className={s.BuffetItem}>
                    <p className={s.ItemName}>
                      <span className={s.ItemService}>«Мангал Шоу»</span>
                      <span className={s.ItemPrice}>{"на " + el.from_people + "-" + el.up_to_people + " человек: " + el.price + " грн"}</span>
                    </p>
                    <button id={el.id} onClick={buy} data-name="grill" className={this.props.step.services.find(elm=>elm.id===Number(el.id)).is_selected?[s.BuyBtn, s.Green].join(' '):s.BuyBtn} type="submit">
                    {this.props.step.services.find(elm=>elm.id===Number(el.id)).is_selected?'ОТМЕНИТЬ':'ВЫБРАТЬ'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button className={s.SkipBtn} type="submit">
            {this.props.step.services.some(el => el.is_selected) ? "ДАЛЬШЕ" : "ПРОПУСТИТЬ"}
          </button>
        </form>
      </Fragment>
    );
  }
}
export default GrillInfo;
