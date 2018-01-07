import React from 'react';
import { Link } from 'react-router';
import { withRouter } from 'react-router';
import Calendar from 'react-input-calendar';

class BookListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.myTrips.length > this.props.myTrips.length) {
      this.props.clearBookingErrors();
      this.setState({});
      this.props.router.push('/my-trips');
    }
    else if (newProps.errors !== undefined && newProps.errors.length > 0) {
      this.setState({errors: newProps.errors});
    }
  }

  update(field) {
    return value => {
      this[field] = value;
    };
  }

  handleSubmit(e) {

    if (this.props.currentUser === null || this.props.currentUser.id === null) {
      return(this.setState({errors: ["Please log in before making a booking"]}));
    }

    let guest_id = this.props.currentUser.id;
    let host_id = this.props.currentListing.host_id;

    if (guest_id === host_id) {
      this.setState({errors: ["You can't book your own listing!"]});
    }
    else if (this.check_in === undefined || this.check_out === undefined ||
      this.check_in === null || this.check_out === null){
        this.setState({errors: ["Please complete all fields"]});
      }
    else if (new Date(this.check_in) < new Date()
    || new Date(this.check_out) <= new Date(this.check_in)) {
      this.setState({errors: ["Invalid date range"]});
    }
    else {
      this.props.createBooking({
        check_in: this.check_in,
        check_out: this.check_out,
        guest_id,
        host_id,
        listing_id: this.props.currentListing.id,
        message: "default",
        status: "pending",
      });
    }
  }

  render() {

    let listing = this.props.currentListing;
    let today = new Date();

    return (
      <div className="sl-book-listing">
        <div className="slb-row">

          <div className="slb-col slb-col-first">
            <span className="slb-col-title">Check In</span>
            <Calendar
              format='MM/DD/YYYY'
              placeholder="mm/dd/yyyy"
              onChange={this.update("check_in")}
              computableFormat='YYYY/MM/DD'
              closeOnSelect={true}
              openOnInputFocus={true}
            />
          </div>

          <div className="slb-col">
            <span className="slb-col-title">Check Out</span>
            <Calendar
              format='MM/DD/YYYY'
              placeholder="mm/dd/yyyy"
              onChange={this.update("check_out")}
              computableFormat='YYYY/MM/DD'
              closeOnSelect={true}
              openOnInputFocus={true}
            />
          </div>

          <div className="slb-col slb-col-last">
            <span className="slb-col-title">Dogs</span>
            <select className="slb-col-guests">
              <option defaultValue>1</option>
              <option >2</option>
              <option >3</option>
              <option >4</option>
            </select>
          </div>
        </div>

        <ul className="slb-errors">
          {this.state.errors.map((error, idx) => (
            <span key={idx} className="slb-error">{error}</span>
          ))}
        </ul>

        <span className="slb-book" onClick={this.handleSubmit}>Book</span>

        <span className="slb-disclaimer">Your credit card won't be charged ever</span>
      </div>
    );
  }
}

export default withRouter(BookListing);
