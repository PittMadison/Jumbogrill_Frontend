import React, { Fragment, Component } from "react";

import s from "./CarInfo.module.css";

import cateringLogo from "../../../assets/img/cateringLogo.svg";
import rightArrow from "../../../assets/img/rightArrow.svg";
import union from "../../../assets/img/Union.svg";
import fire from "../../../assets/img/fireCheck.svg";

class CarInfo extends Component {
  state = {
    details: false,
  };

  detailsToggle = () => this.setState({ details: !this.state.details });

  render() {
    const basic = this.props.step.checkboxes.basic
      ? { backgroundColor: "rgba(147, 147, 147, 0.08)" }
      : {};
    const disco = this.props.step.checkboxes.disco
      ? { backgroundColor: "rgba(147, 147, 147, 0.08)" }
      : {};
    const karaoke = this.props.step.checkboxes.karaoke
      ? { backgroundColor: "rgba(147, 147, 147, 0.08)" }
      : {};
    const karaokePlus = this.props.step.checkboxes.karaokePlus
      ? { backgroundColor: "rgba(147, 147, 147, 0.08)" }
      : {};
    const skip = event => {
      if(event.target.innerText === 'ПРОПУСТИТЬ') this.props.resetCheckboxes(event);
      this.props.finalOrder ? this.props.returnToFinal() : this.props.nextStep(event);
    };
    const buy = event => {
      if(event.target.innerText === 'ОТМЕНИТЬ') this.props.resetCheckboxes(event);
      this.props.buyToggle(event)
    }
    return (
      <Fragment>
        <img className={s.Logo} src={cateringLogo} alt="logo" />
        <form onSubmit={skip} className={s.Form}>
          <h5 className={s.Step}>Седьмой шаг</h5>
          
      <div className={s.TableScroll}>


          <div className={s.ContentWrapper}>
            <table className={s.Table}>
              <thead className={s.TopRow}>
                <tr className={s.Headings}>
                  <th className={s.TopCorner}>
                    <p className={s.TopCornerText}>
                      <span>Выберите подходящий</span>
                      <span>
                        пакет <span className={s.Red}>Jumbo Car</span>
                      </span>
                    </p>
                  </th>
                  <th style={basic} className={s.ColumnHeader}>
                    <label className={s.Radio} htmlFor="basic">
                      <input
                        id="basic"
                        name="basic"
                        type="checkbox"
                        onChange={this.props.check}
                        checked={this.props.step.checkboxes.basic}
                      />
                      <span className={s.FireIcon} />
                    </label>
                    <p className={s.RadioDescription}>
                      <span>
                        <strong>BASIC</strong>
                      </span>
                      <span>{`от ${this.props.step.services.find(el=>el.name==='basic').price} грн`}</span>
                    </p>
                  </th>

                  <th style={disco} className={s.ColumnHeader}>
                    <label className={s.Radio} htmlFor="disco">
                      <input
                        id="disco"
                        name="disco"
                        type="checkbox"
                        onChange={this.props.check}
                        checked={this.props.step.checkboxes.disco}
                      />
                      <span className={s.FireIcon} />
                    </label>
                    <p className={s.RadioDescription}>
                      <span>
                        <strong>DISCO</strong>
                      </span>
                      <span>{`от ${this.props.step.services.find(el=>el.name==='disco').price} грн`}</span>
                    </p>
                  </th>
                  <th style={karaoke} className={s.ColumnHeader}>
                    <label className={s.Radio} htmlFor="karaoke">
                      <input
                        id="karaoke"
                        name="karaoke"
                        type="checkbox"
                        onChange={this.props.check}
                        checked={this.props.step.checkboxes.karaoke}
                      />
                      <span className={s.FireIcon} />
                    </label>
                    <p className={s.RadioDescription}>
                      <span>
                        <strong>KARAOKE</strong>
                      </span>
                      <span>{`от ${this.props.step.services.find(el=>el.name==='karaoke').price} грн`}</span>
                    </p>
                  </th>
                  <th style={karaokePlus} className={s.ColumnHeader}>
                    <label className={s.Radio} htmlFor="karaokePlus">
                      <input
                        id="karaokePlus"
                        name="karaokePlus"
                        type="checkbox"
                        onChange={this.props.check}
                        checked={this.props.step.checkboxes.karaokePlus}
                      />
                      <span className={s.FireIcon} />
                    </label>
                    <p className={s.RadioDescription}>
                      <span>
                        <strong>KARAOKE+</strong>
                      </span>
                      <span>{`от ${this.props.step.services.find(el=>el.name==='karaokePlus').price} грн`}</span>
                    </p>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className={s.Rows}>
                  <td className={s.RowTitle}>
                    Логистика 50 км (в обе стороны)
                  </td>
                  <td style={basic}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={disco}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={karaoke}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={karaokePlus}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                </tr>

                <tr className={s.Rows}>
                  <td className={s.RowTitle}>Подключение к аппаратуре</td>
                  <td style={basic}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={disco}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={karaoke}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={karaokePlus}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                </tr>

                <tr className={s.Rows}>
                  <td className={s.RowTitle}>Фоновая музыка</td>
                  <td style={basic}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={disco}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={karaoke}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={karaokePlus}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                </tr>

                <tr className={s.Rows}>
                  <td className={s.RowTitle}>
                    Возможность подключения к плазме ( трансляция презентаций,
                    тренинги, видеоролики и т.д. )
                  </td>
                  <td style={basic}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={disco}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={karaoke}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={karaokePlus}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                </tr>

                <tr className={s.Rows}>
                  <td className={s.RowTitle}>
                    Работа звукорежиссера на протяжении всего времени
                  </td>
                  <td style={basic}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={disco}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={karaoke}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={karaokePlus}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                </tr>

                <tr className={s.Rows}>
                  <td className={s.RowTitle}>Освещение територии</td>
                  <td style={basic}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={disco}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={karaoke}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={karaokePlus}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                </tr>

                <tr className={s.Rows}>
                  <td className={s.RowTitle}>Два микрофона</td>
                  <td style={basic}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={disco}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={karaoke}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={karaokePlus}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                </tr>

                <tr className={s.Rows}>
                  <td className={s.RowTitle}>DJ (4 часа)</td>
                  <td style={basic}>
                    <img className={s.Icon} src={union} alt="marker" />
                  </td>
                  <td style={disco}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={karaoke}>
                    <img className={s.Icon} src={union} alt="marker" />
                  </td>
                  <td style={karaokePlus}>
                    <img className={s.Icon} src={union} alt="marker" />
                  </td>
                </tr>

                <tr className={s.Rows}>
                  <td className={s.RowTitle}>Караоке (4 часа)</td>
                  <td style={basic}>
                    <img className={s.Icon} src={union} alt="marker" />
                  </td>
                  <td style={disco}>
                    <img className={s.Icon} src={union} alt="marker" />
                  </td>
                  <td style={karaoke}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                  <td style={karaokePlus}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                </tr>

                <tr className={s.Rows}>
                  <td className={s.RowTitle}>Вокалист/ведущий (4 часа)</td>
                  <td style={basic}>
                    <img className={s.Icon} src={union} alt="marker" />
                  </td>
                  <td style={disco}>
                    <img className={s.Icon} src={union} alt="marker" />
                  </td>
                  <td style={karaoke}>
                    <img className={s.Icon} src={union} alt="marker" />
                  </td>
                  <td style={karaokePlus}>
                    <img className={s.Icon} src={fire} alt="marker" />
                  </td>
                </tr>
              </tbody>
            </table>

            {this.state.details && (
              <div className={s.Details}>
                <h5 className={s.Additional}>Дополнительная информация:</h5>
                <p className={s.Minimal}>Минимальный заказ</p>
                <ul className={s.List}>
                  <li className={s.Item}>
                    Show-Саг - 8000 грн / 4 часа ( каждый следующий час работы
                    Show-Саг - 1500 грн )
                  </li>
                  <li className={s.Item}>
                    Вокалист / ведущий - 3000 грн / 4 часа ( каждый следующий
                    час работы вокалиста / ведущего - 1000 грн )
                  </li>
                  <li className={s.Item}>
                    Караоке - 4000 грн / 4 часа ( каждый следующий час работы
                    караоке - 1000 грн )
                  </li>
                  <li className={s.Item}>
                    DJ - от 5000 грн / 4 часа ( каждый следующий час работы DJ -
                    1000 грн )
                  </li>
                </ul>
              </div>
            )}
          </div>
          </div>


          <div className={s.Buttons}>
            <button
              onClick={skip}
              className={s.SkipBtn}
              type="submit"
              data-name="car"
            >
                {this.props.step.car ? "ДАЛЬШЕ" : "ПРОПУСТИТЬ"}
            </button>
            <div className={s.SubButtons}>
              <button
                onClick={this.detailsToggle}
                className={s.Button}
                type="button"
              >
                <span>Подробнее</span>
                <img src={rightArrow} alt="arrow" />
              </button>
              <button
              onClick={buy}
              data-name='car'
              className={this.props.step.car?[s.BuyBtn, s.Green].join(' '):s.BuyBtn}
                type="button"
                disabled={Object.values(this.props.step.checkboxes).every(
                  el => el === false
                )}
              >
                {this.props.step.car ? "ОТМЕНИТЬ" : "ВЫБРАТЬ"}              
              </button>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default CarInfo;
