import React from 'react';
import s from './RevolutionaryCatering.module.css';

import percent from '../../assets/img/percent.svg';
import glass from '../../assets/img/loupe.svg';
import money from '../../assets/img/money.svg';
import choices from '../../assets/img/choices.svg';


const RevolutionaryCatering = (props) => {
    return (
        <div id='rvWr' className={s.Wrapper}>
            <h4 className={s.Title}>Революционный просчет кейтеринга от <span>Jumbo Grill</span></h4>
            <ul className={s.List}>
                <li className={s.Item}>
                    <div className={s.Percent}></div>
                    <h5>Экономнее, больше продуктов</h5>
                    <p>Вы сэкономите минимум 20% и гарантировано получите на 20% больше продуктов.</p>
                </li>
                <li className={s.Item}>
                    <div className={s.Glass}></div>
                    <h5>Прозрачно</h5>
                    <p>Самый прозрачный просчет кейтеринга, который позволяет Вам самим просчитывать Ваш бюджет. </p>
                </li>
                <li className={s.Item}>
                    <div className={s.Money}></div>
                    <h5>Экономно</h5>
                    <p>Вы сэкономите минимум 20% и гарантировано получите на 20% больше продуктов.</p>
                </li>
                <li className={s.Item}>
                    <div className={s.Choices}></div>
                    <h5>Индивидуально</h5>
                    <p>Вы выбираете и оплачиваете только те зоны кейтеринга, которые Вам нужны.</p>
                </li>
            </ul>
        </div>
    )
}

export default RevolutionaryCatering
