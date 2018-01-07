import React from 'react';
import { Link } from 'react-router';

class MyListings extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchMyListings({"host_id": this.props.currentUser.id});
  }

  componentDidUpdate() {
    if(this.props.currentUser === null){
      this.props.router.replace('/home');
    }
    this.props.fetchMyListings({"host_id": this.props.currentUser.id});
  }

  handleLocation(listing) {
    if (listing.country === "United States") {
      return `${listing.city}, ${listing.state}`;
    }
    else {
      return `${listing.city}, ${listing.country}`;
    }
  }

  handleLastListing(idx, numListings) {
    if (idx === numListings - 1) {
      return "ml-listing-item ml-listing-last";
    }
    else {
      return "ml-listing-item";
    }
  }

  imgStyle (imageUrl) {
    return ({background:
      `url('${imageUrl}') center center / cover no-repeat`});
  }

  render() {
    let numListings = this.props.myListings.length;

    return (
      <div className="my-listings">
        <div className="ml-columns-container">
          <div className="ml-options-column">
            <div className="ml-nav-buttons">
              <Link to="/my-listings" className="ml-nav-button-selected">Your Listings</Link>
              <Link to="/my-listings" className="ml-nav-button">Your Reservations (coming soon)</Link>
            </div>
            <Link to="/become-a-host" className="ml-add-listing-button">Add New Listings</Link>
          </div>

          <div className="ml-listings-column">
            <div className="ml-listed-box">
              <span className="ml-listed-span">Listed</span>
            </div>
            {this.props.myListings.map((listing, idx) => (
              <div className={this.handleLastListing(idx, numListings)} key={listing.id}>
                <div style={this.imgStyle(listing.image_url)} className="ml-listing-image"></div>
                <div className="ml-description-column">
                  <span className="ml-description-title">{listing.title}</span>
                  <span className="ml-description-location">{this.handleLocation(listing)}</span>
                  <Link to={`/listings/${listing.id}`} className="ml-description-preview">Preview</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}



export default MyListings;
