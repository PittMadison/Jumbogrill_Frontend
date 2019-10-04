import React, { Component, Fragment } from "react";

import logo from "../../../assets/img/jumbo_log_blackprint.svg";

import { renamed } from "../../../utils/helper";

import s from "./ServingInfo.module.css";
import ServingDetails from "./ServingDetails/ServingDetails";

class ServingInfo extends Component {
  state = {
    details: false,
    id: 0,
    window: 0
  };

  componentDidMount = () => {
    window.addEventListener('resize', this.getWindowWidth);
    this.setState({window: window.innerWidth})
  } 

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.getWindowWidth);
  } 

  getId = event => this.setState({ id: event.currentTarget.id });
  detailsToggle = () => this.setState({ details: !this.state.details });

  getWindowWidth = () => {
    this.setState({window: window.innerWidth})
  }

  render() {
    const detailsOpen = event => {
      this.getId(event);
      this.detailsToggle();
    };

    const buy = event => {
      if (event.target.innerText==='ВЫБРАТЬ') this.props.resetBuffetServices();
      event.target.innerText==='ОТМЕНИТЬ'? this.props.setIdToZero() : this.props.serviceIdHandler(event);
      this.props.buyToggle(event);
    };

    return (
      <Fragment>
        {this.state.details && <ServingDetails step={this.props.step} buy={buy} detailsToggle={this.detailsToggle} buffet={this.props.step.forms.find(el => el.id === Number(this.state.id))} />}
        <form style={this.state.window < 750 ? {height: '423px'} : {}} onSubmit={this.props.finalOrder ? this.props.returnToFinal : this.props.doubleNextStep} className={s.Form}>
          <img className={s.Logo} src={logo} alt="logo" />
          <h4 className={s.Step}>Третий шаг</h4>
          <p className={s.SubTitle}>Выберите форму подачи блюд</p>
          <div className={s.FormsWrapper}>
          
          <ul className={s.Forms}>
            {this.props.step.forms.map(el => (
              <li className={s.FormItem} key={el.id}>
                <h6 className={s.ServingName}>{el.name}</h6>
                <div
                  className={s.ServingBox}
                  style={{
                    backgroundImage: `url(${el.image})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                  }}
                />
                <p className={s.ServingPrice}>
                  {"Стоимость: "}
                  <strong>{el.price}</strong>
                  {" грн"}
                </p>
                {el.name !== "Фуршетная" ? (
                  <div className={s.BotContext}>
                    <button onClick={detailsOpen} id={el.id} type="button" className={s.MenuButton}>
                      Подробнее
                    </button>
                    <button id={el.id} type="button" data-name={renamed(el.name)} onClick={buy} className={this.props.step[renamed(el.name)] ? [s.MenuButton, s.Green].join(" ") : s.MenuButton}>
                      {this.props.step[renamed(el.name)] ? "Отменить" : "Выбрать"}
                    </button>
                  </div>
                ) : (
                  <button onClick={this.props.nextStep} id={el.id} type="button" className={[s.MenuButton, s.Width].join(" ")}>
                    Подробнее
                  </button>
                )}
              </li>
            ))}
          </ul>
            
          </div>
          
          <button disabled={this.props.step.buffet === false && this.props.step.corporate === false && this.props.step.banquet === false ? true : false} type="submit" className={s.Button}>
            Дальше
          </button>
        </form>
      </Fragment>
    );
  }
}

export default ServingInfo;
