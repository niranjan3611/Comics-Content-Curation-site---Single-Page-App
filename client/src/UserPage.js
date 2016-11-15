import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';
import Note from './Note';


var UserPage = React.createClass({
  getInitialState() {
      return {
          notes: ['']
      }
  },
  componentDidMount() {
    var self = this;
    var tags = ['']
    request
     .get('/api/userpage/'+this.props.routeParams.userId)
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         console.log('Oh no! error', err);
       } else {
         tags = res.body.userTags;
         //self.setState({notes: res.body.allposts});
       }
     });
  },
  render(){
    return(
      <div>
      <h1>Hello</h1>
      </div>
    )
  }
})

export default UserPage;
