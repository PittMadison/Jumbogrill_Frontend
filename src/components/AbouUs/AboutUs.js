import React from 'react';

import firstImg from '../../assets/img/aboutUsFirstImg';
import secondImg from '../../assets/img/aboutUsSecondImg';

import s from './AboutUs.module.css';

const AboutUs = () => {
    return (
        <div className={s.Wrapper}>
            <h4 className={s.Title}>О нас</h4>
            <div className={s.SectionOne}>
                <div className={s.Text}>
                    <p>
                        <i className={s.Subheader}>“ Мы смело можем заявить, что Jumbo Grill 
                        - это самый лучший и выгодный гриль в Украине</i>
                    </p>
                    <p className={s.SecondaryText}>Наша уникальная гриль - система позволяет при минимальных расходах получать максимум отдачи.</p>
                    <p className={s.TertiaryText}>Полностью укомплектованное и	брендированное решение. Наш	кейтеринг всегда выглядит одинаково, просто	он масштабируется. Вы	получаете ту картинку и	качество, которое ожидаете.</p>
                </div>
                <img className={s.FirstImg} src={firstImg} alt="grilled_food"/>
            </div>
            <div className={s.SectionTwo}>
                <div className={s.Text}>
                    <p>
                        <i className={s.Subheader}>“ Мы не просто запекаем гриль
                        - мы создаем атмосферу </i>
                    </p>
                    <p className={s.TertiaryText}>В обычных мангалах системы решеток располагаются перпендикулярно. Мы же расположили их параллельно - это стало переворотом всего процесса приготовления. В 2013 году мы установили два мировых рекорда: собрали самый длинный мангал и приготовили самый длинный шашлык. В 2017 году мы установили новый рекорд. Приготовили 1013 хачапури за 13 минут.</p>
                </div>
                <img className={s.SecondImg} src={secondImg} alt="grilled_food"/>                
            </div>
        </div>
    )
}

export default AboutUs
