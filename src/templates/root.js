/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.css';

import Home from 'pages/Home';
import EggStore from 'pages/EggStore';
import TestBed from 'pages/TestBed';
import MetaMask from 'pages/MetaMask';
import NotFound from 'pages/NotFound';
import MyKryptomon from 'pages/MyKryptomon';
import ViewEgg from 'pages/ViewEgg';

import ROUTES from 'constants/Routes';

const Root = () => (
  <HashRouter onUpdate={() => window.scrollTo(0, 0)}>
    <Switch>
      <Route path={ROUTES.HOME} exact component={Home} />
      <Route path={ROUTES.METAMASK} component={MetaMask} />
      {/* Below should require log in!! */}
      <Route path={ROUTES.EGG_STORE} component={EggStore} />
      <Route path={ROUTES.MY_KRYPTOMON} component={MyKryptomon} />
      <Route
        path={ROUTES.VIEW_EGG}
        render={(props) => <ViewEgg genZero={false} {...props} />}
      />
      <Route
        path={ROUTES.VIEW_GEN_ZERO_EGG}
        render={(props) => <ViewEgg genZero {...props} />}
      />
      <Route path={ROUTES.TEST_BED} component={TestBed} />
      <Route component={NotFound} />
    </Switch>
  </HashRouter>
);

export default Root;
