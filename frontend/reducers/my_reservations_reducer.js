import { RECEIVE_MY_RESERVATIONS, RECEIVE_EDITED_RESERVATION,
   REMOVE_RESERVATION, CLEAR_STATE } from '../actions/booking_actions';
import { merge } from 'lodash';

const defaultState = [];

const MyReservationsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_MY_RESERVATIONS:
      return action.bookings;
    case RECEIVE_EDITED_RESERVATION:
      newState = [];
      state.forEach(reservation => {
        if (reservation.id === action.booking.id) {
          newState.push(action.booking);
        }
        else {
          newState.push(reservation);
        }
      });
      return newState;
    case REMOVE_RESERVATION:
      newState = [];
      state.forEach(reservation => {
        if (reservation.id !== action.booking.id) {
          newState.push(reservation);
        }
      });
      return newState;
    case CLEAR_STATE:
      return defaultState;
    default:
      return state;
  }
};

export default MyReservationsReducer;
