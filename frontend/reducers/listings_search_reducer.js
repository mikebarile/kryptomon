import { RECEIVE_SEARCH_LISTINGS, CLEAR_STATE
} from '../actions/listing_actions';
import { merge } from 'lodash';

const defaultState = [];

const SearchListingsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCH_LISTINGS:
      return action.listings;
    case CLEAR_STATE:
      return defaultState;
    default:
      return state;
  }
};

export default SearchListingsReducer;
