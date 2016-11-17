import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import Login from './Login'
import Signup from './Signup'
import Board from './Board'
import MainLayout from './MainLayout'
import PinDetails from './PinDetails'
import UserPage from './UserPage'
import MyPosts from './MyPosts'
import Add from './Add'

render((
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/explore/:userId" component={Board}/>
      <Route path="pins/:userId/:postId" component={PinDetails}/>
      <Route path="/user/:userId" component={UserPage}/>
      <Route path="/myposts/:userId" component={MyPosts}/>
      <Route path="/add/:userId" component={Add}/>
    </Route>
  </Router>
), document.getElementById('react-container'))
