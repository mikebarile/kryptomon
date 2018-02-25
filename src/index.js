import React from 'react';
import ReactDOM from 'react-dom';
import web3 from './web3';

import KryptomonKore from './KryptomonKore';
import registerServiceWorker from './registerServiceWorker';
import Root from './templates/root.js';
import './css/index.css';

document.addEventListener('DOMContentLoaded', () => {
  window.KryptomonKore = KryptomonKore;
  window.web3 = web3;

  window.callMethod = method => method().call().then(console.log);

  ReactDOM.render(<Root />, document.getElementById('root'));
  registerServiceWorker();
});
