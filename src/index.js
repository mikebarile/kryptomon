import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './templates/App';
import registerServiceWorker from './registerServiceWorker';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
});
