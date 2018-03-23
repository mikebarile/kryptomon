/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.css';

import ScrollToTop from 'misc/ScrollToTop';
import Home from 'pages/Home';
import EggStore from 'pages/EggStore';
import TestBed from 'pages/TestBed';
import MetaMask from 'pages/MetaMask';
import NotFound from 'pages/NotFound';
import MyKryptomon from 'pages/MyKryptomon';
import ViewGenZeroEgg from 'pages/ViewGenZeroEgg';
import ViewKryptomon from 'pages/ViewKryptomon';
import Bestiary from 'pages/Bestiary';

// TODO: Remove when we get a real getting started page
import GettingStarted from 'misc/GettingStarted';

import ROUTES from 'constants/Routes';

const Root = () => (
  <HashRouter>
    <ScrollToTop>
      <Switch>
        <Route path={ROUTES.HOME} exact component={Home} />
        <Route path={ROUTES.METAMASK} component={MetaMask} />
        <Route path={ROUTES.BESTIARY} component={Bestiary} />
        <Route path={ROUTES.FAQ} component={GettingStarted} />
        {/* Below should require log in!! */}
        <Route path={ROUTES.EGG_STORE} component={EggStore} />
        <Route path={ROUTES.MY_KRYPTOMON} component={MyKryptomon} />
        <Route
          exact
          path={ROUTES.VIEW_GEN_ZERO_EGG}
          component={ViewGenZeroEgg}
        />
        {/* <Route
          path={ROUTES.VIEW_EGG + '/:eggId'}
          component={ViewEgg}
        /> */}
        <Route
          path={ROUTES.VIEW_KRYPTOMON + '/:kryptomonId'}
          component={ViewKryptomon}
        />
        <Route path={ROUTES.TEST_BED} component={TestBed} />
        <Route component={NotFound} />
      </Switch>
    </ScrollToTop>
  </HashRouter>
);

export default Root;
