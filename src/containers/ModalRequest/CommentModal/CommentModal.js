import React, { Component } from 'react';
import './CommentModal.css';
import closeBtn from "../../../assets/img/closeWhite.svg";


import {connect} from 'react-redux';
import {asyncPostData} from '../../../redux/actions/fetchReviewsAction';

class CommentModal extends Component {

    state = {
        comment: '',
        name: '',
        email: ''
    }

    resetForm = () => {
        let newState = {...this.state};
        let array = Object.keys(newState);
        array.forEach(el=> newState[el] = '')
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

    submitHandler = event => {
        event.preventDefault();
        
        let commentObj = {...this.state, parent: Number(this.props.parent)};

        console.log(commentObj);

        this.props.post(commentObj);
        this.props.takeMessage(event);
        this.resetForm();
        this.props.modalToggle();
        this.props.commentToggle();
    }

    render() {

        const styles = this.props.commentIsOn? {display: 'block'} : {display: 'none'}
        const closeOnDiv = event => event.target.className === 'wrapperComment zoom' ? this.props.commentToggle() : null;

        return (
            <div onClick={closeOnDiv} className='wrapperComment zoom' style={styles}>
            <div id="modalComment">
                <div className="modal-contentComment">
                    <h2>Оставьте свой комментарий</h2>
                <form data-message='comment' onSubmit={this.submitHandler}>
                    <textarea onChange={this.inputHandler} value={this.state.comment} type="text" maxLength='200' placeholder="Ваш комментарий" required name="comment"/>
                    <input onChange={this.inputHandler} value={this.state.name} type="text" placeholder="Ваше имя" required name="name"/>
                    <input onChange={this.inputHandler} value={this.state.email} type="email" placeholder="Ваш email" required name="email"/>
                    <button className='button' type="submit">Оставить комментарий</button>
                </form>
                <button onClick={this.props.commentToggle} className="do-closeComment">
                    <img src={closeBtn} alt="close_button"/>
                </button>
                </div>
            </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    post: (obj) => dispatch(asyncPostData(obj)),
  });


export default connect(null, mapDispatchToProps)(CommentModal);