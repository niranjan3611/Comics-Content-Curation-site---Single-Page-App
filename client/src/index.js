/* eslint no-unused-vars: "off" */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import Login from './Login'
import Board from './Board'
import MainLayout from './MainLayout'
import PinDetails from './PinDetails'
import UserPage from './UserPage'

render((
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={Login}/>
      <Route path="/explore" component={Board}/>
      <Route path="pins/:postId" component={PinDetails}/>
      <Route path="/user/:userId" component={UserPage}/>
    </Route>
  </Router>
), document.getElementById('react-container'))
