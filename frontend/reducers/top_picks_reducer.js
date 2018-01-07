import { RECEIVE_TOP_LISTINGS } from '../actions/listing_actions';
import { merge } from 'lodash';

const defaultState = [];

const MyListingsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TOP_LISTINGS:
      return action.listings;
    default:
      return state;
  }
};

export default MyListingsReducer;
