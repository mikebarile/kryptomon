import { connect } from 'react-redux';
import MyTrips from './my_trips';
import {fetchMyTrips, deleteTrip, editTrip, clearBookingErrors
} from '../../actions/booking_actions';

const mapStateToProps = ({myTrips, session}) => ({
  currentUser: session.currentUser,
  myTrips
});

const mapDispatchToProps = dispatch => ({
  fetchMyTrips: (params) => dispatch(fetchMyTrips(params)),
  deleteTrip: (id) => dispatch(deleteTrip(id)),
  editTrip: (listing) => dispatch(editTrip(listing)),
  clearBookingErrors: () => dispatch(clearBookingErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(MyTrips);
