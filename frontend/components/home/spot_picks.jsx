import React from 'react';
import { Link, hashHistory } from 'react-router';

class SpotPicks extends React.Component {
  constructor(props) {
      super(props);
  }

  handleClick (url) {
    return (e) => {
      e.preventDefault();
      hashHistory.push(url);
    };
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
    let picks = this.props.topPicks;

    if(picks === undefined || picks.length === 0){
      return <div></div>;
    }

    let first = picks[0];
    let second = picks[1];
    let third = picks[2];

    return(
      <div className="home-spot-picks">
        <h1 className="home-main-header">Explore Hairbnb Picks</h1>

        <div className="home-picks-index">
          <div className="home-pick-index-item" onClick={this.handleClick(`/listings/${first.id}`)}>
            <img className="home-pick-img" src={first.image_url}/>
            <div className="home-pick-description">
              <span className="home-pick-price">${first.price}</span>
              <span className="home-pick-title">{first.title}</span>
            </div>
            <div className="home-pick-reviews">
              {this.handleStars(first.average_rating, "home-pick-star")}
              <span className="home-pick-num-reviews">{this.handleReviewCount(first.count_reviews)}</span>
            </div>
          </div>

          <div className="home-pick-index-item" onClick={this.handleClick(`/listings/${second.id}`)}>
            <img className="home-pick-img" src={second.image_url}/>
            <div className="home-pick-description">
              <span className="home-pick-price">${second.price}</span>
              <span className="home-pick-title">{second.title}</span>
            </div>
            <div className="home-pick-reviews">
              {this.handleStars(second.average_rating, "home-pick-star")}
              <span className="home-pick-num-reviews">{this.handleReviewCount(second.count_reviews)}</span>
            </div>
          </div>

          <div className="home-pick-index-item" onClick={this.handleClick(`/listings/${third.id}`)}>
            <img className="home-pick-img" src={third.image_url}/>
            <div className="home-pick-description">
              <span className="home-pick-price">${third.price}</span>
              <span className="home-pick-title">{third.title}</span>
            </div>
            <div className="home-pick-reviews">
              {this.handleStars(third.average_rating, "home-pick-star")}
              <span className="home-pick-num-reviews">{this.handleReviewCount(third.count_reviews)}</span>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default SpotPicks;
