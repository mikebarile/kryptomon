import { receiveReviews, receiveNewReview, receiveEditedReview,
  removeReview, FETCH_REVIEWS, CREATE_REVIEW, DELETE_REVIEW, EDIT_REVIEW,
} from '../actions/review_actions';

import {fetchReviews, createReview, deleteReview, editReview
} from '../util/review_api_util';

export default ({ getState, dispatch }) => next => action => {
  const receiveNewReviewSuccess = booking => {
    dispatch(receiveNewReview(booking));
  };

  const receiveEditedReviewSuccess = booking => {
    dispatch(receiveEditedReview(booking));
  };

  const receiveReviewsSuccess = bookings => {
    dispatch(receiveReviews(bookings));
  };

  const removeReviewSuccess = booking => {
    dispatch(removeReview(booking));
  };

  switch(action.type) {
    case FETCH_REVIEWS:
      fetchReviews(action.params, receiveReviewsSuccess);
      return next(action);
    case CREATE_REVIEW:
      createReview(action.review, receiveNewReviewSuccess);
      return next(action);
    case DELETE_REVIEW:
      deleteReview(action.id, removeReviewSuccess);
      return next(action);
    case EDIT_REVIEW:
      editReview(action.review, receiveEditedReviewSuccess);
      return next(action);
    default:
      return next(action);
  }
};
