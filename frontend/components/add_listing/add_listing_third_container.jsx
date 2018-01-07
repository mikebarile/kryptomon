import { connect } from 'react-redux';
import AddListingThird from './add_listing_third';
import {createListing, updateListingForm, fetchCoords, clearListingForm
} from '../../actions/listing_actions';

const mapStateToProps = ({ session, listingFormState }) => ({
  currentUser: session.currentUser,
  listingFormState
});

const mapDispatchToProps = dispatch => ({
  updateListingForm: (formState) => dispatch(updateListingForm(formState)),
  createListing: (listing) => dispatch(createListing(listing)),
  fetchCoords: (street_address, city, state, zip_code, country) =>
    {dispatch(fetchCoords(street_address, city, state, zip_code, country));},
  clearListingForm: () => dispatch(clearListingForm())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(AddListingThird);
