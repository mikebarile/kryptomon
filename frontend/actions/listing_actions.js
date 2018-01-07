export const FETCH_LISTING = "FETCH_LISTING";
export const FETCH_MY_LISTINGS = "FETCH_MY_LISTINGS";
export const FETCH_SEARCH_LISTINGS = "FETCH_SEARCH_LISTINGS";
export const CREATE_LISTING = "CREATE_LISTING";
export const DELETE_LISTING = "DELETE_LISTING";
export const EDIT_LISTING = "EDIT_LISTING";
export const RECEIVE_LISTING = "RECEIVE_LISTING";
export const RECEIVE_MY_LISTINGS = "RECEIVE_MY_LISTINGS";
export const RECEIVE_SEARCH_LISTINGS = "RECEIVE_SEARCH_LISTINGS";
export const RECEIVE_NEW_LISTING = "RECEIVE_NEW_LISTING";
export const REMOVE_LISTING = "REMOVE_LISTING";
export const RECEIVE_LISTING_ERRORS = "RECEIVE_LISTING_ERRORS";
export const CLEAR_LISTING_ERRORS = "CLEAR_LISTING_ERRORS";
export const CLEAR_LISTING = "CLEAR_LISTING";
export const UPDATE_LISTING_FORM = "UPDATE_LISTING_FORM";
export const CLEAR_STATE = "CLEAR_STATE";
export const UPDATE_IMAGE = "UPDATE_IMAGE";
export const FETCH_COORDS = "FETCH_COORDS";
export const CLEAR_LISTING_FORM = "CLEAR_LISTING_FORM";
export const UPDATE_FILTER = "UPDATE_FILTER";
export const FETCH_TOP_LISTINGS = "FETCH_TOP_LISTINGS";
export const RECEIVE_TOP_LISTINGS = "RECEIVE_TOP_LISTINGS";

export const fetchListing = (id) => ({
  type: FETCH_LISTING,
  id
});

export const fetchMyListings = (params) => ({
  type: FETCH_MY_LISTINGS,
  params
});

export const createListing = (listing, router) => ({
  type: CREATE_LISTING,
  listing,
  router
});

export const deleteListing = (id) => ({
  type: CREATE_LISTING,
  id
});

export const editListing = (listing) => ({
  type: EDIT_LISTING,
  listing
});

export const receiveListing = (listing) => ({
  type: RECEIVE_LISTING,
  listing
});

export const receiveMyListings = (listings) => ({
  type: RECEIVE_MY_LISTINGS,
  listings
});

export const receiveNewListing = (listing) => ({
  type: RECEIVE_NEW_LISTING,
  listing
});

export const removeListing = (listing) => ({
  type: REMOVE_LISTING,
  listing
});

export const receiveListingErrors = (errors) => ({
  type: RECEIVE_LISTING_ERRORS,
  errors
});

export const clearListingErrors = () => ({
  type: CLEAR_LISTING_ERRORS
});

export const clearListing = () => ({
  type: CLEAR_LISTING
});

export const updateListingForm = (formParams) => ({
  type: UPDATE_LISTING_FORM,
  formParams
});

export const clearState = () => ({
  type: CLEAR_STATE
});

export const updateImage = (file) => ({
  type: UPDATE_IMAGE,
  file
});

export const fetchCoords = (street_address, city, state, zip_code, country) => ({
  type: FETCH_COORDS,
  street_address,
  city,
  state,
  zip_code,
  country
});

export const clearListingForm = () => ({
  type: CLEAR_LISTING_FORM
});

export const fetchSearchListings = (params) => ({
  type: FETCH_SEARCH_LISTINGS,
  params
});

export const receiveSearchListings = (listings) => ({
  type: RECEIVE_SEARCH_LISTINGS,
  listings
});

export const updateFilter = (filter) => ({
  type: UPDATE_FILTER,
  filter,
});

export const fetchTopListings = () => ({
  type: FETCH_TOP_LISTINGS
});

export const receiveTopListings = (listings) => ({
  type: RECEIVE_TOP_LISTINGS,
  listings
});
