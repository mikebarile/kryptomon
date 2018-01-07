import App from './app.jsx';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';

const Root = ({ store }) => {
  return (
  <Provider store={store}>
    <Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>
);
};

export default Root;
