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
        <br />
      <img src = {this.state.pin.postPic} />
      <p><b>Title: </b>{this.state.pin.postTitle}</p>
      <p><b>Detail: </b>{this.state.pin.postDetail}</p>
      <p><b>Uploader: </b>{this.state.pin.postUser}</p>
      <p><b>Tag: </b>{this.state.pin.postTag}</p>
      <p><b>URL: </b>{this.state.pin.postURL}</p>
      </div>
    )
  }
})

export default PinDetails;
