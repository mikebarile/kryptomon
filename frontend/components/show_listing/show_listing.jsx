import React from 'react';
import ShowListingGuest from './show_listing_guest';
import ShowListingHost from './show_listing_host';

class ShowListing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchListing(this.props.params.listing_id);
  }

  render() {
    let isHost;
    if (this.props.currentUser && this.props.currentUser.id ===
      this.props.currentListing.host_id) {
      isHost = true;
    }
    else {
      isHost = false;
    }

    if (isHost) {
      return <ShowListingHost
        currentUser={this.props.currentUser}
        currentListing={this.props.currentListing}
        errors={this.props.errors}
        createBooking = {this.props.createBooking}
        myTrips = {this.props.myTrips}
        clearBookingErrors={this.props.clearBookingErrors}
        createReview={this.props.createReview}
      />;
    }
    else {
      return <ShowListingGuest
        currentUser = {this.props.currentUser}
        currentListing = {this.props.currentListing}
        errors = {this.props.errors}
        createBooking = {this.props.createBooking}
        myTrips = {this.props.myTrips}
        clearBookingErrors={this.props.clearBookingErrors}
        createReview={this.props.createReview}
      />;
    }
  }
}

export default ShowListing;
