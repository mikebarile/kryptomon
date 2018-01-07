import {RECEIVE_LISTING, REMOVE_LISTING, RECEIVE_LISTING_ERRORS,
  CLEAR_LISTING_ERRORS, CLEAR_LISTING, CLEAR_STATE
} from '../actions/listing_actions';
import {RECEIVE_NEW_REVIEW} from '../actions/review_actions';
import { merge } from 'lodash';

const defaultState = {
  currentListing: {
    id: null,
    title: "",
    host_id: null,
    city: "",
    state: "",
    country: "",
    description: "",
    price: null,
    dog_walks: false,
    deluxe_bed: false,
    house_cat: false,
    gourmet_food: false,
    chew_toys: false,
    frisbee: false,
    mailman: false,
    grooming: false,
    cuddle_buddy: false,
    indoor_poop: false,
    indoor_pee: false,
    barking: false,
    whining: false,
    begging: false,
    shedding: false,
    image_url: ""
  },
  errors: []
};

const ListingReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_LISTING:
      return {
        currentListing: action.listing,
        errors: []
      };
    case REMOVE_LISTING:
      if (action.listing.id === state.currentListing.id){
        return defaultState;
      }
      else {
        return state;
      }
    case RECEIVE_NEW_REVIEW:
      newState = merge({}, state);
      newState.currentListing.reviews.unshift(action.review);
      return newState;
    case RECEIVE_LISTING_ERRORS:
      return {
        currentListing: defaultState,
        errors: action.errors
      };
    case CLEAR_LISTING:
      return defaultState;
    case CLEAR_LISTING_ERRORS:
      newState = merge({}, state);
      newState.errors = [];
      return newState;
    default:
      return state;
  }
};

export default ListingReducer;
