import React from "react";
import logo from "../../assets/img/jumbo_Logo.svg";
import { NavLink } from "react-router-dom";
import facebook from "../../assets/img/facebook.svg";
import youtube from "../../assets/img/youtube.svg";
import instagram from "../../assets/img/instagram.svg";
import copy from "../../assets/img/copy.svg";
import designed from "../../assets/img/designed.svg";

import s from "./MainFooter.module.css";

const MainFooter = props => {
  return (
    <div
      className={
        props.path === "/" || props.path === "/Catering" || props.path === "/OfficeCatering"
          ? s.Wrapper
          : [s.Wrapper, s.NoBackGround].join(" ")
      }
    >
      <div className={s.MenuItems}>
        <NavLink to="/">
          <img className={s.Logo} src={logo} alt="logo" />
        </NavLink>
        <div className={s.AllLinks}>
          <div className={s.Links}>
            <NavLink className={s.Link} activeClassName={s.Active} to="/Menu">
              Меню
            </NavLink>
            {/* <NavLink
              className={s.Link}
              activeClassName={s.Active}
              to="/Catering"
            >
              Кейтеринг
            </NavLink>
            <NavLink
              className={s.Link}
              activeClassName={s.Active}
              to="/OfficeCatering"
            >
              Офис-кейтеринг
            </NavLink> */}
            <NavLink
              className={s.Link}
              activeClassName={s.Active}
              to="/BoxDelivery"
            >
              BOX-доставка
            </NavLink>
          </div>
          <div className={s.Links}>
            <NavLink
              className={s.Link}
              activeClassName={s.Active}
              to="/Reviews"
            >
              Отзывы
            </NavLink>
            {/* <NavLink
              className={s.Link}
              activeClassName={s.Active}
              to="/AboutUs"
            >
              О нас
            </NavLink>
            <NavLink
              className={s.Link}
              activeClassName={s.Active}
              to="/DeliveryAndPayment"
            >
              Доставка и оплата
            </NavLink> */}
            <NavLink
              className={s.Link}
              activeClassName={s.Active}
              to="/Contacts"
            >
              Контакты
            </NavLink>
          </div>
        </div>
        <div className={s.Contacts}>
          <p className={s.ContactOne}>044 333-90-12</p>
          <p className={s.ContactTwo}>Голосеевский проспект, 87б</p>
          <p className={s.ContactThree}>hello@jumbogrill.ua</p>

          <div className={s.Social900}>
            <div className={s.SocialLinks}>
              <p>Мы в соц. сетях:</p>
              <div className={s.SocialLinksItems}>
                <a href="https://www.facebook.com/jumbogrillua/">
                  <img className={s.LinkImg} src={facebook} alt="facebook" />
                </a>
                <a href="https://www.youtube.com/watch?v=2n66sLkfNuI">
                  <img className={s.LinkImg} src={youtube} alt="youtube" />
                </a>
                <a href="https://www.instagram.com/jumbogrill/">
                  <img className={s.LinkImg} src={instagram} alt="instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={s.SocialFull}>
          <div className={s.SocialLinks}>
            <p>Мы в соц. сетях:</p>
            <div className={s.SocialLinksItems}>
              <a href="https://www.facebook.com/jumbogrillua/">
                <img src={facebook} alt="facebook" />
              </a>
              <a href="https://www.youtube.com/watch?v=2n66sLkfNuI">
                <img src={youtube} alt="youtube" />
              </a>
              <a href="https://www.instagram.com/jumbogrill/">
                <img src={instagram} alt="instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={s.CopyWriting}>
        <img className={s.Years} src={copy} alt="copywriting" />
        <img src={designed} alt="designed_by" />
      </div>
    </div>
  );
};

export default MainFooter;
