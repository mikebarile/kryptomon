import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';
import "semantic-ui-css/semantic.css";

import App from './App.js';
import Home from './Home';

const Root = () => {
  return (
    <HashRouter onUpdate={() => window.scrollTo(0, 0)}>
      <div>
        <Route path="/" exact component={App}/>
        <Route path='/home' component={Home}/>
      </div>
    </HashRouter>
  );
};

export default Root;
