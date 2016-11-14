/* eslint no-unused-vars: "off" */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import Board from './Board'
import MainLayout from './MainLayout'

render((
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={Board}/>
    </Route>
  </Router>
), document.getElementById('react-container'))
