import React, { Fragment } from "react";

import BoxDeliveryList from "../BoxDeliveryList/BoxDeliveryList";
import BoxBG2 from "../../assets/img/bg/BOX_DELIVERY_BG600.jpg";
import BoxBG from "../../assets/img/bg/Webp.net-resizeimage.png"
import {makeMessage} from '../../utils/helper';
import s from "./BoxDelivery.module.css";
import Header from "../Header/Header";
import BoxDeliveryPopUp from "./BoxDeliveryPopUp/BoxDeliveryPopUp";
import ModalRequest from "../../containers/ModalRequest/ModalRequest";
import MainFooter from "../MainFooter/MainFooter";
import CustomPopUp from "../CustomPopUp/CustomPopUp";





const BoxDelivery = props => {
  return (
    <Fragment>
    {props.modal&&<CustomPopUp message={makeMessage(props.message)} modalToggle={props.modalToggle}></CustomPopUp>}
      <ModalRequest
        takeMessage={props.takeMessage}
        modalToggle={props.modalToggle}
        modalRequest={props.modalRequest}
        modalRequestChange={props.modalRequestChange}
      />
      {props.popUp && (
        <BoxDeliveryPopUp
          popUpBoxId={props.popUpBoxId}
          boxPopUpOff={props.boxPopUpOff}
          addDefaultCount={props.addDefaultCount}
          subDefaultCount={props.subDefaultCount}
          addToBucketBox={props.addToBucketBox}
          boxDeliveryData={props.boxDeliveryData}
        />
      )}
      <Header
        boxDeliveryBucket={props.boxDeliveryBucket}
        categories={props.categories}
        path={props.path}
      />
  

 
         <img
          className={[s.BoxBGWrapper, s.Display1].join(" ")}
          src={BoxBG}
          alt='box'
        />
        <img
          className={[s.BoxBGWrapper, s.Display2].join(" ")}
          src={BoxBG2}
          alt='box'
        /> 
      
      <BoxDeliveryList
        boxInfoHandler={props.boxInfoHandler}
        boxPopUpOn={props.boxPopUpOn}
        addDefaultCount={props.addDefaultCount}
        subDefaultCount={props.subDefaultCount}
        boxDeliveryData={props.boxDeliveryData}
        addToBucketBox={props.addToBucketBox}
        modalRequestChange={props.modalRequestChange}
      />
      <MainFooter path={props.path} />
    </Fragment>
  );
};

export default BoxDelivery;
