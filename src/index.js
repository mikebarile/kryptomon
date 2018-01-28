import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Root from './templates/root.js';
import registerServiceWorker from './registerServiceWorker';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root />, document.getElementById('root'));
  registerServiceWorker();
});
