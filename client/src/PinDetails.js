import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';
import NavigationBar from './NavigationBar'

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
    var myfeedlink = "/user/"+this.props.routeParams.userId
    var mypostslink = "/myposts/"+this.props.routeParams.userId
    var explorelink = "/explore/"+this.props.routeParams.userId
    var addcontentlink = "/add/"+this.props.routeParams.userId
    return (
      <div>
      <NavigationBar
          explorelink={explorelink}
          myfeedlink={myfeedlink}
          mypostslink={mypostslink}
          addcontentlink={addcontentlink} />
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
