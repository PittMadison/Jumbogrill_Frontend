import React, {Component} from 'react'
import Header from '../Header/Header';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {mainSlider} from '../../utils/helper';


import s from './Main.module.css';
import HeaderCatering from '../HeaderCatering/HeaderCatering';
import RevolutionaryCatering from '../RevolutionaryCatering/RevolutionaryCatering';
import MainOfficeCatering from '../MainOfficeCatering/MainOfficeCatering';
import MainBoxDelivery from '../MainBoxDelivery/MainBoxDelivery';
import MainRestaurant from '../MainRestaurant/MainRestaurant';
import JumboGrillThatIs from '../JumboGrillThatIs/JumboGrillThatIs';
import JumboFriends from '../JumboFriends/JumboFriends';
import OurClients from '../OurClients/OurClients';
import MainFooter from '../MainFooter/MainFooter';
import CustomPopUp from '../CustomPopUp/CustomPopUp';

import {makeMessage} from '../../utils/helper';
import CarouselSlider from '../Carousel/CarouselSlider';

class Main extends Component{
   
    state={
        animation: false
    }

  

render() {

    return (
        <div className={s.Main}>
            {this.props.modal && <CustomPopUp modalToggle={this.props.modalToggle} message={makeMessage(this.props.message)}></CustomPopUp>}
            <Header
                boxDeliveryBucket={this.props.boxDeliveryBucket} 
                categories={this.props.categories}  
                path={this.props.path}/>
            <div id='hdWr' className={s.HeaderBGWrapper}>
                <div className={s.SliderText}>
                    <h1>Jumbo Grill</h1>
                    <p>революционный кейтеринг</p>
                </div>
                <CarouselSlider images={mainSlider}/>
            </div>
            <h3 className={s.PuzzleText}>Фирменный кейтеринг под открытым небом</h3>
            <p className={s.PuzzleParagraph}><strong>Собери</strong> свой уникальный <strong>кейтеринг !</strong></p>
            <p className={s.PuzzleParagraph}>Или доверься команде <strong>ПРОФЕССИОНАЛОВ</strong></p>
            <HeaderCatering animation={this.state.animation}/>
            <RevolutionaryCatering/>
            <MainOfficeCatering/>
            <MainBoxDelivery/>
            <MainRestaurant/>
            <JumboGrillThatIs/>
            <JumboFriends/>
            <OurClients/>
            <MainFooter path={this.props.path}/>
        </div>
    )
}}

export default Main;
