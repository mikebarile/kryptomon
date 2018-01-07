import React from 'react';
import { Link, withRouter } from 'react-router';

class ListingItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.router.push(`/listings/${this.props.listing.id}`);
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
    let listing = this.props.listing;
    if (listing === null || listing === undefined) {
      return ( <div></div> );
    }
    else {
      return (
        <div className="search-listing-item" onClick={this.handleClick}>
          <img className="search-pick-img" src={listing.image_url}/>
          <div className="search-pick-description">
            <span className="search-pick-price">${listing.price}</span>
            <span className="search-pick-title">{listing.title}</span>
          </div>
          <div className="search-pick-reviews">
            {this.handleStars(listing.average_rating, "search-pick-star")}
            <span className="search-pick-num-reviews">{this.handleReviewCount(listing.count_reviews)}</span>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(ListingItem);
