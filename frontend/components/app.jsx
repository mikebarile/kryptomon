import React from 'react';
import { Link } from 'react-router';
import TopBarContainer from './defaults/top_bar_container';
import Footer from './defaults/footer';

const App = ({ children }) => (
  <div>
    <TopBarContainer />
    {children}
    <Footer />
  </div>
);

export default App;
