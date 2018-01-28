import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';
import App from './app.js';

const Root = () => {
  return (
    <HashRouter onUpdate={() => window.scrollTo(0, 0)}>
      <Route path="/" component={App} />
    </HashRouter>
  );
};

export default Root;
