import React, { Fragment, Component } from "react";

import s from "./RestInfo.module.css";

import cateringLogo from "../../../assets/img/cateringLogo.svg";
import rightArrow from "../../../assets/img/rightArrow.svg";
import buffet from "../../../assets/img/buffetImg.jpg";
import OfficeServices from "../../OfficeCatering/OfficeServices/OfficeServices";

class RestInfo extends Component {
  state = {
    serviceItemsToggle: false,
    details: false,
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

  serviceItemsToggle = () => {
    this.setState({ serviceItemsToggle: !this.state.serviceItemsToggle });
    console.log('working')
  }

  render() {

    const buy = event => {
      event.preventDefault();
      event.target.innerText==='ОТМЕНИТЬ'? this.props.setIdToZero() : this.props.serviceIdHandler(event);
      this.props.serviceToggle(event);
      this.props.flagToggle(event)
    };
    return (
      <Fragment>
      {this.state.serviceItemsToggle && 
        <OfficeServices 
          serviceItemsToggle={this.serviceItemsToggle} 
          step={this.props.step} 
          checkOffice={this.props.checkOffice} 
          quantityHandler={this.props.quantityHandler}
          />}
        <img className={s.Logo} src={cateringLogo} alt="logo" />
        <form onSubmit={this.props.finalOrder ? this.props.returnToFinal : this.props.nextStep} className={s.Form}>
          <div className={s.Main}>
            <h4 className={s.Title}>Шестой шаг</h4>
            <p className={s.SubTitle}>Создайте удобство для Вашего отдыха</p>
            <h5 className={s.Service}>
              «Зона Отдыха»
            </h5>
            <p className={s.ListTitle}>Входит в стоимость:</p>
            <ul className={s.List}>
              <li>
                - Комплекты мебели ( фирменные столы и лавки на 6 человек )
              </li>
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
          </div>

          {this.state.details && (
            <div className={s.Details}>
            <div className={s.Title900}>
              <h4 className={s.Title}>Шестой шаг</h4>
              <p className={s.SubTitle}>Создайте удобство для Вашего отдыха</p>
            </div>  
              <h5 className={s.Title2}>РЕКОМЕНДУЕМ ПОДБИРАТЬ ИНДИВИДУАЛЬНО</h5>
              <div className={s.TopDetails}>

                <ul className={s.List2}>
                  <li>Аренда МЕБЕЛИ</li>
                  <li>Аренда ИНВЕНТАРЯ</li>
                </ul>

                <button className={s.Btn} onClick={this.serviceItemsToggle} type='button'>ДОПОЛНИТЕЛЬНО</button>

              </div>
              <ul>
                {this.props.step.services.map(el => (
                  <li key={el.id} className={s.BuffetItem}>
                    <p className={s.ItemName}>
                      <span className={s.ItemService}>«Зона отдыха»</span>
                      <span className={s.ItemPrice}>{"на " + el.from_people + "-" + el.up_to_people + " человек: " + el.price + " грн"}</span>
                    </p>
                    <button id={el.id} onClick={buy} data-name="rest" className={this.props.step.services.find(elm=>elm.id===Number(el.id)).is_selected?[s.BuyBtn, s.Green].join(' '):s.BuyBtn} type="submit">
                    {this.props.step.services.find(elm=>elm.id===Number(el.id)).is_selected?'ОТМЕНИТЬ':'ВЫБРАТЬ'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button className={s.SkipBtn} type="submit">
            {this.props.step.services.some(el => el.is_selected) || Object.keys(this.props.step.inputs).filter(el=>this.props.step.inputs[el]===true).length > 0 ? "ДАЛЬШЕ" : "ПРОПУСТИТЬ"}
          </button>
        </form>
      </Fragment>
    );
  }
}

export default RestInfo;
