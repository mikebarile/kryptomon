export const FETCH_REVIEWS = "FETCH_REVIEWS";
export const CREATE_REVIEW = "CREATE_REVIEW";
export const DELETE_REVIEW = "DELETE_REVIEW";
export const EDIT_REVIEW = "EDIT_REVIEW";
export const RECEIVE_REVIEWS = "RECEIVE_REVIEWS";
export const RECEIVE_NEW_REVIEW = "RECEIVE_NEW_REVIEW";
export const RECEIVE_EDITED_REVIEW = "RECEIVE_EDITED_REVIEW";
export const REMOVE_REVIEW = "REMOVE_REVIEW";
export const CLEAR_STATE = "CLEAR_STATE";

export const fetchReviews = (params) => ({
  type: FETCH_REVIEWS,
  params
});

export const createReview = (review) => ({
  type: CREATE_REVIEW,
  review
});

export const deleteReview = (id) => ({
  type: DELETE_REVIEW,
  id
});

export const editReview = (review) => ({
  type: EDIT_REVIEW,
  review
});

export const receiveNewReview = (review) => ({
  type: RECEIVE_NEW_REVIEW,
  review
});

export const receiveEditedReview = (review) => ({
  type: RECEIVE_EDITED_REVIEW,
  review
});

export const receiveReviews = (reviews) => ({
  type: RECEIVE_REVIEWS,
  reviews
});

export const removeReview = (review) => ({
  type: REMOVE_REVIEW,
  review
});


export const clearState = () => ({
  type: CLEAR_STATE
});
