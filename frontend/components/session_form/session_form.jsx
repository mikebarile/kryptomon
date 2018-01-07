import React from 'react';
import { Link } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setState = this.setState.bind(this);
    this.redirectIfLoggedIn = this.redirectIfLoggedIn.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleGuestSubmit = this.handleGuestSubmit.bind(this);
  }

  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.router.push("/");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.processForm({user});
  }

  handleSwitch(e) {
    e.preventDefault();
    this.props.switch();
    this.props.hideLoginModal();
  }

  update(property) {
    return e => this.setState({
      [property]: e.target.value
    });
  }

  handleGuestSubmit(e) {
    e.preventDefault();
    this.props.processForm({user: {email: "mikebarile13@gmail.com", password: "password"}});
  }

  render() {
    return(
      <div className="session-form">
        <br/>
        <br/>

        <ul className="errors-list">
          {this.props.errors.map((error, idx) =>
            <li className="error" key={idx}>{error}</li>)}
        </ul>

        <input
          onChange={this.update("email")}
          className="form-input email-row"
          type="text"
          placeholder="Email"/>
        <br/>

        <input
          onChange={this.update("password")}
          className="form-input password-row"
          type="password"
          placeholder="Password"/>
        <br/>

        <button
          className="submit-button"
          onClick={this.handleSubmit}>Log in
        </button>

        <button
          className="guest-login"
          onClick={this.handleGuestSubmit}>Guest log in
        </button>

        <div className="form-bottom">
          <p className="form-bottom-text">Don't have an account?</p>
          <button
            className="other-form-button"
            onClick={this.handleSwitch}
            >Signup</button>
        </div>

      </div>
    );
  }
}

export default SessionForm;
