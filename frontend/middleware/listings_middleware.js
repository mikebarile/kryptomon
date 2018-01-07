import { receiveMyListings, receiveListing, receiveNewListing, removeListing,
  receiveListingErrors, receiveSearchListings, updateListingForm, receiveTopListings,
  FETCH_LISTING, FETCH_MY_LISTINGS, CREATE_LISTING, DELETE_LISTING, EDIT_LISTING,
  UPDATE_IMAGE, FETCH_COORDS, FETCH_SEARCH_LISTINGS, UPDATE_FILTER,
  FETCH_TOP_LISTINGS} from '../actions/listing_actions';

import {fetchListing, fetchListings, createListing, deleteListing,
  editListing, fetchCoords, fetchSearchListings, fetchTopListings
} from '../util/listing_api_util';

export default ({ getState, dispatch }) => next => action => {
  const receiveListingSuccess = listing => {
    dispatch(receiveListing(listing));
  };

  const receiveMyListingsSuccess = listings => {
    dispatch(receiveMyListings(listings));
  };

  const receiveSearchListingsSuccess = listings => {
    dispatch(receiveSearchListings(listings));
  };

  const removeListingSuccess = listing => {
    dispatch(removeListing(listing));
  };

  const receiveNewListingSuccess = listing => {
    dispatch(receiveNewListing(listing));
  };

  const receiveImageSuccess = object => {
    dispatch(updateListingForm({image_url: object.secure_url}));
  };

  const receiveTopListingsSuccess = listings => {
    dispatch(receiveTopListings(listings));
  };

  const receiveCoordsSuccess = (data) => {
    let lat;
    let lng;
    if (data === undefined || data.results === undefined || data.results[0] === undefined ||
      data.results[0].geometry === undefined || data.results[0].geometry.location === undefined){
      lat = null;
      lng = null;
    }
    else {
      lat = data.results[0].geometry.location.lat;
      lng = data.results[0].geometry.location.lng;
    }
    dispatch(updateListingForm({lat, lng}));
    dispatch(updateListingForm({clicked: true}));
  };

  const errorCallback = xhr => dispatch(receiveListingErrors(xhr.responseJSON));

  switch(action.type) {
    case FETCH_LISTING:
      fetchListing(action.id, receiveListingSuccess, errorCallback);
      return next(action);
    case FETCH_MY_LISTINGS:
      fetchListings(action.params, receiveMyListingsSuccess);
      return next(action);
    case FETCH_SEARCH_LISTINGS:
      fetchListings(action.params, receiveSearchListingsSuccess);
      return next(action);
    case CREATE_LISTING:
      createListing(action.listing, receiveNewListingSuccess);
      return next(action);
    case DELETE_LISTING:
      deleteListing(action.id, removeListingSuccess);
      return next(action);
    case EDIT_LISTING:
      editListing(action.listing, receiveListingSuccess);
      return next(action);
    case FETCH_COORDS:
      fetchCoords(action.street_address, action.city, action.state, action.zip_code, action.country, receiveCoordsSuccess);
      return next(action);
    case UPDATE_FILTER:
      next(action);
      fetchSearchListings(action.filter, receiveSearchListingsSuccess);
      break;
    case FETCH_TOP_LISTINGS:
      fetchTopListings(receiveTopListingsSuccess);
      return next(action);
    default:
      return next(action);
  }
};
