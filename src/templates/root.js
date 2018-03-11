/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.css';

import Home from 'pages/Home';
import EggStore from 'pages/EggStore';
import TestBed from 'pages/TestBed';
import MetaMask from 'pages/MetaMask';
import NotFound from 'pages/NotFound';

import ROUTES from 'constants/Routes';

const Root = () => (
  <HashRouter onUpdate={() => window.scrollTo(0, 0)}>
    <Switch>
      <Route path={ROUTES.HOME} exact component={Home} />
      <Route path={ROUTES.METAMASK} component={MetaMask} />
      {/* Below should require log in!! */}
      <Route path={ROUTES.EGG_STORE} component={EggStore} />
      <Route path={ROUTES.TEST_BED} component={TestBed} />
      <Route component={NotFound} />
    </Switch>
  </HashRouter>
);

export default Root;
