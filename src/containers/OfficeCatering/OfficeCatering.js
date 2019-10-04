import React, { Component } from 'react'

import s from './OfficeCatering.module.css';

import gift from '../../assets/img/gift.svg';

import Carousel from "../../components/Carousel/CarouselSlider";

import {officeSlider, gallery, checkOneBox, makeMessage } from '../../utils/helper';
import {getSets, getOffice, getReccomendations} from '../../utils/api';



import Header from '../../components/Header/Header';
import EasySlider from '../EasySlider/EasySlider';
import MainFooter from '../../components/MainFooter/MainFooter';
import MenuInfo from '../FirmCatering/MenuInfo/MenuInfo';
import GuestInfo from '../FirmCatering/GuestInfo/GuestInfo';
import MainInfo from '../FirmCatering/MainInfo/MainInfo';
import OfficeServices from './OfficeServices/OfficeServices';
import CustomPopUp from '../../components/CustomPopUp/CustomPopUp';

export default class OfficeCatering extends Component {

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
                  component: OfficeServices,
                  name: 'service',
                  isOn: false,
                  inputs: {},
                  serviceItems: []
              }
        ],
        modal: false 
    }

/*==========================================================================================================================*/

componentDidMount = () => {
    document.addEventListener('scroll', this.handleScroll)

    getSets().then(res => {
        let arr = [...this.state.steps];
        let newArr = arr.map(el => {
          if (el.name === "menu") {
            return {
              ...el,
              sets: res.data.filter(el=> el.is_office)
            };
          } else return el;
        });

        this.setState({
          steps: newArr
        });
      });

      getOffice().then(res => {
        let arr = [...this.state.steps];

        let newArr = arr.map(el => {
          if (el.name === "service") {
            return {
              ...el,
              serviceItems: res.data.filter(el=>el.is_office),
              inputs: res.data.filter(el=>el.is_office).reduce((acc,elem)=> ({...acc, [elem.name] : elem.checked}), {})
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
              recommendations: res.data.filter(el=>el.is_office)
            };
          } else return el;
        });

        this.setState({
          steps: newArr
        });
       });
    
}


/*==========================================================================================================================*/

componentWillUnmount = () => {
    document.removeEventListener('scroll', this.handleScroll)
}

/*==========================================================================================================================*/

    handleScroll = () => {
        const office = document.getElementById("office");
        const burger = document.getElementById("burger");
        const header = document.getElementById("header");
        window.pageYOffset < office.offsetTop - header.clientHeight || window.pageYOffset > office.offsetTop + office.clientHeight ? (header.style.visibility = "visible") : (header.style.visibility = "hidden");
        header.style.visibility === "hidden" ? (burger.style.display = "none") : (burger.style.display = "block");
      };

/*==========================================================================================================================*/

      stepComponent = obj => React.createElement(this.state.steps.find(el => el.isOn).component, obj);

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

  checkOffice = event => {
      let name = event.currentTarget.name;
      let inputs = [...this.state.steps].find(el=>el.name==='service').inputs;

      inputs[name] = !inputs[name];

      let arr = [...this.state.steps].map(el=>el.name==='service'?{...el, inputs: inputs}:el)

      this.setState({steps:arr})
  }

  /*==========================================================================================================================*/
  
  quantityHandler = event => {
    if(event.currentTarget.innerText === '+') {
    
    let id = +event.currentTarget.id;

    console.log(id)
    
    let services = [...this.state.steps].find(el=>el.name==='service').serviceItems.map(el=>el.id===id?{...el, quantity: el.quantity + 1} : el);

    let arr = [...this.state.steps].map(elm=>elm.name==='service'?{...elm, serviceItems: services} : elm)   
      
    this.setState({steps:arr})

  } else if (event.currentTarget.innerText === '-') {
    
    let id = +event.currentTarget.id;

    let services = [...this.state.steps].find(el=>el.name==='service').serviceItems.map(el=>el.id===id?{...el, quantity: el.quantity - 1} : el);

    let arr = [...this.state.steps].map(elm=>elm.name==='service'?{...elm, serviceItems: services} : elm)   
      
    this.setState({steps:arr})
  }
}

  /*==========================================================================================================================*/

  takeMessage = event => this.setState({ message: event.currentTarget.dataset.message });

  /*==========================================================================================================================*/

  modalToggle = () => this.setState({ modal: !this.state.modal });

  /*==========================================================================================================================*/

    render() {
        return (
            <div className={s.Main}>
                       {this.state.modal && <CustomPopUp modalToggle={this.modalToggle} message={makeMessage(this.state.message)}></CustomPopUp>}

                <Header boxDeliveryBucket={this.props.boxDeliveryBucket} categories={this.props.categories} path={this.props.path}/>
                <div className={s.HeaderBGWrapper}>
                        <div className={s.SliderText}>
                            <h1>
                            <span> Офис-кейтеринг </span>
                            </h1>
                            <p>
                            <span> Гриль прямо у вас в офисе! </span>
                            </p>
                        </div>
                    <Carousel images={officeSlider}/>
                    </div>
                <div className={s.Wrapper}>

                <h3 className={s.MainTitle}>Форматы офис-кейтеринга</h3>
                <ul className={s.List}>
                <li className={s.Item}>
                    <img className={s.ItemImg} src={gift} alt="icon"/>
                    <p className={s.ItemText}>День рождения</p>
                </li>
                <li className={s.Item}>
                    <img className={s.ItemImg} src={gift} alt="icon"/>
                    <p className={s.ItemText}>Обед</p>
                </li>
                <li className={s.Item}>
                    <img className={s.ItemImg} src={gift} alt="icon"/>
                    <p className={s.ItemText}>Корпоратив</p>
                </li>
                <li className={s.Item}>
                    <img className={s.ItemImg} src={gift} alt="icon"/>
                    <p className={s.ItemText}>Конференция</p>
                </li>
                </ul>

            <div className={s.Buttons}>
                <button className={s.Button}>Собрать свой кейтеринг</button>
                <button className={s.Button}>Оставить заявку</button>
            </div>


            <div id='office' className={s.OfficeCatering}>
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
                    checkOffice: this.checkOffice,
                    quantityHandler: this.quantityHandler,
                    takeMessage: this.takeMessage,
                    modalToggle: this.modalToggle
                })}
            </div>

            <h6 className={s.GalleryTitle}>Фото галерея</h6>

            <EasySlider images={gallery}/>

            </div>
            
            <MainFooter path={this.props.path} />
            
            </div>    

        )
    }
}
