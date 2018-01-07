import { RECEIVE_CREATE_BOOKING_ERRORS, RECEIVE_EDIT_TRIP_ERRORS,
  RECEIVE_EDIT_RESERVATION_ERRORS, CLEAR_STATE, CLEAR_BOOKING_ERRORS }
  from '../actions/booking_actions';
import { merge } from 'lodash';

const defaultState = {
  createBookingErrors: [],
  editTripErrors: [],
  editReservationErrors: []
};

const BookingErrors = (state = defaultState, action) => {
  Object.freeze(state);
    let newState;
  switch (action.type) {
    case RECEIVE_CREATE_BOOKING_ERRORS:
      newState = merge({}, state);
      newState.createBookingErrors = action.errors;
      return newState;
    case RECEIVE_EDIT_TRIP_ERRORS:
      newState = merge({}, state);
      newState.editTripErrors = action.errors;
      return newState;
    case RECEIVE_EDIT_RESERVATION_ERRORS:
      newState = merge({}, state);
      newState.editReservationErrors = action.errors;
      return newState;
    case CLEAR_BOOKING_ERRORS:
      return defaultState;
    case CLEAR_STATE:
      return defaultState;
    default:
      return state;
  }
};

export default BookingErrors;
