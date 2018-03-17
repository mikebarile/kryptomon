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
import ViewEgg from 'pages/ViewEgg';
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
          render={(props) => <ViewEgg genZero {...props} />}
        />
        <Route
          path={ROUTES.VIEW_EGG + '/:egg_id'}
          render={(props) => <ViewEgg genZero={false} {...props} />}
        />
        <Route
          path={ROUTES.VIEW_KRYPTOMON + '/:kryptomon_id'}
          component={ViewKryptomon}
        />
        <Route path={ROUTES.TEST_BED} component={TestBed} />
        <Route component={NotFound} />
      </Switch>
    </ScrollToTop>
  </HashRouter>
);

export default Root;
