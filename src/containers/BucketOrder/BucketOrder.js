import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {url} from '../../utils/api';
import s from './BucketOrder.module.css';
import BucketTableOrder from '../../components/Bucket/BucketTableOrder/BucketTableOrder';

import {makeMessage} from '../../utils/helper';
import CustomPopUp from '../../components/CustomPopUp/CustomPopUp';
class BucketOrder extends Component{
    state = {
            user: 1,
            name: '',
            email: '',
            phone_number: '',
            city: '',
            street: '',
            house: '',
            entrance: '',
            floor: '',
            apartment: "",
            items: this.props.boxDeliveryBucket
    }


    resetForm = () => {
        let newState = {...this.state};
        let array = Object.keys(newState);
        array.forEach(el=>el==='items' ? null : newState[el] = '')
        this.setState({
            ...newState,
        })
    }

    inputChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;


        this.setState({
            [name]: value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        
        this.props.takeMessage(event);

        let orderObj = {...this.state,
        house: this.state.house,
        entrance: Number(this.state.entrance),
        floor: Number(this.state.floor),
        apartment: Number(this.state.apartment),
        }

        let obj =  {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...orderObj, items: this.state.items.map(el => ({count: Number(el.count), product: Number(el.id)}))
            })}
            console.log("obj: ", obj);

        fetch( `${url}/api/v1/order/create/`, obj);
        this.props.history.push('/');
        this.resetForm();
        this.props.orderingChange();
        this.props.clearBucket();
        this.props.modalToggle();

    }

    render () {

        return (
            <Fragment>
            <div className={s.BucketWrapper}>
                <button className={s.ReturnToBucket} onClick={this.props.orderingChange}>НАЗАД В КОРЗИНУ</button>
                <h4 className={s.BucketHeading}>Оформление заказа</h4>

                

                <form data-message='box' onSubmit={this.submitHandler} className={s.Form}>

                    <div className={s.FormDivision}>
                    
                    <div className={s.FormWrapper}>
                        
                        
                            <div className={s.FormPersonal}>

                                <h3>Личные данные</h3>

                                <div className={s.LabelInput}>
                                    <label className={[s.LargeLabel, s.InputAfter].join(' ')} htmlFor="name">Имя</label>
                                    <input className={s.LargeInput} type="text" onChange={this.inputChange} value={this.state.name} name="name" required/>
                                </div>
                                

                                <div className={s.LabelInput}>
                                    <label className={[s.LargeLabel, s.InputAfter].join(' ')} htmlFor="phone">Телефон</label>
                                    <input className={s.LargeInput} id="phone" type="text" onChange={this.inputChange} value={this.state.phone_number} name="phone_number" required/>
                                </div>
                                
                                <div className={s.LabelInput}>
                                    <label className={[s.LargeLabel, s.InputAfter].join(' ')} htmlFor="email">E-mail</label>
                                    <input className={s.LargeInput} type="email" onChange={this.inputChange} value={this.state.email} name="email" required/> 
                                </div>
                                
                            </div>

                            <div className={s.FormAdress}>

                                <h3>Адрес доставки</h3>

                                <div className={s.LabelInput}>
                                    <label className={[s.LargeLabel, s.InputAfter].join(' ')} htmlFor="city">Город</label>
                                    <input className={s.LargeInput} type="text" onChange={this.inputChange} value={this.state.city} name="city" required/>
                                </div>

                                <div className={s.LabelInput}>
                                    <label className={[s.LargeLabel, s.InputAfter].join(' ')} htmlFor="street">Улица</label>
                                    <input className={s.LargeInput} type="text" onChange={this.inputChange} value={this.state.street} name="street" required/>
                                </div>
                                
                                <div className={s.FormHouse}>

                                    <div className={s.LabelInput}>
                                        <label className={[s.SmallLabel, s.InputAfter].join(' ')} htmlFor="house">Дом</label>
                                        <input className={s.SmallInput} type="text" onChange={this.inputChange} value={this.state.house} name="house" required/>
                                    </div>

                                    <div className={s.LabelInput}>
                                        <label className={s.SmallLabel} htmlFor="entrance">Подъезд</label>
                                        <input className={s.SmallInput} min='0' type="number" onChange={this.inputChange} value={this.state.entrance} name="entrance"/>   
                                    </div>

                                    <div className={s.LabelInput}>
                                        <label className={s.SmallLabel} htmlFor="floor">Этаж</label>
                                        <input className={s.SmallInput} min='0' type="number" onChange={this.inputChange} value={this.state.floor} name="floor"/> 
                                    </div>

                                    <div className={s.LabelInput}>
                                        <label className={[s.SmallLabel, s.InputAfter].join(' ')} htmlFor="apartment">Кв/оф</label>
                                        <input className={s.SmallInput} min='0' type="number" onChange={this.inputChange} value={this.state.apartment} name="apartment" required/>  
                                    </div>

                                </div>

                            </div>

                         
                    </div>
                    
                    <BucketTableOrder boxDeliveryBucket={this.props.boxDeliveryBucket}/>

                    </div>
                    <p className={s.BucketPayment}><span>ИТОГО К ОПЛАТЕ:</span><span>{+(this.props.boxDeliveryBucket.reduce((acc, el)=>acc + el.totalPrice, 0)).toFixed(2) + ' грн'}</span></p>
                    <button className={s.BucketOrderBtn} type="submit">ОФОРМИТЬ ЗАКАЗ</button>
                </form>
            </div>
            </Fragment>
        )   
    }
}

export default withRouter(BucketOrder);
