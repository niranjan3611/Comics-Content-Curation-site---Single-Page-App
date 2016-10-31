/* eslint no-unused-vars: "off" */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import Root from './Root'
import Foo from './Foo'
import MainLayout from './MainLayout'
import './index.css'

// see https://github.com/ReactTraining/react-router
render((
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={Root}/>
      <Route path="/foo" component={Foo}/>
    </Route>
  </Router>
), document.getElementById('root'))
