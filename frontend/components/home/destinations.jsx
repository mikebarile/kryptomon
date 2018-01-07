import React from 'react';
import { Link, withRouter } from 'react-router';

class Destinations extends React.Component {
  constructor(props) {
      super(props);
      this.pushDestination = this.pushDestination.bind(this);
  }

  pushDestination (url) {
    return (e) => {
      e.preventDefault();
      this.props.router.push(url);
    };
  }

  render() {
    return(
      <div className="home-destinations">
        <h1 className="home-main-header">Explore the World</h1>

        <div className="home-destinations-row">
          <div className="home-destination-big london" onClick={this.pushDestination('/search?lat=51.5074&lng=-0.1278')}>
            <span className="home-destination-text">London</span>
          </div>

          <div className="home-destination-sub-row">
            <div className="home-destination-small los-angeles" onClick={this.pushDestination('/search?lat=34.0522&lng=-118.2437')}>
              <span className="home-destination-text">Los Angeles</span>
            </div>
            <div className="home-destination-small tokyo" onClick={this.pushDestination('/search?lat=35.6895&lng=139.6917')}>
              <span className="home-destination-text">Tokyo</span>
            </div>
          </div>

          <div className="home-destination-sub-row">
            <div className="home-destination-small washington-dc" onClick={this.pushDestination('/search?lat=38.9072&lng=-77.0369')}>
              <span className="home-destination-text">Washington DC</span>
            </div>
            <div className="home-destination-small honolulu" onClick={this.pushDestination('/search?lat=21.3069&lng=-157.8583')}>
              <span className="home-destination-text">Honolulu</span>
            </div>
          </div>
        </div>

        <div className="home-destinations-row">
          <div className="home-destination-sub-row">
            <div className="home-destination-small paris" onClick={this.pushDestination('/search?lat=48.8566&lng=2.3522')}>
              <span className="home-destination-text">Paris</span>
            </div>
            <div className="home-destination-small berlin" onClick={this.pushDestination('/search?lat=52.5200&lng=13.4050')}>
              <span className="home-destination-text">Berlin</span>
            </div>
          </div>

          <div className="home-destination-big san-francisco" onClick={this.pushDestination('/search?lat=37.7749&lng=-122.4194')}>
            <span className="home-destination-text">San Francisco</span>
          </div>

          <div className="home-destination-sub-row">
            <div className="home-destination-small cairo" onClick={this.pushDestination('/search?lat=30.0444&lng=31.2357')}>
              <span className="home-destination-text">Cairo</span>
            </div>
            <div className="home-destination-small new-york" onClick={this.pushDestination('/search?lat=40.7128&lng=-74.0059')}>
              <span className="home-destination-text">New York</span>
            </div>
          </div>
        </div>

      </div>

    );
  }
}

export default withRouter(Destinations);
