import React, { Fragment, Component } from "react";
import { NavLink } from "react-router-dom";
import { pathName, pathDisplay, wrapperClass } from "../../utils/path";
import {makeMessage} from '../../utils/helper';
import logo from "../../assets/img/jumbo_Logo.svg";
import call from "../../assets/img/call.svg";
import bucket from "../../assets/img/bucket.svg";
import account from "../../assets/img/account.svg";

import s from "./Header.module.css";
import CustomPopUp from "../CustomPopUp/CustomPopUp";

class Header extends Component {
  state = {
    burger: null,
    message: '',
    modal: false
  };

  componentDidMount = () => {
    let body = document.querySelector('body');
    body.className = wrapperClass(this.props.path)
  }

  burgerToggle = () => {
    this.state.burger === null
      ? this.setState({
          burger: true
        })
      : this.setState({
          burger: !this.state.burger
        });
  };

  takeMessage = event => this.setState({message: event.currentTarget.dataset.message})

    modalToggle = () => this.setState({modal: !this.state.modal})

  render() {
    
    const modal = event => {
    if(this.props.boxDeliveryBucket.length === 0) {
      event.preventDefault();
      this.takeMessage(event);
      this.modalToggle();
    }
  }
    return (
      <Fragment>
      {this.state.modal && <CustomPopUp modalToggle={this.modalToggle} message={makeMessage(this.state.message)}></CustomPopUp>}
        <div
          className={
            this.state.burger
              ? [s.BurgerPosition, s.BurgerActive].join(" ")
              : s.BurgerPosition
          }
        >
          <div onClick={this.burgerToggle} id='burger' className={s.Burger}>
            <div
              className={
                this.state.burger
                  ? [s.TopStick, s.TopStickActive].join(" ")
                  : s.TopStick
              }
            />
            <div
              className={
                this.state.burger
                  ? [s.MidStick, s.displayNone].join(" ")
                  : s.MidStick
              }
            />
            <div
              className={
                this.state.burger
                  ? [s.BottomStick, s.BottomStickActive].join(" ")
                  : s.BottomStick
              }
            />
          </div>
        </div>
        <div className={s.Slider}>
          <nav
            className={
              this.state.burger === null
                ? s.Navigation
                : this.state.burger
                ? [s.Navigation, s.SidebarOn].join(" ")
                : [s.Navigation, s.SidebarOff].join(" ")
            }
          >
            <NavLink className={s.Link} activeClassName={s.Active} to="/Menu">
              МЕНЮ
            </NavLink>
            <NavLink
              className={s.Link}
              activeClassName={s.Active}
              to="/Catering"
            >
              КЕЙТЕРИНГ
            </NavLink>
            <NavLink
              className={s.Link}
              activeClassName={s.Active}
              to="/OfficeCatering"
            >
              ОФИС-КЕЙТЕРИНГ
            </NavLink>
            <NavLink
              className={s.Link}
              activeClassName={s.Active}
              to="/BoxDelivery"
            >
              BOX-ДОСТАВКА
            </NavLink>
            <NavLink
              className={s.Link}
              activeClassName={s.Active}
              to="/Restaurant"
            >
              РЕСТОРАН
            </NavLink>
            <NavLink
              className={s.Link}
              activeClassName={s.Active}
              to="/Reviews"
            >
              ОТЗЫВЫ
            </NavLink>
            <NavLink
              className={s.Link}
              activeClassName={s.Active}
              to="/AboutUs"
            >
              О НАС
            </NavLink>
            <NavLink
              className={s.Link}
              activeClassName={s.Active}
              to="/Contacts"
            >
              КОНТАКТЫ
            </NavLink>
          </nav>
        </div>

        <div className={s.Header} id='header'>
          <div className={s.Logo}>
            <NavLink to="/" name="Главная">
              <img src={logo} alt="Jumbo_grill_logo" />
            </NavLink>
            {pathDisplay(this.props.path, pathName, this.props.categories)}
          </div>

          <div className={s.MainNavigation}>
            <nav className={s.Navigation}>
              <NavLink className={s.Link} activeClassName={s.Active} to="/Menu">
                МЕНЮ
              </NavLink>
              <NavLink
                className={s.Link}
                activeClassName={s.Active}
                to="/Catering"
              >
                КЕЙТЕРИНГ
              </NavLink>
              <NavLink
                className={s.Link}
                activeClassName={s.Active}
                to="/OfficeCatering"
              >
                ОФИС-КЕЙТЕРИНГ
              </NavLink>
              <NavLink
                className={s.Link}
                activeClassName={s.Active}
                to="/BoxDelivery"
              >
                BOX-ДОСТАВКА
              </NavLink>
              <NavLink
                className={s.Link}
                activeClassName={s.Active}
                to="/Restaurant"
              >
                РЕСТОРАН
              </NavLink>
              <NavLink
                className={s.Link}
                activeClassName={s.Active}
                to="/Reviews"
              >
                ОТЗЫВЫ
              </NavLink>
              {/* <NavLink
                className={s.Link}
                activeClassName={s.Active}
                to="/AboutUs"
              >
                О НАС
              </NavLink> */}
              <NavLink
                className={s.Link}
                activeClassName={s.Active}
                to="/Contacts"
              >
                КОНТАКТЫ
              </NavLink>
            </nav>
          </div>

          <div className={s.SideIcons}>
            <a href="tel:+380443339012" className={s.Call}>
              <img src={call} alt="call" />
              <p>044 333-90-12</p>
            </a>
            <NavLink className={s.User} to="/">
              <img src={account} alt="account" />
            </NavLink>
            <NavLink data-message='bucket' onClick={modal} className={s.Bucket} to="/Bucket">
              <img src={bucket} alt="bucket" />
              {this.props.boxDeliveryBucket.length > 0 ? (
                <div className={s.BucketItemsCount}>
                  <p>{this.props.boxDeliveryBucket.length}</p>
                </div>
              ) : null}
            </NavLink>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Header;
