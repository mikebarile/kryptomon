import { connect } from 'react-redux';
import Search from './search';
import {fetchSearchListings, updateFilter} from '../../actions/listing_actions';

const mapStateToProps = ({searchListings, session, filter}) => ({
  currentUser: session.currentUser,
  searchListings,
  filter
});

const mapDispatchToProps = dispatch => ({
  fetchSearchListings: (params) => dispatch(fetchSearchListings(params)),
  updateFilter: (filters) => dispatch(updateFilter(filters))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Search);
