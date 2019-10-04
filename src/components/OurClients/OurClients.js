import React from 'react';

import s from './OurClients.module.css';
import SimpleSlider from '../../containers/SimpleSlider/SimpleSlider';

const OurClients = (props) => {
    return (
        <div className={s.Wrapper}>
            <h5 className={s.Title}>Наши клиенты</h5>
            <p className={s.Text}>Многие клиенты стали для нас друзьями!</p>
            <SimpleSlider/>
        </div>
    )
}

export default OurClients;