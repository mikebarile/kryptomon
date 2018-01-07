import { connect } from 'react-redux';
import AddListingFirst from './add_listing_first';
import {createListing, updateListingForm, updateImage
} from '../../actions/listing_actions';

const mapStateToProps = ({ session, listingFormState }) => ({
  currentUser: session.currentUser,
  listingFormState
});

const mapDispatchToProps = dispatch => ({
  updateListingForm: (formState) => dispatch(updateListingForm(formState)),
  createListing: (listing) => dispatch(createListing(listing)),
  updateImage: (file) => dispatch(updateImage(file))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(AddListingFirst);
