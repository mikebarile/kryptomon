import { connect } from 'react-redux';
import AddListing from './add_listing';
import {createListing, updateListingForm} from '../../actions/listing_actions';

const mapStateToProps = ({ session, listingFormState }) => ({
  currentUser: session.currentUser,
  listingFormState
});

const mapDispatchToProps = dispatch => ({
  updateListingForm: (formState) => dispatch(updateListingForm(formState)),
  createListing: (listing) => dispatch(createListing(listing))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(AddListing);
