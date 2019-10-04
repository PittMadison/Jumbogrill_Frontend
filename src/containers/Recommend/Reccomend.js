import React from 'react'
import s from './Recommend.module.css';

import closeBtn from "../../assets/img/closeWhite.svg";


const Reccomend = props => {
    const array = props.step.recommendations.filter(el=>el.catering_set===props.id)
    console.log(array);
    return (
        <div className={s.Reccomend}>
            <h6 className={s.Title}>РЕКОМЕНДАЦИИ</h6>
            <ol className={s.List}>
                {array[0].recommends.map(el=>
                <li>{el.text}</li>)
                }
            </ol>
            <button onClick={props.reccomendHandler} className={s.Close}>
              <img src={closeBtn} alt="close_button" />
            </button>
        </div>
    )
}

export default Reccomend
