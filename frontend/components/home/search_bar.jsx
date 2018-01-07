import React from 'react';
import { Link, withRouter } from 'react-router';
import Geosuggest from 'react-geosuggest';
import Calendar from 'react-input-calendar';

class SearchBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          lat: "",
          lng: "",
          check_in: "",
          check_out: "",
          guests: "1 Dog",
          addressError: []
      };
      this.update = this.update.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDestination = this.handleDestination.bind(this);
  }

  update(property) {
    return value => {
      this[property] = value;
    };
  }

  handleDateType(newType, margin) {
    return (e) => {
      e.target.type = newType;
    };
  }

  handleDestination(value) {
    if (value && value.location && value.location.lat) {
      this.setState({
        lat: value.location.lat,
        lng: value.location.lng
      });
    }
  }

  handleSubmit() {
      this.props.router.push({
        pathname: "/search",
        query: {
          lat: this.state.lat,
          lng: this.state.lng,
          check_in: this.check_in,
          check_out: this.check_out,
          guests: this.state.guests
        }
      });
  }

  render() {
    let today = new Date();

    return(
      <div className="home-search-bar">
        <div className="home-input-container">

          <div className="hsb-where-col">
            <span className="hsb-sub-title">Where</span>
            <Geosuggest
              onSuggestSelect={this.handleDestination}
              className="home-search-city"
              placeholder="Destination, city, address"
            />
          </div>

          <div className="hsb-when-col">
            <span className="hsb-sub-title">When</span>
            <div className="hsb-input-row">
              <Calendar
                format='MM/DD/YYYY'
                placeholder="Check In"
                onChange={this.update("check_in")}
                closeOnSelect={true}
                openOnInputFocus={true}
              />

              <img className="home-arrow-icon" src="https://res.cloudinary.com/dsguwnfdw/image/upload/v1478132097/Icons/Arrows-Right-icon_wgfi7w.png"/>

              <Calendar
                format='MM/DD/YYYY'
                placeholder="Check Out"
                onChange={this.update("check_out")}
                closeOnSelect={true}
                openOnInputFocus={true}
              />
            </div>
          </div>
        </div>

        <div className="hsb-guest-row">
          <div className="hsb-guest-col">
            <span className="hsb-sub-title">Dogs</span>
            <select className="home-search-guest" onChange={this.update("guests")}>
              <option value='1'>1 Dog</option>
              <option value='2'>2 Dogs</option>
              <option value='3'>3 Dogs</option>
              <option value='4'>4 Dogs</option>
            </select>
          </div>

          <button
            className="home-search-button"
            onClick={this.handleSubmit}>Search
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchBar);
