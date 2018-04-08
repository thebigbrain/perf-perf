// import './all.scss';

import React = require('react');
import ReactDOM from '../../packages/platform/react-dom';

import Clock from './clock';

ReactDOM.render(
  React.createElement(Clock),
  document.getElementById('app')
);
