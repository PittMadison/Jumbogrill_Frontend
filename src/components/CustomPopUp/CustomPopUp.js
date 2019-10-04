import React, {Component} from 'react'

import s from './CustomPopUp.module.css';
import close from "../../assets/img/closeWhite.svg";

class CustomPopUp extends Component {
  
  

  render(){

  const closeOnBacking = event => event.target.className === s.Backing ? this.props.modalToggle() : null;

    return (
    <div onClick={closeOnBacking} className={s.Backing}>
        <div className={s.Window}>
            <button onClick={this.props.modalToggle} className={s.CloseBtn}>
          <img src={close} alt="close" />
        </button>
            <p className={s.Message}>{this.props.message}</p>
        </div>
    </div>
    )
  }
}

export default CustomPopUp;
