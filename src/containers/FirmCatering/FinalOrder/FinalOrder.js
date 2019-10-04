import React, { Component } from "react";

import s from "./FinalOrder.module.css";

import {finalOrderPost} from '../../../utils/api';

import {renamed} from '../../../utils/helper';

import downArrow from '../../../assets/img/downArrow.png'

import menu from "../../../assets/img/cateringPuzzles/MenuFinal.jpg";

import buffet from "../../../assets/img/cateringPuzzles/BuffetFinal.jpg";
import buffetD from "../../../assets/img/cateringPuzzles/BuffetFinalDisabled.jpg";

import grill from "../../../assets/img/cateringPuzzles/GrillFinal.jpg";
import grillD from "../../../assets/img/cateringPuzzles/GrillFinalDisabled.jpg";

import rest from "../../../assets/img/cateringPuzzles/RestFinal.jpg";
import restD from "../../../assets/img/cateringPuzzles/RestFinalDisabled.jpg";

import car from "../../../assets/img/cateringPuzzles/CarFinal.jpg";
import carD from "../../../assets/img/cateringPuzzles/CarFinalDisabled.jpg";


export default class FinalOrder extends Component {
  state = {
    details: false,
    edit: false
  };
  componentDidMount = async () => {
    if (!this.props.final) this.props.finalOrderToggle();
    window.addEventListener('resize', this.getWindowWidth);
    await this.setState({window: window.innerWidth})
    if(this.state.window <= 1100) this.setState({edit: true});
  } 

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.getWindowWidth);
  } 

  getWindowWidth = () => {
    this.setState({window: window.innerWidth})
  }
  detailsToggle = () => this.setState({details: !this.state.details});
  editToggle = () => this.setState({edit: !this.state.edit})

  render() {
    const change = event => {
      this.props.stepIsOnToggle(event);
      this.props.chooseStep(event);
    };

    const main = this.props.allSteps.find(el=>el.name==='main');
    const guest = this.props.allSteps.find(el=>el.name==='guest');
    const buf = this.props.allSteps.find(el=>el.name==='buffet');
    const gril = this.props.allSteps.find(el=>el.name==='grill');
    const res = this.props.allSteps.find(el=>el.name==='rest');
    const serving = this.props.allSteps.find(el=>el.name==='serving');
    const auto = this.props.allSteps.find(el=>el.name==='car');
    const menus = this.props.allSteps.find(el=>el.name==='menu');
    const wish = this.props.allSteps.find(el=>el.name==='wishes').inputs.userWish;
    const subs = this.props.allSteps.filter(el=>el.name==='buffet'||el.name==='grill'||el.name==='rest').reduce((acc,obj)=>[...acc, +obj.serviceId],[]).filter(el=>el!==0);


    const inputs = Object.keys(this.props.allSteps.find(el=>el.name === 'rest').inputs);
    const trueInputs = inputs.filter(el=>this.props.allSteps.find(el=>el.name === 'rest').inputs[el]===true);
    const serviceItems = this.props.allSteps.find(el=>el.name === 'rest').serviceItems;
    const resultsItems = serviceItems.filter(el=>trueInputs.includes(el.name));
    
    const customRestPrice = trueInputs.length > 0 ? resultsItems.reduce((acc, val) => acc + +(+val.price * +val.quantity).toFixed(2),0) : 0;


    const sets = ['meat', 'child', 'vegan']
      .filter(el=>menus[el]===true)
      .map(el=>menus.sets.find(elem=>elem.name===renamed(el)))
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
      additional_services: resultsItems.map(el=>({service: el.id, count: el.quantity})),
      phone_number: main.inputs.phone,
      type: Object.keys(main.checkboxes).filter(el=>main.checkboxes[el]===true)[0],
      date: new Date(main.inputs.date).toISOString(),
      place: main.inputs.place,
      jumbo_car: Object.keys(auto.checkboxes).filter(el=>auto.checkboxes[el]===true).length===1?auto.services.find(el=>el.name===Object.keys(auto.checkboxes).filter(el=>auto.checkboxes[el]===true)[0]).id:0,
      meat_eaters: +guest.inputs.meat,
      kids: +guest.inputs.child,
      vegans: +guest.inputs.vegan,
      catering_order_set_items: newSets,
      wishes: wish,
      serving_meals: +serving.serviceId,
      sub_services: subs.length === 0 ? 0 : subs
    }

    let objFinal = Object.keys(obj).filter(el=>obj[el]!==0).reduce((acc,el)=>({...acc, [el]: obj[el]}), {});

    console.log(objFinal);

    const post = () => finalOrderPost(objFinal);

    const buffetPrice = buf.serviceId!==0?buf.services.find(el=>el.id===+buf.serviceId).price:0;
    const grillPrice = gril.serviceId!==0?gril.services.find(el=>el.id===+gril.serviceId).price:0;
    const restPrice = res.serviceId!==0?res.services.find(el=>el.id===+res.serviceId).price:0;
    
    

    const carPrice = obj.jumbo_car!==0?auto.services.find(el=>el.id===obj.jumbo_car).price:0
    const menuPrice = obj.catering_order_set_items.reduce((acc,obj)=>acc+obj.total_sum,0);
    const servingPrice = serving.forms.find(el=>el.id===+serving.serviceId).price;

    const finalPrice = +(menuPrice + servingPrice + buffetPrice + grillPrice + restPrice + carPrice).toFixed(2);

    const people = ['meat', 'vegan', 'child'].filter(el=>menus[el]===true).map(el=>+guest.inputs[el]).reduce((acc,el)=>acc+el,0);

    const singlePrice = +(menuPrice / people).toFixed(2);

    console.log(singlePrice)

    return (
      <div className={s.FinalWrapper}>
        <h4 className={s.OrderTitle}>Ваш заказ</h4>
  
        <div className={s.TopBtns}>
          <button onClick={this.detailsToggle} className={this.state.details? [s.ReccomendBtn, s.AnimationNone].join(' ') : s.ReccomendBtn}>
            <span>рекомендации</span>
            <img style={this.state.details?{transform: 'rotate(180deg)'}:{}} src={downArrow} alt="arrow"/>
          </button>
          <button onClick={this.editToggle} className={this.state.edit?[s.EditBtn, s.Green].join(' ') : s.EditBtn}>редактировать</button>
        </div>

      <p className={this.state.details? s.Details : [s.Details, s.DisplayNone].join(' ')}>
        <span className={s.DetailsFirst}>Мы не просто запекаем гриль - мы создаем атмосферу </span>
        <span className={s.DetailsSecond}>В обычных мангалах системы решеток располагаются перпендикулярно. Мы же расположили их параллельно - это стало переворотом всего процесса приготовления. В 2013 году мы установили два мировых рекорда: собрали самый длинный мангал и приготовили самый длинный шашлык. В 2017 году мы установили новый рекорд. Приготовили 1013 хачапури за 13 минут.</span>
      </p>

        {this.state.window > 1100 && <button className={s.PdfBtn}>Скачать файл PDF</button>}
      
        <div className={s.PuzzleHolder}>
          <svg>
            <g>
              <clipPath id="buffet">
                <path d="M14 133.5C14 181.835 10.5 257.25 10.5 257.25L101.955 258.361C144.236 260.424 164.74 257.568 174.118 248.681C180.953 242.015 180.476 234.398 172.052 220.432C161.72 202.976 162.038 190.439 173.006 178.536C188.583 161.238 222.28 166.317 231.499 187.265C236.109 197.739 234.837 206.626 226.731 220.432C208.293 251.378 227.367 261.694 296.669 258.361L321.624 257.25L320.67 223.448C319.558 187.582 320.829 175.045 326.71 163.619C332.591 152.034 340.539 151.558 358.977 161.556C369.15 166.951 373.918 168.697 379.323 168.697C389.654 168.697 399.35 162.984 405.232 153.621C409.523 146.797 410 144.575 410 133.784C410 122.992 409.523 120.771 405.232 113.788C394.741 96.966 378.051 94.4269 357.547 106.488C341.334 116.168 332.274 115.216 326.074 102.838C320.988 92.5225 319.716 79.0332 320.67 43.9612L321.624 10H199.232H10.5C10.5 10 14 85.1646 14 133.5Z" />
              </clipPath>

              <clipPath id="car">
                <path d="M121.386 11.473C109.336 12.2669 99.1883 13.0607 98.8712 13.3783C98.5541 13.537 99.1883 25.445 100.14 39.8934C102.994 82.2857 98.5541 107.848 86.9795 113.723C80.3201 117.216 74.7706 115.946 60.9762 107.848C47.816 99.9095 38.144 98.9569 27.6792 104.355C20.2271 108.166 11.9821 120.709 10.3966 130.235C8.0182 145.636 16.5803 163.101 29.5819 168.817C39.4124 173.104 48.1331 171.992 60.0248 164.848C74.2949 156.433 79.5273 155.004 86.1867 158.179C91.8947 160.878 94.9073 165.642 98.3956 178.026C100.774 185.964 101.25 231.85 99.1883 248.997L98.0784 259H221.119L411.586 259V137C411.586 20.937 414.122 12.9019 411.586 12.9019C410 12.9019 327.986 12.1081 315.143 11.3142C288.981 9.72651 265.514 11.3142 255.367 15.4423C251.72 16.8713 246.963 20.2055 244.743 22.9046C239.353 29.4143 240.145 36.4003 247.915 48.9434C254.891 60.3751 257.111 67.5198 255.842 74.8234C253.781 86.2551 248.073 93.0823 236.181 98.4806C219.374 106.102 197.018 99.1156 189.09 83.5559C187.663 81.0155 186.553 75.2997 186.553 70.8541C186.395 64.3444 187.663 60.5338 193.847 49.261C197.969 41.7986 201.299 33.7012 201.299 31.4784C201.299 25.9213 194.64 18.6178 186.87 15.4423C181.004 13.0607 154.683 9.56772 146.597 10.044C144.853 10.044 133.437 10.8379 121.386 11.473Z" />
              </clipPath>

              <clipPath id="rest">
                <path
                  d="M189.568 11.2542C178.629 14.5901 168.957 22.6915 165.945 30.9518C162.457 40.0062 163.884 47.79 171.335 61.61C183.226 83.3726 180.531 91.9505 159.761 98.3045C149.932 101.323 110.77 102.117 88.5739 99.7342L10.5 100.687C10.5 100.687 14.0491 176.434 14 225C13.9526 271.883 10.5 345 10.5 345L198.923 345H320.845L321.638 341.505C322.114 339.44 323.065 326.097 323.699 311.641C325.284 268.752 320.687 248.419 308.003 243.494C302.137 241.27 301.82 241.429 285.806 249.531C267.89 258.585 262.5 259.379 252.036 254.614C236.657 247.624 229.046 224.909 236.34 207.435C241.572 194.727 251.402 187.738 264.085 187.738C270.903 187.738 274.708 189.008 285.331 194.886C301.027 203.464 306.734 203.94 313.235 197.586C319.577 191.232 322.748 178.842 323.858 157.556C324.492 140.718 322.589 101.323 321.004 99.7342C320.528 99.2576 308.637 99.7342 294.526 100.687C255.682 103.388 230.473 99.4165 222.863 89.5677C217.79 83.2137 218.741 75.9066 226.351 63.1985C233.644 50.8081 235.547 40.9593 232.376 31.4283C227.461 16.4963 205.899 6.32985 189.568 11.2542Z"
                  fill="black"
                />
              </clipPath>
              <clipPath id="grill">
                <path d="M12 14.5C9.78013 23.3897 10.3255 71.0057 12.2283 83.0703C14.4482 97.6749 16.1923 102.278 21.5835 108.152C27.6089 114.819 35.6955 114.184 49.4905 106.088C63.444 97.6749 73.4334 96.4049 83.2643 101.326C94.8394 107.2 101.182 118.471 101.34 133.234C101.499 144.187 97.2178 154.506 89.4483 161.332C78.8246 170.698 65.981 170.38 49.1734 160.379C24.4376 145.616 13.1797 156.569 11.1183 197.526C10.4841 212.924 12.5454 254.991 13.9725 256.103C14.2896 256.261 26.6575 255.785 41.4038 254.833C82.7886 252.452 105.939 256.42 113.074 267.374C116.88 273.088 115.135 281.978 108.159 293.567C98.8034 308.965 98.6449 322.299 107.683 332.618C115.294 341.19 123.856 345 135.907 345C147.958 345 156.52 341.19 164.131 332.618C173.328 322.141 173.011 309.282 163.021 292.455C151.922 273.882 154.776 264.357 173.169 257.69C179.67 255.309 186.33 254.833 211.224 254.833C227.873 254.833 245.157 255.309 249.755 255.944L327.5 256.5L329.5 134.028V10L136.066 11L12.5003 10L12 14.5Z" />
              </clipPath>
              <clipPath id="menu">
                <path
                  d="M0,0h629v185H0V0z M0,0h629v185H0V0z"
                  transform="translate(10 10)"
                />
              </clipPath>
            </g>
          </svg>

{/*==========================================================================================================================*/}

        <p className={s.MenuPrice}>
          <span>{`Кол-во гостей: ${people}`}</span>
          <span>{`${singlePrice.toFixed(2)} грн / чел`}</span>
          <span>{'ВСЕГО: '}<strong>{(Math.round(menuPrice)).toFixed(0)}</strong>{' грн'}</span>
        </p>
        
        <p className={s.BuffetPrice}>
          <span>{'ВСЕГО: '}</span>
          <span>{buffetPrice + ' грн'}</span>
        </p>

        <p className={s.GrillPrice}>
          <span>{'ВСЕГО: '}</span>
          <span>{grillPrice.toFixed(0) + ' грн'}</span>
        </p>

        <p className={s.GrillPrice}>
          <span>{'ВСЕГО: '}</span>
          <span>{grillPrice.toFixed(0) + ' грн'}</span>
        </p>

        <p className={s.RestPrice}>
          <span>{'ВСЕГО: '}</span>
          <span>{(+restPrice.toFixed(0) + +customRestPrice.toFixed(0)) + ' грн'}</span>
        </p>

        <p className={s.CarPrice}>
          <span>{'ВСЕГО: '}</span>
          <span>{carPrice.toFixed(0) + ' грн'}</span>
        </p>
{/*==========================================================================================================================*/}

      <p className={s.MenuTitle}>Меню</p>
      <p className={s.BuffetTitle}>Фуршетная зона</p>
      <p className={s.GrillTitle}>Мангал  Шоу</p>
      <p className={s.RestTitle}>Зона отдыха</p>
      <p className={s.CarTitle}>Jumbo Car</p>

{/*==========================================================================================================================*/}

          <img
            onClick={this.state.edit?change:null}
            data-name="menu"
            data-stepname="final"
            className={s.Menu}
            src={menu}
            alt="puzzle_menu"
          />
          <img
            onClick={this.state.edit?change:null}
            data-name="buffet"
            data-stepname="final"
            className={s.Buffet}
            src={serving.buffet ? buffet : buffetD}
            alt="puzzle_buffet"
          />
          <img
            onClick={this.state.edit?change:null}
            data-name="grill"
            data-stepname="final"
            className={s.Grill}
            src={gril.grill ? grill : grillD}
            alt="puzzle_grill"
          />
          <img
            onClick={this.state.edit?change:null}
            data-name="rest"
            data-stepname="final"
            className={s.Rest}
            src={res.rest || trueInputs.length > 0 ? rest : restD}
            alt="puzzle_rest"
          />
          <img
            onClick={this.state.edit?change:null}
            data-name="car"
            data-stepname="final"
            className={s.Car}
            src={auto.car ? car : carD}
            alt="puzzle_car"
          />
{/*==========================================================================================================================*/}


        </div>

        <div className={s.BotContext}>

        <p className={s.FinalPrice}>Стоимость кейтеринга: <strong>{finalPrice + customRestPrice}</strong> грн</p>
        {this.state.window <= 1100 ? 
        <div className={s.Buttons}>

          <button className={s.OrderBtn} onClick={post}>Оформить заявку</button>
          <button className={s.PdfBtn}>PDF</button>
          
        </div>
         : <button className={s.OrderBtn} onClick={post}>Оформить заявку</button>
        }
      </div>

      </div>
    );
  }
}
