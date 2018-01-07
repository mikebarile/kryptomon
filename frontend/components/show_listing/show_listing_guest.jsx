import React from 'react';
import { Link } from 'react-router';
import { withRouter } from 'react-router';
import BookListing from './book_listing';
import Description from './listing_description';
import Reviews from './reviews';

class ShowListingGuest extends React.Component {
  constructor(props) {
    super(props);
  }

  handleReviewCount(count) {
    if (count === 0 || count === null || count === undefined) {
      return "No reviews";
    }
    else if (count === 1) {
      return "1 review";
    }
    else {
      return `${count} reviews`;
    }
  }

  handleStars(rating, className) {
    let stars = [];

    if (rating === null || rating === undefined || rating === 0) {
      for (var i = 0; i < 5; i++) {
        stars.push(<img key={i} className={className} src="http://res.cloudinary.com/dsguwnfdw/image/upload/c_crop,h_68,w_68,x_5,y_2/v1478139574/Icons/Screen_Shot_2016-11-02_at_7.19.10_PM.png"/>);
      }
      return stars;
    }

    rating = (Math.round(rating * 2) / 2).toFixed(1);

    for (var i = 1; i <= rating; i++) {
      stars.push(<img key={i} className={className} src="http://res.cloudinary.com/dsguwnfdw/image/upload/c_crop,h_70,w_70,x_3,y_2/v1478139260/Icons/Screen_Shot_2016-11-02_at_7.12.47_PM.png"/>);
    }
    if (rating - Math.floor(rating) === 0.5){
      stars.push(<img key={i+10} className={className} src="http://res.cloudinary.com/dsguwnfdw/image/upload/c_crop,h_70,w_70,x_7/v1478139260/Icons/Screen_Shot_2016-11-02_at_7.13.12_PM.png"/>);
    }
    for (var i = stars.length; i < 5; i++) {
      stars.push(<img key={i+20} className={className} src="http://res.cloudinary.com/dsguwnfdw/image/upload/c_crop,h_68,w_68,x_5,y_2/v1478139574/Icons/Screen_Shot_2016-11-02_at_7.19.10_PM.png"/>);
    }
    return stars;
  }

  render() {
    let listing = this.props.currentListing;
    let imgStyle = {
      backgroundImage: `url('${listing.image_url}')`
    };

    let location;
    if (listing.country === "United States") {
      location = `${listing.city}, ${listing.state}, ${listing.country}`;
    }
    else {
      location = `${listing.city}, ${listing.country}`;
    }

    return (
      <div className="show-listing">
        <div className="sl-image" style={imgStyle}>
          <div className="sl-img-columns-container">

            <div className="sl-img-first-col">
              <div className="sl-title-row">
                <div className="sl-title-col">
                  <span className="sl-title">{listing.title}</span>
                  <div className="sl-sub-title-row">
                    <span className="sl-sub-title slst-first">{location}</span>
                    <span className="sl-sub-title">·</span>
                      {this.handleStars(listing.average_rating, "sl-star")}
                      <span className="sl-sub-title">{this.handleReviewCount(listing.count_reviews)}</span>
                  </div>
                </div>

                <div className="sl-host-col">
                  <img src={listing.host_image_url} className="sl-host-img"/>
                  <span className="sl-host-name">{listing.host_first_name}</span>
                </div>
              </div>
            </div>
            <div className="sl-dummy-col"></div>
            <div className="sl-img-second-col">
              <div className="sl-price-container">
                <span className="sl-price">
                  <span className="sl-dollar-sign">$</span>{listing.price}
                </span>
                <span className="sl-per-night">Per Night</span>
              </div>
            </div>

          </div>
        </div>

        <div className="sl-columns-container">
          <div className="sl-first_col">
            <div className="sl-title-row">
              <div className="sl-title-col">
                <span className="sl-title">{listing.title}</span>
                <div className="sl-sub-title-row">
                  <span className="sl-sub-title slst-first">{location}</span>
                  <span className="sl-sub-title">·</span>
                  {this.handleStars(listing.average_rating, "sl-star")}
                  <span className="sl-sub-title">{this.handleReviewCount(listing.count_reviews)}</span>
                </div>
              </div>

              <div className="sl-host-col">
                <img src={listing.host_image_url} className="sl-host-img"/>
                <span className="sl-host-name">{listing.host_first_name}</span>
              </div>
            </div>

            <Description
              currentListing={listing}
              errors={this.props.errors}/>

            <Reviews
              currentListing={this.props.currentListing}
              currentUser={this.props.currentUser}
              createReview={this.props.createReview}/>
          </div>

          <div className="sl-dummy-col"></div>

          <div className="sl-second-col">
            <BookListing
              currentListing={listing}
              clearBookingErrors={this.props.clearBookingErrors}
              currentUser={this.props.currentUser}
              errors={this.props.errors}
              createBooking={this.props.createBooking}
              myTrips={this.props.myTrips}/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ShowListingGuest);
