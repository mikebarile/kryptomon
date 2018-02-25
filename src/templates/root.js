/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.css';

import Home from './pages/Home';
import EggStore from './pages/EggStore';
import TestBed from './pages/TestBed';

const Root = () => (
  <HashRouter onUpdate={() => window.scrollTo(0, 0)}>
    <div>
      <Route path="/" exact component={Home} />
      {/* Below should require log in!! */}
      <Route path="/store" component={EggStore} />
      <Route path="/testbed" component={TestBed} />
    </div>
  </HashRouter>
);

export default Root;
