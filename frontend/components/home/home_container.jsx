import { connect } from 'react-redux';
import Home from './home';
import { fetchTopListings } from '../../actions/listing_actions';

const mapStateToProps = ({session, topPicks}) => ({
  currentUser: session.currentUser,
  topPicks
});

const mapDispatchToProps = dispatch => ({
  fetchTopListings: () => dispatch(fetchTopListings()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Home);
