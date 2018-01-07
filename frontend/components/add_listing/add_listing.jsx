import React from 'react';
import { Link } from 'react-router';
import { merge } from 'lodash';

class AddListingHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {errors: null};
    this.handleHeader = this.handleHeader.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
    this.generateError = this.generateError.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.updateListingForm({host_id: this.props.currentUser.id});
    }
  }

  componentWillReceiveProps() {
    if (this.props.currentUser) {
      this.setState({errors: null});
    }
  }

  handleButton(step, element) {
    let form = this.props.listingFormState.current_form;
    switch (step) {
      case "start-with-basics":
        if (form === "home" || form === "start-with-basics") {
          return `${element}-next`;
        }
        else {
          return `${element}-previous`;
        }
      case "set-the-scene":
        if (form === "home" || form === "start-with-basics") {
          return `${element}-dead`;
        }
        else if (form === "set-the-scene") {
          return `${element}-next`;
        }
        else {
          return `${element}-previous`;
        }
      case "ready-for-pups":
        if (form === "ready-for-pups") {
          return `${element}-next`;
        }
        else {
          return `${element}-dead`;
        }
      default:
        console.log("Button handler is broken");
        return null;
    }
  }

  handleHeader() {
    let user = this.props.currentUser;
    if (user && user.first_name !== undefined) {
        return(<span>Hi, {user.first_name}! Let's get you ready to become a host.</span>);
    }
    else {
      return (
        <div>
          <span>Become a Hairbnb host</span>
          <br/>
          <span className="bh-subtitle">To get started, please signup or login</span>
        </div>
      );
    }
  }

  errorHandler(e) {
    e.preventDefault();
    let user = this.props.currentUser;
    if (user) {
      this.props.router.push("/become-a-host/basics");
    }
    else {
      this.setState({errors: "Please log in or sign up to get started"});
    }
  }

  generateError() {
    if (this.state.errors === null || this.props.currentUser) {
      return (<div></div>);
    }
    else {
      return (
        <div>
          <br/>
          <span className="alh-error-handler">{this.state.errors}</span>
        </div>
      );
    }
  }

  render() {
    let user = this.props.currentUser;
    return (
      <div className="add-listing-home">
        <div className="alh-first-col">
          <span className="alh-header">{this.handleHeader()}</span>

          <div className="alh-step-container">
            <div className="alh-step-container-description">
              <span className={this.handleButton("start-with-basics", "alh-step-name")}>STEP 1</span>
              <span className={this.handleButton("start-with-basics", "alh-step-title")}>Start with the basics</span>
              <span className={this.handleButton("start-with-basics", "alh-step-description")}>Listing title, description, etc.</span>
              {this.generateError()}
              <button onClick={this.errorHandler} className={this.handleButton("start-with-basics", "alh-step-button")}></button>
            </div>
            <img src="https://res.cloudinary.com/dsguwnfdw/image/upload/v1478474954/Icons/check-mark-in-white-md.png" className={this.handleButton("start-with-basics", "alh-check")}></img>
          </div>

          <div className="alh-step-container">
            <div className="alh-step-container-description">
              <span className={this.handleButton("set-the-scene", "alh-step-name")}>STEP 2</span>
              <span className={this.handleButton("set-the-scene", "alh-step-title")}>Set the scene</span>
              <span className={this.handleButton("set-the-scene", "alh-step-description")}>Amenities and house rules</span>
              <Link to="/become-a-host/scene" className={this.handleButton("set-the-scene", "alh-step-button")}></Link>
            </div>
            <img src="https://res.cloudinary.com/dsguwnfdw/image/upload/v1478474954/Icons/check-mark-in-white-md.png" className={this.handleButton("set-the-scene", "alh-check")}></img>
          </div>

          <div className="alh-step-container">
            <div className="alh-step-container-description">
              <span className={this.handleButton("ready-for-pups", "alh-step-name")}>STEP 3</span>
              <span className={this.handleButton("ready-for-pups", "alh-step-title")}>Get ready for pups</span>
              <span className={this.handleButton("ready-for-pups", "alh-step-description")}>Address information and price</span>
              <Link to="become-a-host/ready" className={this.handleButton("ready-for-pups", "alh-step-button")}></Link>
            </div>
            <img src="https://res.cloudinary.com/dsguwnfdw/image/upload/v1478474954/Icons/check-mark-in-white-md.png" className={this.handleButton("ready-for-pups", "alh-check")}></img>
          </div>

        </div>

        <div className="alh-second-col">
          <div className="alh-img-container">
            <div className="alh-tip-container">
              <img className="alh-tip-icon" src="https://res.cloudinary.com/dsguwnfdw/image/upload/v1478477881/Icons/Screen_Shot_2016-11-06_at_4.17.32_PM.png"/>
              <span className="alh-tip-description">In a week, hosts that shared their homes <br/>with dogs are:</span>
              <span className="alh-tip-quantity">184% happier</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddListingHome;
