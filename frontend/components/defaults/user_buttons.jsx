import React from 'react';
import { Link } from 'react-router';
import { withRouter } from 'react-router';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import Modal from 'boron/FadeModal';
import SignupForm from '../user_form/user_form_container';
import LoginForm from '../session_form/session_form_container';

class UserButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {switch: false};
    this.showSignupModal = this.showSignupModal.bind(this);
    this.hideSignupModal = this.hideSignupModal.bind(this);
    this.showLoginModal = this.showLoginModal.bind(this);
    this.hideLoginModal = this.hideLoginModal.bind(this);
    this.logout = this.logout.bind(this);
    this.callback = this.callback.bind(this);
    this.switchToLogin = this.switchToLogin.bind(this);
    this.switchToSignup = this.switchToSignup.bind(this);
    this.setSwitch = this.setSwitch.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  showSignupModal() {
    this.refs.signupModal.show();
  }

  hideSignupModal() {
    this.refs.signupModal.hide();
  }

  showLoginModal() {
    this.refs.loginModal.show();
  }

  hideLoginModal() {
    this.refs.loginModal.hide();
  }

  callback(e) {

  }

  logout() {
    this.props.logout();
  }

  switchToLogin() {
    if (this.state.switch === true){
      this.setState({switch: false});
      this.showLoginModal();
    }
    this.props.clearErrors();
  }

  switchToSignup() {
    if (this.state.switch === true){
      this.setState({switch: false});
      this.showSignupModal();
    }
    this.props.clearErrors();
  }

  setSwitch() {
    this.setState({switch: true});
  }

  openDropdown() {
    this.refs.userDropdown.show();
  }

  closeDropdown() {
    this.refs.userDropdown.hide();
  }

  render() {
    let currentUser = this.props.currentUser;
    if (currentUser === null) {
      return (
        <div className="user-buttons">
          <div className="become-a-host">
            <Link to="/become-a-host" className="become-a-host-link">Become a Host</Link>
          </div>

          <button className="user-button-new" onClick={this.showSignupModal}>Signup</button>
          <Modal
            className="user-modal"
            ref="signupModal"
            keyboard={true}
            onHide={this.switchToLogin}>
            <SignupForm hideSignupModal={this.hideSignupModal} switch={this.setSwitch}/>
          </Modal>

          <button className="user-button-new" onClick={this.showLoginModal}>Login</button>
          <Modal
            lassName="user-modal"
            ref="loginModal"
            keyboard={true}
            onHide={this.switchToSignup}>
            <LoginForm hideLoginModal={this.hideLoginModal} switch={this.setSwitch}/>
          </Modal>

        </div>
      );
    }
    else if (currentUser && currentUser.is_host === false) {
      return (
        <div className="user-buttons">
          <div className="become-a-host">
            <Link to="/become-a-host" className="become-a-host-link">Become a Host</Link>
          </div>
          <Link className="user-button user-button-trips" to="/my-trips">Trips</Link>
          <Dropdown ref="userDropdown">
            <div onMouseEnter={this.openDropdown} onMouseLeave={this.closeDropdown}>
              <button className="user-button-logout" to="/">
                <span className="top-bar-user-name">{currentUser.first_name}</span>
                <img src={currentUser.image_url} className="top-bar-user-image"/>
              </button>
            </div>
            <DropdownContent onMouseEnter={this.openDropdown} onMouseLeave={this.closeDropdown}>
              <Link to="/" className="top-bar-dropdown-element tbd-one">Edit profile (coming soon)</Link>
              <span className="tbd-border"></span>
              <span className="top-bar-dropdown-element tbd-two" onClick={this.props.logout}>Log out</span>
            </DropdownContent>
          </Dropdown>
        </div>
      );
    }
    else {
      return (
        <div className="user-buttons">
          <div className="add-a-listing">
            <Link to="/become-a-host" className="become-a-host-link">Add a listing</Link>
          </div>
          <Link className="user-button user-button-host" to="/my-listings">Host</Link>
          <Link className="user-button user-button-trips" to="/my-trips">Trips</Link>
          <Dropdown ref="userDropdown">
            <div onMouseEnter={this.openDropdown} onMouseLeave={this.closeDropdown}>
              <button className="user-button-logout" to="/">
                <span className="top-bar-user-name">{currentUser.first_name}</span>
                <img src={currentUser.image_url} className="top-bar-user-image"/>
              </button>
            </div>
            <DropdownContent onMouseEnter={this.openDropdown} onMouseLeave={this.closeDropdown}>
              <Link to="/" className="top-bar-dropdown-element tbd-one">Edit profile (coming soon)</Link>
              <span className="tbd-border"></span>
              <span className="top-bar-dropdown-element tbd-two" onClick={this.props.logout}>Log out</span>
            </DropdownContent>
          </Dropdown>
        </div>
      );
    }
  }
}

export default withRouter(UserButtons);
