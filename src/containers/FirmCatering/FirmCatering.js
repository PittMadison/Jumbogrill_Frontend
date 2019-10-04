import React, { Component } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import s from "./FirmCatering.module.css";

import meat from "../../assets/img/pieceOfMeat.jpg";
import salt from "../../assets/img/salt.jpg";
import def from "../../assets/img/bg/catering.jpg";
import buffet from "../../assets/img/bg/cateringBG_buffet.jpg";
import car from "../../assets/img/bg/cateringBG_car.jpg";
import grill from "../../assets/img/bg/cateringBG_grill.jpg";
import rest from "../../assets/img/bg/cateringBG_rest.jpg";
import final from "../../assets/img/bg/cateringBG_final.jpg";

import Header from "../../components/Header/Header";
import HeaderCatering from "../../components/HeaderCatering/HeaderCatering";
import Carousel from "../../components/Carousel/CarouselSlider";
import EasySlider from "../EasySlider/EasySlider";
import MainFooter from "../../components/MainFooter/MainFooter";
import MainInfo from "./MainInfo/MainInfo";
import GuestInfo from "./GuestInfo/GuestInfo";
import MenuInfo from "./MenuInfo/MenuInfo";
import GrillInfo from "./GrillInfo/GrillInfo";
import BuffetInfo from "./BuffetInfo/BuffetInfo";
import ServingInfo from "./ServingInfo/ServingInfo";
import CarInfo from "./CarInfo/CarInfo";
import RestInfo from "./RestInfo/RestInfo";
import Wishes from "./Wishes/Wishes";
import FinalOrder from "./FinalOrder/FinalOrder";

import {mainSlider, gallery} from '../../utils/helper';


import { getSets, getServing, getServices, getCarService, getOffice, getReccomendations} from "../../utils/api";

import { stepIndex, checkOneBox, renamed, makeMessage } from "../../utils/helper";
import PuzzleBuilder from "./PuzzleBuilder/PuzzleBuilder";
import CustomPopUp from "../../components/CustomPopUp/CustomPopUp";

export default class FirmCatering extends Component {
                 state = {
                   steps: [
                     {
                       component: MainInfo,
                       name: "main",
                       isOn: true,
                       inputs: {
                         date: "",
                         place: "",
                         phone: ""
                       },
                       checkboxes: {
                         company: false,
                         event: false,
                         private: false
                       }
                     },
                     {
                       component: GuestInfo,
                       name: "guest",
                       isOn: false,
                       inputs: {
                         meat: "",
                         vegan: "",
                         child: "",
                         total: ""
                       }
                     },
                     {
                       component: MenuInfo,
                       name: "menu",
                       isOn: false,
                       puzzle: null,
                       meat: false,
                       vegan: false,
                       child: false,
                       recommendations: [],
                       sets: []
                     },
                     {
                       component: ServingInfo,
                       name: "serving",
                       isOn: false,
                       banquet: false,
                       buffet: false,
                       corporate: false,
                       serviceId: 0,
                       forms: []
                     },
                     {
                       component: BuffetInfo,
                       name: "buffet",
                       puzzle: null,
                       isOn: false,
                       serviceId: 0,
                       services: []
                     },
                     {
                       component: GrillInfo,
                       name: "grill",
                       grill: false,
                       puzzle: null,
                       isOn: false,
                       serviceId: 0,
                       services: []
                     },
                     {
                       component: RestInfo,
                       name: "rest",
                       rest: false,
                       isOn: false,
                       puzzle: null,
                       serviceId: 0,
                       services: [],
                       serviceItems: [],
                       inputs: {},
                      
                     },
                     {
                       component: CarInfo,
                       name: "car",
                       car: false,
                       checkboxes: {
                         basic: false,
                         disco: false,
                         karaoke: false,
                         karaokePlus: false
                       },
                       isOn: false,
                       puzzle: null,
                       serviceId: 0,
                       services: []
                     },
                     {
                       component: Wishes,
                       name: "wishes",
                       inputs: {
                         userWish: ""
                       },
                       isOn: false
                     },
                     {
                       component: FinalOrder,
                       name: "final",
                       isOn: false
                     }
                   ],
                   finalOrder: false,
                   modal: false,
                   message: ""
                 };
                 /*=============================================================METHODS=======================================================*/

                 componentDidMount = () => {
                   window.addEventListener("scroll", this.handleScroll);

                   getSets().then(res => {
                     let arr = [...this.state.steps];
                     let newArr = arr.map(el => {
                       if (el.name === "menu") {
                         return {
                           ...el,
                           sets: res.data.filter(el=> !el.is_office)
                         };
                       } else return el;
                     });

                     this.setState({
                       steps: newArr
                     });
                   });

                   getServing().then(res => {
                     let arr = [...this.state.steps];

                     let newArr = arr.map(el => {
                       if (el.name === "serving") {
                         return {
                           ...el,
                           forms: res.data
                         };
                       } else return el;
                     });

                     this.setState({
                       steps: newArr
                     });
                   });

                   getServices().then(res => {
                     let arr = [...this.state.steps];

                     console.log(res.data);
                     res.data.forEach(el => {
                       let step = arr.find(elem => elem.name === renamed(el.name));

                       step.services = el.sub_service;

                       let newArr = arr.map(element => (element.name === step.name ? step : element));
                       this.setState({
                         steps: newArr
                       });
                     });
                   });

                   getOffice().then(res => {
                    let arr = [...this.state.steps];
            
                    let newArr = arr.map(el => {
                      if (el.name === "rest") {
                        return {
                          ...el,
                          serviceItems: res.data.filter(el=>!el.is_office),
                          inputs: res.data.filter(el=>!el.is_office).reduce((acc,elem)=> ({...acc, [elem.name] : elem.checked}), {})
                        };
                      } else return el;
                    });
                
                    this.setState({
                      steps: newArr
                    });
                  });            

                   getReccomendations().then(res=>{
                    let arr = [...this.state.steps];
                    let newArr = arr.map(el => {
                      if (el.name === "menu") {
                        return {
                          ...el,
                          recommendations: res.data.filter(el=>!el.is_office)
                        };
                      } else return el;
                    });

                    this.setState({
                      steps: newArr
                    });
                   });

                   getCarService().then(res => {
                     let arr = [...this.state.steps];

                     let step = arr.find(elem => elem.name === "car");
                     step.services = res.data;

                     let newArr = arr.map(el => (el.name === step.name ? step : el));
                     this.setState({
                       steps: newArr
                     });
                   });
                 };
                 /*==========================================================================================================================*/

                 takeMessage = event => this.setState({ message: event.currentTarget.dataset.message });
                 /*==========================================================================================================================*/

                 modalToggle = () => this.setState({ modal: !this.state.modal });
                 /*==========================================================================================================================*/

                 componentWillUnmount = () => {
                   window.removeEventListener("scroll", this.handleScroll);
                 };
                 /*==========================================================================================================================*/

                 handleScroll = () => {
                   const cater = document.getElementById("cater");
                   const burger = document.getElementById("burger");
                   const header = document.getElementById("header");
                   window.pageYOffset < cater.offsetTop - header.clientHeight || window.pageYOffset > cater.offsetTop + cater.clientHeight ? (header.style.visibility = "visible") : (header.style.visibility = "hidden");
                   header.style.visibility === "hidden" ? (burger.style.display = "none") : (burger.style.display = "block");
                 };
                 /*==========================================================================================================================*/

                 returnToFinal = () => {
                   let step = [...this.state.steps].find(el => el.isOn);
                   let newSteps = [...this.state.steps].map(el => (el.name === "final" ? { ...el, isOn: true } : el));
                   step.isOn = false;
                   let finalSteps = newSteps.map(el => (el.name === step.name ? step : el));
                   this.setState({ steps: finalSteps });
                 };

                 /*==========================================================================================================================*/

                 setIdToZero = () => {
                   let newSteps = [...this.state.steps];
                   let step = [...this.state.steps].find(el => el.isOn);
                   step.serviceId = 0;
                   if (step.name === "buffet") {
                     let serving = [...this.state.steps].find(el => el.name === "serving");
                     serving.serviceId = 0;
                     newSteps = newSteps.map(el => (el.name === "serving" ? serving : el));
                   }
                   newSteps = newSteps.map(el => (el.isOn ? step : el));
                   this.setState({ steps: newSteps });
                 };

                 /*==========================================================================================================================*/

                 resetBuffetServices = () => {
                   let steps = [...this.state.steps];
                   steps.find(el => el.name === "buffet").serviceId = 0;
                   steps.find(el => el.name === "buffet").services.forEach(el => (el.is_selected = false));
                 };

                 /*==========================================================================================================================*/

                 serviceIdHandler = event => {
                   let id = Number(event.currentTarget.id);
                   console.log(id);
                   let step = [...this.state.steps].find(el => el.isOn);

                   if (step.name === "buffet") {
                     let newStep = [...this.state.steps].find(el => el.name === "serving");
                     newStep.serviceId = newStep.forms.find(el => renamed(el.name) === "buffet").id;
                     this.setState({
                       steps: [...this.state.steps.map(el => (el.name === "serving" ? newStep : el))]
                     });
                   }

                   step.serviceId = id;
                   this.setState({
                     steps: [...this.state.steps.map(el => (el.isOn ? step : el))]
                   });
                 };

                 /*==========================================================================================================================*/

                 chooseStep = event => {
                   let name = event.target.dataset.name;
                   let finalStep = [...this.state.steps].find(el => el.name === "final");
                   finalStep.isOn = false;
                   let step = [...this.state.steps].find(el => el.name === name);
                   step.isOn = true;
                 };

                 /*==========================================================================================================================*/

                 buffetBuyToggle = event => {
                   let name = event.target.dataset.name;
                   const keys = ["buffet", "banquet", "corporate"];
                   let serving = [...this.state.steps].find(el => el.name === "serving");
                   keys.forEach(el => (serving[el] = false));
                   let buffet = this.state.steps.find(el => el.name === "buffet").services.some(el => el.is_selected);
                   let newSteps = [...this.state.steps].map(el => (el.name === "serving" ? { ...serving, [name]: buffet } : el));
                   this.setState({
                     steps: newSteps
                   });
                 };

                 /*==========================================================================================================================*/

                 selectServingByDefault = () => {
                   const serving = ["buffet", "banquet", "corporate"];
                   let step = [...this.state.steps].find(el => el.name === "serving");
                   if (step[serving[0]] === false && step[serving[1]] === false && step[serving[2]] === false) {
                     step[serving[1]] = true;

                     step.serviceId = step.forms.find(el => el.name === "Банкетная").id;

                     let newSteps = [...this.state.steps].map(el => (el.name === "serving" ? step : el));
                     this.setState({
                       steps: newSteps
                     });
                   }
                 };

                 /*==========================================================================================================================*/

                 resetCheckboxes = event => {
                   let name = event.target.dataset.name;

                   let step = [...this.state.steps].find(el => el.name === name);

                   let keys = Object.keys(step.checkboxes);

                   keys.forEach(el => (step.checkboxes[el] = false));

                   let newSteps = [...this.state.steps].map(el => (el.name === name ? step : el));

                   this.setState({
                     steps: newSteps
                   });
                 };

                 /*==========================================================================================================================*/

                 totalGuestCorrector = guests => {
                   let inputs = [...this.state.steps].find(el => el.name === "guest").inputs;
                   inputs.total = guests;

                   let newSteps = [...this.state.steps].map(el =>
                     el.name === "guest"
                       ? {
                           ...el,
                           inputs: inputs
                         }
                       : el
                   );

                   this.setState({
                     steps: newSteps
                   });
                 };

                 /*==========================================================================================================================*/

                 addDishToSet = event => {
                   let id = Number(event.target.id);
                   let name = event.target.name;
                   let set = event.target.dataset.set;

                   let products = [...this.props.categories].find(el => el.name === name).items.reduce((acc, elem) => acc.concat(elem.product), []);

                   let dish = products.find(el => el.id === id);
                   console.log(products);
                   dish.is_added = true;

                   let newSet = [...this.state.steps].find(el => el.name === "menu").sets.find(el => el.name === set);

                   newSet.products.unshift(dish);

                   let newArr = [...this.state.steps].map(el =>
                     el.name === "menu"
                       ? {
                           ...el,
                           sets: el.sets.map(elem => (elem.name === set ? newSet : elem))
                         }
                       : el
                   );

                   this.setState({
                     steps: newArr
                   });
                 };

                 /*==========================================================================================================================*/

                 deleteDish = event => {
                   let id = Number(event.target.id);
                   let name = event.target.name;

                   let dish = [...this.state.steps]
                     .find(el => el.name === "menu")
                     .sets.find(elem => elem.name === name)
                     .products.find(element => element.id === id);

                   dish.is_added = false;

                   let newArr = [...this.state.steps].map(el =>
                     el.name === "menu"
                       ? {
                           ...el,
                           sets: el.sets.map(elem =>
                             elem.name === name
                               ? {
                                   ...elem,
                                   products: elem.products.filter(element => element.id !== id)
                                 }
                               : elem
                           )
                         }
                       : el
                   );

                   this.setState({
                     steps: newArr
                   });
                 };

                 /*==========================================================================================================================*/

                 onePersonWeight = event => {
                   let name = event.target.name;
                   let id = event.target.id;

                   const count = event => {
                     if (event.target.dataset.kega === "true") {
                       return 1;
                     } else return 10;
                   };

                   if (event.target.innerText === "+") {
                     let newSets = [...this.state.steps]
                       .find(el => el.name === "menu")
                       .sets.map(el =>
                         el.name === name
                           ? {
                               ...el,
                               products: el.products.map(elem =>
                                 elem.id === Number(id)
                                   ? {
                                       ...elem,
                                       weight_for_catering: elem.weight_for_catering + count(event)
                                     }
                                   : elem
                               )
                             }
                           : el
                       );

                     let newSteps = [...this.state.steps].map(el =>
                       el.name === "menu"
                         ? {
                             ...el,
                             sets: newSets
                           }
                         : el
                     );

                     this.setState({
                       steps: newSteps
                     });
                   } else if (event.target.innerText === "-") {
                     let newSets = [...this.state.steps]
                       .find(el => el.name === "menu")
                       .sets.map(el =>
                         el.name === name
                           ? {
                               ...el,
                               products: el.products.map(elem =>
                                 elem.id === Number(id)
                                   ? {
                                       ...elem,
                                       weight_for_catering: elem.weight_for_catering - count(event)
                                     }
                                   : elem
                               )
                             }
                           : el
                       );
                     let newSteps = [...this.state.steps].map(el =>
                       el.name === "menu"
                         ? {
                             ...el,
                             sets: newSets
                           }
                         : el
                     );

                     this.setState({
                       steps: newSteps
                     });
                   }
                 };

                 /*==========================================================================================================================*/

                 flagToggle = event => {
                   let name = event.target.dataset.name;
                   let step = [...this.state.steps].find(el => el.name === name);
                   let flag = step.services.some(el => el.is_selected);
                   step[name] = flag;
                   let newSteps = [...this.state.steps].map(el => (el.name === name ? step : el));
                   this.setState({ steps: newSteps });
                 };

                 /*==========================================================================================================================*/

                 serviceToggle = event => {
                   let id = Number(event.currentTarget.id);
                   let name = event.target.dataset.name;
                   let step = [...this.state.steps].find(el => el.name === name);
                   let services = step.services.map(elm => (elm.id === id ? { ...elm, is_selected: !elm.is_selected } : { ...elm, is_selected: false }));
                   step.services = services;
                   let newSteps = [...this.state.steps].map(el => (el.name === name ? { ...el, services: services } : el));
                   this.setState({ steps: newSteps });
                 };

                 /*==========================================================================================================================*/

                 buyToggle = event => {
                   let name = event.target.dataset.name;

                   console.log(event.target.innerText);

                   if (this.state.steps.find(el => el.isOn).name === "serving") {
                     const serving = ["buffet", "banquet", "corporate"];

                     let step = [...this.state.steps].find(el => el.name === "serving");
                     serving.forEach(elem => (step[elem] = false));
                     let newStep = {
                       ...step,
                       [name]: event.target.innerText === "ВЫБРАТЬ" ? true : false
                     };
                     console.log(newStep);

                     let newSteps = [...this.state.steps].map(el => (el.isOn ? newStep : el));

                     this.setState({
                       steps: newSteps
                     });
                   } else {
                     let step = [...this.state.steps].find(el => el.isOn);

                     let newStep = {
                       ...step,
                       [name]: !step[name]
                     };
                     console.log(newStep);
                     let newSteps = [...this.state.steps].map(el => (el.isOn ? newStep : el));

                     this.setState({
                       steps: newSteps
                     });
                   }
                 };

                 /*==========================================================================================================================*/

                 defineSets = (obj, arr, func) => {
                   let valuesArr = Object.values(obj)
                     .filter(el => el !== "")
                     .filter(el => el !== "0");

                   let keys = Object.keys(obj)
                     .filter(el => el !== "total")
                     .filter(el => valuesArr.includes(obj[el]));

                   let newSets = [...arr].filter(el => keys.includes(func(el.name)));

                   let newArr = [...this.state.steps];

                   let newSteps = newArr.map(el =>
                     el.name === "menu"
                       ? {
                           ...el,
                           sets: newSets
                         }
                       : el
                   );

                   this.setState({
                     steps: newSteps
                   });
                 };

                 /*==========================================================================================================================*/

                 guestNumberHandler = event => {
                   if (event.target.innerText === "+") {
                     let name = event.target.name;
                     let arr = [...this.state.steps];
                     let newArr = arr.map(el => {
                       if (el.name === "guest") {
                         return {
                           ...el,
                           inputs: {
                             ...el.inputs,
                             [name]: Number(el.inputs[name]) + 1,
                             total: Number(el.inputs.total) + 1
                           }
                         };
                       } else return el;
                     });
                     this.setState({
                       steps: newArr
                     });
                   } else if (event.target.innerText === "-") {
                     let name = event.target.name;
                     let arr = [...this.state.steps];
                     let newArr = arr.map(el => {
                       if (el.name === "guest") {
                         return {
                           ...el,
                           inputs: {
                             ...el.inputs,
                             [name]: Number(el.inputs[name]) - 1,
                             total: Number(el.inputs.total) - 1
                           }
                         };
                       } else return el;
                     });
                     this.setState({
                       steps: newArr
                     });
                   }
                 };

                 /*==========================================================================================================================*/

                 nextStep = event => {
                   event.preventDefault();

                   let newArr = [...this.state.steps];
                   let prevStep = this.state.steps.find(el => el.isOn);
                   let prevIndex = newArr.indexOf(prevStep);

                   if (prevStep.hasOwnProperty("puzzle")) newArr[prevIndex].puzzle = true;

                   newArr[prevIndex].isOn = false;

                   newArr[prevIndex + 1].isOn = true;

                   this.setState({
                     steps: newArr
                   });
                 };

                 /*==========================================================================================================================*/

                 backStep = event => {
                   event.preventDefault();

                   let newArr = [...this.state.steps];
                   let prevStep = this.state.steps.find(el => el.isOn);
                   let prevIndex = newArr.indexOf(prevStep);

                   newArr[prevIndex].isOn = false;

                   newArr[prevIndex - 1].isOn = true;

                   this.setState({
                     steps: newArr
                   });
                 };

                 /*==========================================================================================================================*/

                 doubleNextStep = event => {
                   event.preventDefault();
                   let newArr = [...this.state.steps];
                   let prevStep = this.state.steps.find(el => el.isOn);
                   let prevIndex = newArr.indexOf(prevStep);

                   if (prevStep.hasOwnProperty("puzzle")) newArr[prevIndex].puzzle = true;

                   newArr[prevIndex].isOn = false;

                   newArr[prevIndex + 1].puzzle = true;

                   newArr[prevIndex + 2].isOn = true;

                   this.setState({
                     steps: newArr
                   });
                 };

                 /*==========================================================================================================================*/

                 stepComponent = obj => React.createElement(this.state.steps.find(el => el.isOn).component, obj);
                 /*==========================================================================================================================*/

                 focusHandler = event => (event.currentTarget.type = "date");
                 /*==========================================================================================================================*/

                 blurHandler = event => (event.currentTarget.type = "text");
                 /*==========================================================================================================================*/

                 inputHandler = event => {
                   let name = event.target.name;
                   let value = event.target.value;

                   let newSteps = this.state.steps.map(el =>
                     el.isOn
                       ? {
                           ...el,
                           inputs: {
                             ...el.inputs,
                             [name]: value
                           }
                         }
                       : el
                   );

                   this.setState({
                     steps: newSteps
                   });
                 };

                 /*==========================================================================================================================*/

                 inputClear = event => {
                   let name = event.target.dataset.name;

                   let step = [...this.state.steps].find(el => el.name === name);

                   let keys = Object.keys(step.inputs);

                   keys.forEach(el => (step.inputs[el] = ""));

                   let newSteps = [...this.state.steps].map(el => (el.name === name ? step : el));

                   this.setState({
                     steps: newSteps
                   });
                 };

                 /*==========================================================================================================================*/

                 finalOrderToggle = () =>
                   this.setState({
                     finalOrder: true
                   });

                 /*==========================================================================================================================*/

                 stepIsOnToggle = event => {
                   let stepName = event.target.dataset.stepname;

                   let newSteps = [...this.state.steps].map(el =>
                     el.name === stepName
                       ? {
                           ...el,
                           isOn: !el.isOn
                         }
                       : el
                   );

                   console.log(newSteps);
                   this.setState({
                     steps: newSteps
                   });
                 };

                 /*==========================================================================================================================*/

                 checkBoxHandler = event => {
                   let name = event.target.name;
                   let arr = [...this.state.steps];
                   let checkboxes = arr.find(el => el.isOn).checkboxes;

                   let newSteps = this.state.steps.map(el =>
                     el.isOn
                       ? {
                           ...el,
                           checkboxes: checkOneBox(checkboxes, name)
                         }
                       : el
                   );

                   this.setState({
                     steps: newSteps
                   });
                 };

                 /*==========================================================================================================================*/

                 checkOffice = event => {
                  let name = event.currentTarget.name;
                  let inputs = [...this.state.steps].find(el=>el.name==='rest').inputs;
            
                  inputs[name] = !inputs[name];
            
                  let arr = [...this.state.steps].map(el=>el.name==='rest'?{...el, inputs: inputs}:el)
            
                  this.setState({steps:arr})
              }
            
              /*==========================================================================================================================*/
              
              quantityHandler = event => {
                if(event.currentTarget.innerText === '+') {
                
                let id = +event.currentTarget.id;
            
                console.log(id)
                
                let services = [...this.state.steps].find(el=>el.name==='rest').serviceItems.map(el=>el.id===id?{...el, quantity: el.quantity + 1} : el);
            
                let arr = [...this.state.steps].map(elm=>elm.name==='rest'?{...elm, serviceItems: services} : elm)   
                  
                this.setState({steps:arr})
            
              } else if (event.currentTarget.innerText === '-') {
                
                let id = +event.currentTarget.id;
            
                let services = [...this.state.steps].find(el=>el.name==='rest').serviceItems.map(el=>el.id===id?{...el, quantity: el.quantity - 1} : el);
            
                let arr = [...this.state.steps].map(elm=>elm.name==='rest'?{...elm, serviceItems: services} : elm)   
                  
                this.setState({steps:arr})
              }
            }
            
              /*==========================================================================================================================*/

                 render() {
                   return (
                     <div className={s.Main}>
                       {this.state.modal && <CustomPopUp modalToggle={this.modalToggle} message={makeMessage(this.state.message)}></CustomPopUp>}
                       <Header boxDeliveryBucket={this.props.boxDeliveryBucket} categories={this.props.categories} path={this.props.path} />
                       <div className={s.HeaderBGWrapper}>
                         <div className={s.SliderText}>
                           <h1>
                             <span> Фирменный </span> <span> Кейтеринг </span>
                           </h1>
                           <p>
                             <span> Минимум бюджета </span> <span> Максимум отдачи </span>
                           </p>
                         </div>

                         <Carousel images={mainSlider} />
                       </div>
                       <h3 className={s.PuzzleText}>Фирменный кейтеринг под открытым небом</h3>
                       <p className={s.PuzzleParagraph}>
                         <strong>Собери </strong>свой уникальный <strong>кейтеринг!</strong>
                       </p>
                       <p className={s.PuzzleParagraph}>
                         {" "}
                         Или доверься команде <strong>ПРОФЕССИОНАЛОВ</strong>{" "}
                       </p>
                       <HeaderCatering />
                       <div id="cater" className={s.Catering}>

                         {/* ==============================BACKGROUNDS================================= */}

                         <img className={stepIndex(this.state.steps) > 9 ? [s.Transparent, s.Images].join(" ") : stepIndex(this.state.steps) === 9 ? s.Images : [s.Images, s.Transparent].join(" ")} src={final} alt="background" />
                         <img className={stepIndex(this.state.steps) > 8 ? [s.Transparent, s.Images].join(" ") : stepIndex(this.state.steps) === 7 || stepIndex(this.state.steps) === 8 ? s.Images : [s.Images, s.Transparent].join(" ")} src={car} alt="background" />
                         <img className={stepIndex(this.state.steps) > 6 ? [s.Transparent, s.Images].join(" ") : stepIndex(this.state.steps) === 6 ? s.Images : [s.Images, s.Transparent].join(" ")} src={rest} alt="background" />
                         <img className={stepIndex(this.state.steps) > 5 ? [s.Transparent, s.Images].join(" ") : stepIndex(this.state.steps) === 5 ? s.Images : [s.Images, s.Transparent].join(" ")} src={grill} alt="background" />
                         <img className={stepIndex(this.state.steps) > 4 ? [s.Transparent, s.Images].join(" ") : stepIndex(this.state.steps) === 4 ? s.Images : [s.Images, s.Transparent].join(" ")} src={buffet} alt="background" />
                         <img className={stepIndex(this.state.steps) > 3 ? [s.Transparent, s.Images].join(" ") : s.Images} src={def} alt="background" />

                         {/* ==========================================PUZZLES================================================== */}

                         {!this.state.finalOrder && <PuzzleBuilder steps={this.state.steps} />}

                         {/* ==========================================POPUPS===================================================  */}
                       

                         {this.stepComponent({
                           path: this.props.location.pathname,
                           allSteps: this.state.steps,
                           nextStep: this.nextStep,
                           step: this.state.steps.find(el => el.isOn),
                           focus: this.focusHandler,
                           blur: this.blurHandler,
                           change: this.inputHandler,
                           check: this.checkBoxHandler,
                           guestNumberHandler: this.guestNumberHandler,
                           defineSets: this.defineSets,
                           buyToggle: this.buyToggle,
                           onePersonWeight: this.onePersonWeight,
                           deleteDish: this.deleteDish,
                           categories: this.props.categories,
                           addDishToSet: this.addDishToSet,
                           totalGuestCorrector: this.totalGuestCorrector,
                           doubleNextStep: this.doubleNextStep,
                           backStep: this.backStep,
                           selectServingByDefault: this.selectServingByDefault,
                           buffetBuyToggle: this.buffetBuyToggle,
                           resetCheckboxes: this.resetCheckboxes,
                           inputClear: this.inputClear,
                           finalOrderToggle: this.finalOrderToggle,
                           finalOrder: this.state.finalOrder,
                           chooseStep: this.chooseStep,
                           stepIsOnToggle: this.stepIsOnToggle,
                           serviceIdHandler: this.serviceIdHandler,
                           serviceToggle: this.serviceToggle,
                           flagToggle: this.flagToggle,
                           resetBuffetServices: this.resetBuffetServices,
                           setIdToZero: this.setIdToZero,
                           returnToFinal: this.returnToFinal,
                           takeMessage: this.takeMessage,
                           modalToggle: this.modalToggle,
                           quantityHandler: this.quantityHandler,
                           checkOffice: this.checkOffice

                         })}
                       </div>
                       <div className={s.Specials}>
                         <img className={s.Meat} src={meat} alt="meat" />
                         <h4 className={s.Title}>
                           <span> Акции </span> для заказчиков
                         </h4>{" "}
                         <ul className={s.List}>
                           <li className={s.Item}>-Дарим для клиента сертификат на повторный заказ со скидкой 10 % (для частных лиц, при сумме заказа до 50 тыс.гривен) </li>
                           <li className={s.Item}>-При заказе трех «Мангал Шоу» зон на третью - 50 % скидка </li>
                           <li className={s.Item}>
                             -Действующее весеннее предложение–« Апрель - Май 2019 г.» <br /> Базовая зона отдыха в подарок или 50 % скидка на базовую фуршетную линию{" "}
                           </li>{" "}
                           <li className={s.Item}>-До 50 человек скидка на фуршетную линию 50 % и стоимость 2300 грн!</li> <li className={s.Item}>-До 50 человек скидка на Мангал Шоу 40 % и стоимость 2700 грн!</li>
                         </ul>{" "}
                         <p className={s.Paragraph}>*Акции/скидки не суммируются </p>
                         <img className={s.Salt} src={salt} alt="salt" />
                       </div>{" "}
                       <EasySlider images={gallery}/>
                       <MainFooter path={this.props.path} />
                     </div>
                   );
                 }
               }
