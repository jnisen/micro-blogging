import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Firebase from './utils/Firebase'

ReactDOM.render(
  <React.StrictMode>
    <Firebase>
      <Router>
        <App />
      </Router>
    </Firebase>
  </React.StrictMode>,
  document.getElementById('root')
);


