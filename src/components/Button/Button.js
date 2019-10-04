import React, {Fragment} from 'react'
import s from './Button.module.css';

const Button = (props) => {
    return (
        <Fragment>
            <button className={s.Button}>{props.children}</button>
        </Fragment>
    )
}

export default Button
