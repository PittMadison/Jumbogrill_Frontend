import React from "react";

export const pathName = path => {
  if (path === "/BoxDelivery") {
    return "BOX-доставка";
  } else if (path === "/Catering") {
    return "Кейтеринг";
  } else if (path === "/Menu") {
    return "Меню";
  } else if (path === "/Restaurant") {
    return "Ресторан";
  } else if (path === "/Reviews") {
    return "Отзывы";
  } else if (path === "/AboutUs") {
    return "О нас";
  } else if (path === "/Contacts") {
    return "Контакты";
  } else if (path === "/OfficeCatering") {
    return "Офис-кейтеринг";
  } else if (path === "/Account") {
    return "Персональный кабинет";
  } else if (path === "/Bucket") {
    return "Корзина";
  } else if (path === "/") {
    return "Главная";
  } else return path.substr(1);
};

export const pathDisplay = (path, func, array) => {
  if (array.find(el => el.name === path.substr(1))) {
    return <p>Меню/{path.substr(1)}</p>;
  } else if (path === "/") {
    return <p>{func(path)}</p>;
  } else {
    return <p>Главная/{func(path)}</p>;
  }
};

export const wrapperClass = path => {
  if (
    path === "/" ||
    path === "/Catering" ||
    path === "/OfficeCatering"
  ) {
    return "";
  } else if (
    path === "/BoxDelivery" ||
    path === "/Menu" ||
    path === "/Restaurant" ||
    path === "/Reviews" ||
    path === "/AboutUs" ||
    path === "/Contacts" ||
    path === "/Account" ||
    path === "/Bucket"
  ) {
    return "MainWrapper";
  }
};
