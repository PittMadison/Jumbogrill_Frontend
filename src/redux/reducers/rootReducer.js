import {combineReducers} from 'redux';
import fetchReviewsReducer from './fetchReviewsReducer';

const rootReducer = combineReducers({
    fetchReviewsReducer,
})

export default rootReducer;