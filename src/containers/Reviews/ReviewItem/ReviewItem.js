import React, {Fragment} from 'react'
import moment from 'moment';

import {connect} from 'react-redux';
import {commentToggle} from '../../../redux/actions/commentAction';

import s from './ReviewItem.module.css';
import StarRating from '../../StarRating/StarRating';

import chat from '../../../assets/img/chat.svg';
import CommentItem from '../CommentItem/CommentItem';


const ReviewItem = (props) => {
    const {name, date, rating, comment, id, targetId, review, commentToggle, parentIdHandler, replies, commentIsOn, reviewObject, commentHandler} = props;

    const commentFunc = (event) => {
        commentToggle();
        parentIdHandler(event);
    }

    const allCommentsToggle = (event) => {
        commentHandler(event, reviewObject);
    }

    return (
        <Fragment>
        <li className={s.Item}>
            <div className={s.NameCommentDate}>
                <p className={s.Name}>{name}</p>
                <p className={s.CommentDate}>{moment.utc(date).local().format('YYYY-MM-DD')}</p>
            </div>
            <div className={s.StarsComment}>
                <StarRating
                    review={review}
                    id={id}
                    targetId={targetId} 
                    rating={Number(rating)}   
                    />
                <p className={s.Comment}>{comment}</p>
            </div>
            <div className={s.LeaveComment}>
            <button id={id} onClick={commentFunc} className={s.Button}>НАПИСАТЬ КОММЕНТАРИЙ</button>
            <div className={s.CommentItems}>
                <img id={id} onClick={allCommentsToggle} src={chat} alt="chat"/>
                <p>{replies.length}</p>
            </div>
            </div>
        </li>
        <ul className={s.CommentsList}>
                {commentIsOn ? replies.map(el => <CommentItem
                    key={el.id}    
                    name={el.name}
                    date={el.date}
                    comment={el.comment}
                />) : null}
        </ul>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    reviewObject: state.fetchReviewsReducer
})

const mapDispatchToProps = dispatch => ({
    commentHandler: (event, object) => dispatch(commentToggle(event, object))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewItem);
