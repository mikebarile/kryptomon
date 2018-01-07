import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';
import { clearListing } from '../actions/listing_actions';
import App from './app.jsx';
import HomeContainer from './home/home_container';
import ShowListingContainer from './show_listing/show_listing_container';
import MyListingsContainer from './my_listings/my_listings_container';
import AddListingIndex from './add_listing/add_listing_index';
import AddListingHomeContainer from './add_listing/add_listing_home_container';
import AddListingFirstContainer from './add_listing/add_listing_first_container';
import AddListingSecondContainer from './add_listing/add_listing_second_container';
import AddListingThirdContainer from './add_listing/add_listing_third_container';
import SearchContainer from './search/search_container';
import MyTripsContainer from './my_trips/my_trips_container';


const Root = ({ store }) => {

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('/');
    }
  };

  const purgeListing = () => store.dispatch(clearListing());

  const redirectHome = (nextState, replaceState) => {
    if(store.getState().session.currentUser === null){
      replaceState('/home');
    }
  };

  const redirectALHome = (nextState, replaceState) => {
    if(store.getState().session.currentUser === null){
      replaceState('/become-a-host');
    }
  };

  return (
  <Provider store={store}>
    <Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
      <Route path="/" component={App} >
        <IndexRedirect to="/home" />
        <Route path="/home" component={HomeContainer}/>
        <Route path="listings/:listing_id" component={ShowListingContainer} onLeave={purgeListing}/>
        <Route path="my-listings" component={MyListingsContainer} onEnter={redirectHome}/>
        <Route path="become-a-host" component={AddListingIndex}>
          <IndexRoute component={AddListingHomeContainer}/>
          <Route path="basics" component={AddListingFirstContainer} onEnter={redirectALHome}/>
          <Route path="scene" component={AddListingSecondContainer} onEnter={redirectALHome}/>
          <Route path="ready" component={AddListingThirdContainer} onEnter={redirectALHome}/>
        </Route>
        <Route path="search" component={SearchContainer}/>
        <Route path="my-trips" component={MyTripsContainer}/>
      </Route>
    </Router>
  </Provider>
);
};

export default Root;
