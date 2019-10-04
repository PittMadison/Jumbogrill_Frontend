import React, { Fragment, Component } from "react";

import logo from "../../../assets/img/jumbo_log_blackprint.svg";
import { getIcon, renamed, windowBasedStyle } from "../../../utils/helper";

import s from "./MenuInfo.module.css";
import MenuEdit from "./MenuEdit/MenuEdit";
import Reccomend from "../../Recommend/Reccomend";

class MenuInfo extends Component {
  state = {
    id: 0,
    set: "",
    details: false,
    window: 0,
    recommend: false,
    Дети: true,
    Мясоеды: true,
    Вегeтарианцы: true
  };

  
  componentDidMount = () => {
    window.addEventListener('resize', this.getWindowWidth)

    let sets = this.props.step.sets;

    let inputsObj = this.props.allSteps.find(el => el.name === "guest").inputs;

    this.props.defineSets(inputsObj, sets, renamed);

    this.setState({window: window.innerWidth})

  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.getWindowWidth);
  }

  getWindowWidth = () => {
    this.setState({window: window.innerWidth})
  }

  getSet = event => {
      this.setState({
        id: Number(event.target.id),
        set: event.target.name
      });
    };

  detailsHandler = () => this.setState({ details: !this.state.details });

  reccomendHandler = () => this.setState({recommend: !this.state.recommend});

  counterHandler = setname => {
    if (this.state[setname]) {
    this.setState({[setname]: false,
      recommend: !this.state.recommend})
    }
    console.log(setname)
  }

  render() {
    const detailsOpen = async event => {
      
      await this.getSet(event);
      this.counterHandler(this.state.set);
      this.detailsHandler();
     

    };
    const people = this.props.allSteps.find(el => el.name === "guest").inputs[
      renamed(this.state.set)
    ];
    const set = this.props.step.sets.find(el => el.name === this.state.set);

    const menu = this.props.allSteps.find(el => el.name === "menu");

    let isBought = Object.keys(menu)
      .filter(el => menu.sets.map(elem => renamed(elem.name)).includes(el))
      .filter(element => menu[element] === true);


    let guests = isBought.reduce(
      (acc, el) =>
        acc +
        Number(this.props.allSteps.find(el => el.name === "guest").inputs[el]),
      0
    );

    let ahead = () => {
      this.props.totalGuestCorrector(guests);
    };
    return (
      <Fragment>
      {this.state.recommend && (
        <Reccomend
          reccomendHandler={this.reccomendHandler}
          step={this.props.step}
          id={this.state.id}
        />
      )}
        {this.state.details && (
          <MenuEdit
          window={this.state.window}
            deleteDish={this.props.deleteDish}
            onePersonWeight={this.props.onePersonWeight}
            guestNumberHandler={this.props.guestNumberHandler}
            categories={this.props.categories}
            detailsHandler={this.detailsHandler}
            set={set}
            people={people}
            addDishToSet={this.props.addDishToSet}
          />
        )}
        <form style={windowBasedStyle(this.state.window, this.props.step.sets.length)} onSubmit={this.props.finalOrder ? this.props.returnToFinal : this.props.nextStep} className={s.Form}>
          <img className={s.Logo} src={logo} alt="logo" />
          <h4 className={s.Step}>Второй шаг</h4>
          <p className={s.SubTitle}>Меню для гостей</p>

          <ul style={this.props.step.sets.length === 1  ? {justifyContent: 'center'} : this.state.window > 600 && this.props.step.sets.length === 2 ? {justifyContent: 'center'} : {}} className={s.Sets}>
            {this.props.step.sets.map(el => (
              <li className={s.SetItem} key={el.id}>
                <div className={s.TopContext}>
                  <h6 className={s.SetName}>
                    <img
                      className={s.Icon}
                      src={getIcon(el.name)}
                      alt="icon_pic"
                    />
                    <span>{el.name}</span>
                  </h6>
                  <p className={s.SetPeople}>
                    {this.props.allSteps.find(
                      element => element.name === "guest"
                    ).inputs[renamed(el.name)] + " чел"}
                  </p>
                </div>

                <div
                  className={s.SetBoxWrapper}
                  style={{
                    backgroundImage: `url(${el.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <ul className={s.SetBox}>
                    {el.products.map(elem => (
                      <li key={elem.id} className={s.SetBoxItem}>
                        <p className={s.SetBoxDish}>
                          <span>{elem.name}</span>
                          <span className={s.Underline} />
                          <span className={s.Weight}>
                            {(elem.is_kega
                              ? (
                                  Math.round(
                                    Number(elem.weight_for_catering) *
                                      Number(elem.weight) *
                                      1000
                                  ) / 1000
                                ).toFixed(2)
                              : (
                                  Math.round(
                                    (elem.weight_for_catering / 1000) *
                                      Number(
                                        this.props.allSteps.find(
                                          element => element.name === "guest"
                                        ).inputs[renamed(el.name)]
                                      ) *
                                      1000
                                  ) / 1000
                                ).toFixed(2)) +
                              (elem.is_drink || elem.is_kega ? " л" : " кг")}
                          </span>
                        </p>
                      </li>
                    ))}
                    <li key="price" className={s.Price}>
                      <p>
                        {"СУММА: "}
                        <strong>
                          {el.products
                            .reduce(
                              (acc, elem) =>
                                acc +
                                (elem.is_kega
                                  ? Math.round(
                                      Number(elem.weight_for_catering) *
                                        Number(elem.price) *
                                        1000
                                    ) / 1000
                                  : Math.round(
                                      (elem.weight_for_catering /
                                        1000 /
                                        (elem.weight / 1000)) *
                                        elem.price *
                                        Number(
                                          this.props.allSteps.find(
                                            element => element.name === "guest"
                                          ).inputs[renamed(el.name)] * 1000
                                        )
                                    ) / 1000),

                              0
                            )
                            .toFixed(2)}
                        </strong>
                        {" грн"}
                      </p>
                    </li>
                  </ul>
                </div>

                <div className={s.BotContext}>
                  <button
                    name={el.name}
                    id={el.id}
                    onClick={detailsOpen}
                    type="button"
                    className={s.MenuButton}
                  >
                    Подробнее
                  </button>
                  <button
                    name={el.name}
                    type="button"
                    data-name={renamed(el.name)}
                    onClick={this.props.buyToggle}
                    className={this.props.step[renamed(el.name)]?[s.MenuButton, s.Green].join(' '): s.MenuButton}
                  >
                    {this.props.step[renamed(el.name)] ? "Отменить" : "Выбрать"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={ahead}
            disabled={
              this.props.step.meat === false &&
              this.props.step.vegan === false &&
              this.props.step.child === false
                ? true
                : false
            }
            type="submit"
            className={s.Button}
          >
            Далее
          </button>
        </form>
      </Fragment>
    );
  }
}

export default MenuInfo;
