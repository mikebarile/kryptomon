import React from 'react';
import { Link } from 'react-router';
import { withRouter } from 'react-router';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreate: false,
      reviewBody: "",
      rating: null,
      errors: []
    };
    this.handleAddReviewClick = this.handleAddReviewClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.handleCreateReview = this.handleCreateReview.bind(this);
    this.handleReviews = this.handleReviews.bind(this);
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

  handleDate(date) {
    let dates = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December"
    };

    let month = dates[date.slice(5, 7)];
    return `${month}, ${date.slice(0, 4)}`;
  }

  handleReviewCount(count) {
    if (count === 0 || count === null || count === undefined) {
      return "No Reviews";
    }
    else if (count === 1) {
      return "1 Review";
    }
    else {
      return `${count} Reviews`;
    }
  }

  handleAddReviewClick(e) {
    e.preventDefault();
    this.setState({showCreate: true});
  }

  handleSubmit(e) {
    if (this.props.currentUser === null || this.props.currentUser.id === null) {
      return(this.setState({errors: ["Please log in to add a review"]}));
    }
    if (this.state.reviewBody === "") {
      return(this.setState({errors: ["Review body can't be blank"]}));
    }
    else if (this.state.rating === null || this.state.rating === "") {
      return(this.setState({errors: ["Review rating can't be blank"]}));
    }
    else {
      this.props.createReview({
        guest_id: this.props.currentUser.id,
        description: this.state.reviewBody,
        listing_id: this.props.currentListing.id,
        rating: this.state.rating
      });
      this.setState({
        showCreate: false,
        reviewBody: "",
        rating: null,
        errors: []
      });
    }
  }

  update(property) {
    return e => {
      this.setState({[property]: e.target.value});
    };
  }

  handleCreateReview() {
    if (this.state.showCreate === false) {
      return <div></div>;
    }
    return (
      <div className="slr-create-review">
        <span className="slr-create-review-title">Add a review</span>
        <div className="slr-create_reivew_container">
          <ul className="alf-errors">
            {this.state.errors.map((error, idx) => (
              <span key={idx} className="alf-error">{error}</span>
            ))}
          </ul>
          <select className="slr-create-rating" onChange={this.update("rating")}>
              <option defaultValue value="">Please select an option </option>
              <option value='1'>1 star</option>
              <option value='2'>2 stars</option>
              <option value='3'>3 stars</option>
              <option value='4'>4 stars</option>
              <option value='5'>5 stars</option>
            </select>
          <textarea
            ref="descriptionField"
            placeholder="Leave a review to help other dogowners find a great vacation spot for their pooch!"
            className="slr-review-body"
            onChange={this.update("reviewBody")}>
          </textarea>
          <button onClick={this.handleSubmit} className="slr-submit-review">Submit</button>
        </div>
      </div>
    );
  }

  handleReviews() {
    let reviews = [];
    if (this.props.currentListing.reviews === undefined) {
      return (<div></div>);
    }
    reviews = this.props.currentListing.reviews.map((review, idx) => (
      <div key={idx} className="slr-review">
        <div className="slrr-header-row">
          <img src={review.guest_image_url} className="slrr-guest-img"/>
          <div className="slrr-header-col">
            <span className="slrr-name">{review.guest_name}</span>
            <span className="slrr-date">{this.handleDate(review.date)}</span>
          </div>
        </div>
        <div className="slrr-body">
          {review.description}
        </div>
      </div>
    ));
    return reviews;
  }

  render() {
    let listing = this.props.currentListing;
    let reviews = listing.reviews;
    return (
      <div className="sl-reviews">
        <div className="sl-first-col">
          <div className="slr-header-row" >
            <span className="slr-reviews-header">{this.handleReviewCount(listing.count_reviews)}</span>
            <div className="slr-header-stars">
              {this.handleStars(listing.average_rating, "slr-header-star")}
            </div>
            <button className="slr-add-review-button" onClick={this.handleAddReviewClick}>Write a review</button>
          </div>
          {this.handleCreateReview()}
          {this.handleReviews()}
        </div>
      </div>
    );
  }
}

export default withRouter(Reviews);
