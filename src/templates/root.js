import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import "semantic-ui-css/semantic.css";

import App from './App.js';
import Home from './Home';
import EggStore from './EggStore';

const Root = () => {
  return (
    <HashRouter onUpdate={() => window.scrollTo(0, 0)}>
      <div>
        <Route path="/" exact component={App}/>
        <Route path='/home' component={Home}/>
        {/* Below should require log in!! */}
        <Route path='/store' component={EggStore}/>
      </div>
    </HashRouter>
  );
};

export default Root;
