import pic1 from "../assets/img/meatIcon.svg";
import pic2 from "../assets/img/veganIcon.svg";
import pic3 from "../assets/img/childIcon.svg";

import slideOne from "../assets/img/main_slider_1.jpg";
import slideTwo from "../assets/img/main_slider_2.jpg";
import slideThree from "../assets/img/main_slider_3.jpg";

import img1 from "../assets/img/pic1.jpg";
import img2 from "../assets/img/pic2.jpg";
import img3 from "../assets/img/pic3.jpg";

import officeSlideOne from "../assets/img/officeSlideOne.png";

export const renamed = name => {
  if (name === "Мясоеды") {
    return "meat";
  } else if (name === "Дети") {
    return "child";
  } else if (name === "Вегeтарианцы") {
    return "vegan";
  } else if (name === "Банкетная") {
    return "banquet";
  } else if (name === "Фуршетная" || name === "Фуршетная линия") {
    return "buffet";
  } else if (name === "Фирменная") {
    return "corporate";
  } else if (name === "Мангал Шоу") {
    return "grill";
  } else if (name === "Зона Отдыха") {
    return "rest";
  } else if (name === "child") {
    return "Дети";
  } else if (name === "meat") {
    return "Мясоеды";
  } else if (name === "vegan") {
    return "Вегeтарианцы";
  }
};

export const getIcon = name => {
  if (name === "Мясоеды") {
    return pic1;
  } else if (name === "Дети") {
    return pic3;
  } else if (name === "Вегeтарианцы") {
    return pic2;
  }
};

export const puzzleToggle = (array, name) => {
  return array.find(el => el.name === name).puzzle;
};

export const stepIndex = arr => arr.indexOf(arr.find(el => el.isOn));

export const checkOneBox = (obj, name) => {
  let newObj = obj;
  for (const key in newObj) {
    if (key === name) {
      newObj[key] = true;
    } else newObj[key] = false;
  }
  return newObj;
};


export const makeMessage = message => {
  if(message==='catering'){
    return 'Спасибо за обращение! Мы с Вами свяжемся в ближайшее время.';
  } else if (message==='box'){
    return 'Спасибо! Ваш заказ принят в обработку. Мы с Вами свяжемся в ближайшее время.'
  } else if (message==='bucket'){
    return 'Ваша корзина пуста. Добавьте, пожалуйста, товар в корзину.';
  } else if (message==='personal'){
    return 'Спасибо! Ваша заявка принята. Мы с Вами свяжемся в ближайшее время.'
  } else if (message==='review'){
    return 'Благодарим за Ваш отзыв! Он очень важен для нас!'
  } else if (message==='comment'){
    return 'Вы добавили новый комментарий.'
  } else if (message==='contact'){
    return 'Сообщение отправлено. Мы с Вами свяжемся в ближайшее время.'
  } else if (message==='guests'){
    return 'Общее количество гостей должно быть равным сумме других полей'
  }
}

export const windowBasedStyle = (windowWidth, length) => {
  if (windowWidth > 900 && windowWidth < 1200 && length === 3) {
    return {height: '535px'};
  } else if (windowWidth < 900 && length === 3) {
    return {height: '493px'};
  } else if (windowWidth < 600 && length === 2) {
    return {height: '493px'};
  }
}

export const mainSlider = [slideOne, slideTwo, slideThree];

export const officeSlider = [officeSlideOne, officeSlideOne, officeSlideOne];

export const gallery = [img1, img2, img3, img1, img2, img3];


//===============================================================================


export const postReq = (props, func) => {
 
const main = props.allSteps.find(el=>el.name==='main');
  const guest = props.allSteps.find(el=>el.name==='guest');
  const menu = props.allSteps.find(el=>el.name==='menu');
  const service = props.allSteps.find(el=>el.name==='service');

  const inputs = Object.keys(service.inputs);
    const trueInputs = inputs.filter(el=>service.inputs[el]===true);
    const serviceItems = service.serviceItems;
    const resultsItems = serviceItems.filter(el=>trueInputs.includes(el.name));

  const sets = ['meat', 'child', 'vegan']
      .filter(el=>menu[el]===true)
      .map(el=>menu.sets.find(elem=>elem.name===renamed(el)))
      .map(el=>
          ({
            type: (el.id).toString(), 
            products: el.products
                    .map(elem=>({
                          product: elem.id,
                          price: elem.is_kega ? ((Math.round(Number(elem.price) * Number(elem.weight_for_catering))*100)/100) : (Math.round(Number(elem.price) * Number(elem.weight_for_catering) / Number(elem.weight) * Number(guest.inputs[renamed(el.name)]) * 100) / 100),
                          weight: elem.is_kega ? (Number(elem.weight) * Number(elem.weight_for_catering)) : (Number(elem.weight_for_catering) * Number(guest.inputs[renamed(el.name)]) / 1000),
                          is_drink: elem.is_kega || elem.is_drink ? true : false 
                      }))
              }))
      .map(el=>{
        console.log(el);
        return ({...el,
        total_sum: +(el.products.reduce((acc,obj)=>acc+obj.price,0)).toFixed(2),
        total_weight_kg: +(el.products.reduce((acc,obj)=>acc+(obj.is_drink ? 0 : obj.weight),0)).toFixed(2),
        total_weight_lt: +(el.products.reduce((acc,obj)=>acc+(obj.is_drink ? obj.weight : 0),0)).toFixed(2)
      })})

      const newSets = sets.map(el=>({...el, products: el.products.map(elem=>({product: elem.product, price: elem.price, weight: elem.weight}))}))

    const obj = {
      is_office_catering: true,
      additional_services: resultsItems.map(el=>({service: el.id, count: el.quantity})),
      phone_number: main.inputs.phone,
      type: Object.keys(main.checkboxes).filter(el=>main.checkboxes[el]===true)[0],
      date: new Date(main.inputs.date).toISOString(),
      place: main.inputs.place,
      meat_eaters: +guest.inputs.meat,
      kids: +guest.inputs.child,
      vegans: +guest.inputs.vegan,
      catering_order_set_items: newSets,
    }

    let objFinal = Object.keys(obj).filter(el=>obj[el]!==0).reduce((acc,el)=>({...acc, [el]: obj[el]}), {});

    console.log(objFinal)

    func(objFinal);
  }