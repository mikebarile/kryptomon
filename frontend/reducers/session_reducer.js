import {RECEIVE_CURRENT_USER, RECEIVE_ERRORS, CLEAR_ERRORS, LOGOUT} from '../actions/session_actions';
import { merge } from 'lodash';

const defaultState = {
  currentUser: null,
  errors: []
};

const SessionReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        currentUser: action.currentUser,
        errors: []
      };
    case RECEIVE_ERRORS:
      return {
        currentUser: null,
        errors: action.errors
      };
    case CLEAR_ERRORS:
      let newState = merge({}, state);
      newState.errors = [];
      return newState;
    case LOGOUT:
      return merge({}, defaultState);
    default:
      return state;
  }
};

export default SessionReducer;
