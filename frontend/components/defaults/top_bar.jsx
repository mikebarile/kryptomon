import React from 'react';
import { Link } from 'react-router';
import { withRouter } from 'react-router';
import SearchBar from './search_bar';
import UserButtons from './user_buttons';

const TopBar = ({router, currentUser, logout, clearErrors}) => {

  const redirectToHome = () => {
    router.push('/');
  };

  return (
    <div className={"top-bar"}>
      <img
        onClick={redirectToHome}
        src="https://res.cloudinary.com/dsguwnfdw/image/upload/v1478131430/logo/hairbnb_b3t3pl.png"
        className={"logo"}
      />

      <SearchBar/>
      <UserButtons currentUser={currentUser} logout={logout} clearErrors={clearErrors}/>
    </div>
  );
};

export default withRouter(TopBar);
