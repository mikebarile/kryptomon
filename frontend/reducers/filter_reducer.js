import { UPDATE_FILTER } from '../actions/listing_actions';
import merge from 'lodash/merge';

const _defaultFilters = Object.freeze({
  bounds: {}
});

const FilterReducer = (state = _defaultFilters, action) => {
  Object.freeze(state);
  if (action.type === UPDATE_FILTER) {
    let oldState = merge({}, state);
    let newState = merge(oldState, action.filter);
    return newState;
  } else {
    return state;
  }
};

export default FilterReducer;
