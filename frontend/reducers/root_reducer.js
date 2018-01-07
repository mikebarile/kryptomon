import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import ListingReducer from './listing_reducer';
import MyListingsReducer from './my_listings_reducer';
import ListingFormStateReducer from './listing_form_state_reducer';
import SearchListingsReducer from './listings_search_reducer';
import FilterReducer from './filter_reducer';
import MyTripsReducer from './my_trips_reducer';
import MyReservationsReducer from './my_reservations_reducer';
import BookingErrorsReducer from './booking_errors';
import ReviewsReducer from './reviews_reducer';
import TopPicksReducer from './top_picks_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  listing: ListingReducer,
  myListings: MyListingsReducer,
  myTrips: MyTripsReducer,
  myReservations: MyReservationsReducer,
  listingFormState: ListingFormStateReducer,
  searchListings: SearchListingsReducer,
  filter: FilterReducer,
  bookingErrors: BookingErrorsReducer,
  reviews: ReviewsReducer,
  topPicks: TopPicksReducer
});

export default RootReducer;
