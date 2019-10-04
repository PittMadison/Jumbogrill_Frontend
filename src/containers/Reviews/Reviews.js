import React, { Component } from "react";

import Header from "../../components/Header/Header";
import MainFooter from "../../components/MainFooter/MainFooter";

import { connect } from "react-redux";
import {
  asyncData,
  asyncPageFetch
} from "../../redux/actions/fetchReviewsAction";

import {makeMessage} from '../../utils/helper';

import s from "./Reviews.module.css";
import ReviewItem from "./ReviewItem/ReviewItem";
import ReviewModal from "../ModalRequest/ReviewModal/ReviewsModal";
import CommentModal from "../ModalRequest/CommentModal/CommentModal";
import CustomPopUp from "../../components/CustomPopUp/CustomPopUp";

class Reviews extends Component {
  state = {
    commentIsOn: false,
    parent: 0,
    modal: false,
    message: ''
  };

  componentDidMount = () => {
    this.props.fetch();
  };

  commentToggle = () => {
    this.setState({
      commentIsOn: !this.state.commentIsOn
    });
  };

  parentIdHandler = event => {
    let id = event.target.id;
    this.setState({
      parent: id
    });
  };

  takeMessage = event => this.setState({message: event.currentTarget.dataset.message})

  modalToggle = () => this.setState({modal: !this.state.modal})

  render() {
    const pageRight = () => {
      this.props.pageFetch(this.props.reviews.next);
    };

    const pageLeft = () => {
      this.props.pageFetch(this.props.reviews.previous);
    };

    return (
      <div>
      {this.props.modal&&<CustomPopUp message={makeMessage(this.props.message)} modalToggle={this.props.modalToggle}/>}
      {this.state.modal&&<CustomPopUp message={makeMessage(this.state.message)} modalToggle={this.modalToggle}/>}

        <ReviewModal
          modalToggle={this.props.modalToggle}
          takeMessage={this.props.takeMessage}
          reviewToggle={this.props.reviewToggle}
          review={this.props.review}
          reviews={this.props.reviews}
        />
        <CommentModal
          modalToggle={this.modalToggle}
          takeMessage={this.takeMessage}
          parent={this.state.parent}
          commentToggle={this.commentToggle}
          commentIsOn={this.state.commentIsOn}
        />
        <Header
          boxDeliveryBucket={this.props.boxDeliveryBucket}
          categories={this.props.categories}
          path={this.props.path}
        />
        <div className={s.Wrapper}>
          <div className={s.TopBar}>
            <h4 className={s.Title}>Отзывы</h4>
            <button onClick={this.props.reviewToggle} className={s.Button}>
              Написать отзыв
            </button>
          </div>
          <ul>
            {this.props.reviews.results
              ? this.props.reviews.results.map(el => (
                  <ReviewItem
                    replies={el.replies}
                    commentIsOn={el.is_on}
                    parentIdHandler={this.parentIdHandler}
                    commentToggle={this.commentToggle}
                    review={this.props.review}
                    name={el.name}
                    key={el.id}
                    date={el.date}
                    comment={el.comment}
                    id={el.id}
                    changeRating={this.changeRating}
                    rating={el.rating}
                    targetId={this.targetId}
                  />
                ))
              : null}
          </ul>
        </div>
        <div className={s.Pagination}>
          <button
            className={s.Left}
            disabled={this.props.reviews.previous ? false : true}
            onClick={pageLeft}
          />
          <button
            className={s.Right}
            disabled={this.props.reviews.next ? false : true}
            onClick={pageRight}
          />
        </div>
        <MainFooter path={this.props.path} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reviews: state.fetchReviewsReducer
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(asyncData()),
  pageFetch: url => dispatch(asyncPageFetch(url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews);
