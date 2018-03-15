// import './all.scss';

import { Component, createElement, ReactElement } from 'react';
import ReactDOM from '../../packages/platform/react-dom';

import Clock from './clock';

ReactDOM.render(
  createElement(Clock),
  document.getElementById('app')
);
