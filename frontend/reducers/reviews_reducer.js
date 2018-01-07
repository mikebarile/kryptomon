import { RECEIVE_REVIEWS, RECEIVE_EDITED_REVIEW, RECEIVE_NEW_REVIEW,
   REMOVE_REVIEW, CLEAR_STATE } from '../actions/review_actions';
import { merge } from 'lodash';

const defaultState = [];

const ReviewsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_REVIEWS:
      return action.reviews;
    case RECEIVE_EDITED_REVIEW:
      newState = [];
      state.forEach(review => {
        if (review.id === action.review.id) {
          newState.push(action.review);
        }
        else {
          newState.push(review);
        }
      });
      return newState;
    case REMOVE_REVIEW:
      newState = [];
      state.forEach(review => {
        if (review.id !== action.review.id) {
          newState.push(review);
        }
      });
      return newState;
    case RECEIVE_NEW_REVIEW:
      newState = state.slice(0);
      newState.push(action.review);
      return newState;
    case CLEAR_STATE:
      return defaultState;
    default:
      return state;
  }
};

export default ReviewsReducer;
