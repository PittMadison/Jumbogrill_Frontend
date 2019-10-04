import React, { Component } from 'react';
import './ReviewModal.css';
import closeBtn from "../../../assets/img/closeWhite.svg";

import StarRating from '../../StarRating/StarRating';

import {connect} from 'react-redux';
import {asyncPostData} from '../../../redux/actions/fetchReviewsAction';

class ReviewModal extends Component {

    state = {
        rating: 4,
        comment: '',
        name: '',
        email: ''
    }

    resetForm = () => {
        let newState = {...this.state};
        let array = Object.keys(newState);
        array.forEach(el=>el==='rating'?newState[el] = 4 : newState[el] = '')
        this.setState({
            ...newState,
        })
    }

    inputHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    changeRating = (newRating) => {
        this.setState({
          rating: newRating
        });
    }

    submitHandler = event => {
        event.preventDefault();
        
        let commentObj = this.state;

       this.props.postFetch(commentObj);
        this.props.takeMessage(event);
        this.resetForm();
        this.props.modalToggle();
       this.props.reviewToggle();
        
    }

    render() {

        const styles = this.props.review ? {display: 'block'} : {display: 'none'}
        const closeOnDiv = event => event.target.className === 'wrapperReviews zoom' ? this.props.reviewToggle() : null;

        return (
            <div onClick={closeOnDiv} className='wrapperReviews zoom' style={styles}>
            <div id="modalReviews">
                <div className="modal-contentReviews">
                    <h2>Оставьте свой отзыв</h2>
                    <div className="modalStars">
                    <p>Оцените нас:</p>
                    <StarRating
                        changeRating={this.changeRating}
                        rating={this.state.rating}
                        review={this.props.review}
                    />
                    </div>
                <form data-message='review' onSubmit={this.submitHandler}>
                    <textarea onChange={this.inputHandler} value={this.state.comment} type="text" maxLength='250' placeholder="Ваш отзыв" required name="comment"/>
                    <input onChange={this.inputHandler} value={this.state.name} type="text" placeholder="Ваше имя" required name="name"/>
                    <input onChange={this.inputHandler} value={this.state.email} type="email" placeholder="Ваш E-mail" required name="email"/>
                    <button className='button' type="submit">Оставить отзыв</button>
                </form>
                <button onClick={this.props.reviewToggle} className="do-closeReviews">
                    <img src={closeBtn} alt="close_button"/>
                </button>
                </div>
            </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    postFetch: (obj) => dispatch(asyncPostData(obj)),
    
  });


export default connect(null, mapDispatchToProps)(ReviewModal);