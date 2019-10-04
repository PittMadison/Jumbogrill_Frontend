import React from 'react';
import s from './JumboFriends.module.css';

const JumboFriends = (props) => {
    return (
        <div className={s.Wrapper}>
            <div className={s.Items}>
                <h5 className={s.Title}>Jumbo - дружба навеки!</h5>
                <p><strong>Араик Хачатрян - </strong>ресторатор и основатель Jumbo Grill, посвятил грилю больше 25 лет жизни. В 2013 году он установил рекорд Украины и приготовил 160 метров гриля на Крещатике. Для рекорда Араик создал инфинити-гриль, который совершенствовал еще несколько лет. Сегодня мы привезем, соберем инфинити-гриль и накормим самую большую компанию в любом месте. Для подготовки нужно знать только количество гостей, их вкусы и gps-координаты локации.</p>  
            </div>
            
        </div>
    )
}

export default JumboFriends;
