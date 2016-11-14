/* eslint no-unused-vars: "off" */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import Board from './Board'
import MainLayout from './MainLayout'
import PinDetails from './PinDetails'

render((
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={Board}/>
      <Route path="pins/:pinid" component={PinDetails}/>
    </Route>
  </Router>
), document.getElementById('react-container'))
