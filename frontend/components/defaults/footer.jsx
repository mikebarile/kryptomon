import React from 'react';
import { Link } from 'react-router';

const Footer = (props) => {

  return (
    <div className="footer">
      <span className="footer-text-container">
        <a className="footer-text" href="https://www.linkedin.com/in/mikebarile">Company</a>
        <a className="footer-text" href="https://github.com/mikebarile/HairBNB">About</a>
        <a className="footer-text" href="https://www.mikebarile.com">Discover</a>
        <a className="footer-text" href="https://hairbnb13.herokuapp.com/">Hosting</a>
      </span>
    </div>
  );
};

export default Footer;
