import React from 'react';

import Header from '../Header/Header';
import MainFooter from '../MainFooter/MainFooter';

import {makeMessage} from '../../utils/helper';

import {map} from '../../utils/api';

import s from './Contacts.module.css';
import ContactsItem from './ContactsItem/ContactsItem';
import CustomPopUp from '../CustomPopUp/CustomPopUp';


const Contacts = (props) => {
    console.log(props.path);
    return (
        <div className={s.Wrapper}>
        {props.modal&&<CustomPopUp message={makeMessage(props.message)} modalToggle={props.modalToggle}/>}
            <Header
                boxDeliveryBucket={props.boxDeliveryBucket} 
                categories={props.categories}  
                path={props.path}/>
            <ContactsItem 
                takeMessage={props.takeMessage}
                modalToggle={props.modalToggle}
            />
            <iframe className={s.Iframe} title='iframe' src={map} frameBorder="0" style={{border:0}} allowFullScreen></iframe>
            <MainFooter path={props.path}/>
        </div>
    )
}

export default Contacts
