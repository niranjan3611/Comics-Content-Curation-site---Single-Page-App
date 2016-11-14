import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';

var PinDetails = React.createClass({
  getInitialState() {
      return {
          pin: ['']
      }
  },
  componentDidMount() {
    var self = this;
    request
     .get('/api/pins/display/'+this.props.routeParams.postId)
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         console.log('Oh no! error', err);
       } else {
         self.setState({pin: res.body});
       }
     });
  },
  render() {
    return (
      <div>
      <p>Title: <b>{this.state.pin.postTitle}</b></p>
      <p>Detail: <b>{this.state.pin.postDetail}</b></p>
      <p>Uploader: <b>{this.state.pin.postUser}</b></p>
      <p>Tag: <b>{this.state.pin.postTag}</b></p>
      </div>
    )
  }
})

export default PinDetails;
