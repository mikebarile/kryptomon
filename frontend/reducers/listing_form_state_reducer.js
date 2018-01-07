import { UPDATE_LISTING_FORM, CLEAR_LISTING_FORM, CLEAR_STATE } from '../actions/listing_actions';
import { merge } from 'lodash';

const defaultState = {
  current_form: "home",
  clicked: false,
  title: "",
  host_id: null,
  lat: null,
  lng: null,
  street_address: "",
  city: "",
  zip_code: "",
  state: "",
  country: "United States",
  image_url: null,
  original_filename: null,
  format: null,
  apt_num: "",
  description: "",
  price: "",
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
};

const ListingFormStateReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case UPDATE_LISTING_FORM:
      let oldState = merge({}, state);
      let newState = merge(oldState, action.formParams);
      return newState;
    case CLEAR_STATE:
      return merge({}, defaultState);
    case CLEAR_LISTING_FORM:
      return merge({}, defaultState);
    default:
      return state;
  }
};

export default ListingFormStateReducer;
