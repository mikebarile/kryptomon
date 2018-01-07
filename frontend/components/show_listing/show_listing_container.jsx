import { connect } from 'react-redux';
import ShowListing from './show_listing';
import {fetchListing, deleteListing, editListing, clearListingErrors
} from '../../actions/listing_actions';
import { createBooking, clearBookingErrors
} from '../../actions/booking_actions';
import { createReview } from '../../actions/review_actions';

const mapStateToProps = ({listing, session, bookingErrors, myTrips}) => ({
  currentUser: session.currentUser,
  currentListing: listing.currentListing,
  errors: bookingErrors.createBookingErrors,
  myTrips
});

const mapDispatchToProps = dispatch => ({
  fetchListing: (id) => dispatch(fetchListing(id)),
  deleteListing: (id) => dispatch(deleteListing(id)),
  editListing: (listing) => dispatch(editListing(listing)),
  clearListingErrors: () => dispatch(clearListingErrors()),
  createBooking: (booking) => dispatch(createBooking(booking)),
  clearBookingErrors: () => dispatch(clearBookingErrors()),
  createReview: (review) => dispatch(createReview(review))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ShowListing);
