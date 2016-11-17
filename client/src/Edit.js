import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';
import NavigationBar from './NavigationBar'

var Edit = React.createClass({
  getInitialState() {
      return {
          pin: [''],
          title: '',
          detail: '',
          url: '',
          userid: ''
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
         self.setState({title: res.body.postTitle});
         self.setState({detail: res.body.postDetail});
         self.setState({url: res.body.postURL});
         self.setState({userid: res.body.postUser});
       }
     });
  },

  handleTitle(event) {
    this.setState({title: event.target.value});
  },

  handleDetail(event) {
    this.setState({detail: event.target.value});
  },

  handleURL(event) {
    this.setState({url: event.target.value});
  },

  handleEditSubmit(event) {
    var posttitle=this.state.title;
    var postdetail=this.state.detail;
    var posturl=this.state.url;
    var postid=parseInt(this.props.routeParams.postId);
    var self = this;

    console.log('posttitle', posttitle);
    console.log('postdetail', postdetail);
    console.log('posturl', posturl);
    console.log('postid', postid);

    console.log('going to call API');
    request
    .post('/api/editX')
    .send({postId: postid, postTitle: posttitle, postDetail: postdetail, postURL: posturl})
    .set('Accept', 'application/json')
    .end(function(err, pqr) {
      if (err || !pqr.ok) {
        //alert('Oh no! error', err);
        ;
      } else {
        var signUpCheck = pqr.body.flag;
        if(signUpCheck==1)
        {
          alert('post edited');
        }
        else {
           alert('edit failed ');
        }
      }
    });
  },

  render() {
    var myfeedlink = "/user/"+this.state.userid
    var mypostslink = "/myposts/"+this.state.userid
    var explorelink = "/explore/"+this.state.userid
    var addcontentlink = "/add/"+this.state.userid
    return (
      <div className="pin-shell">
      <NavigationBar
          explorelink={explorelink}
          myfeedlink={myfeedlink}
          mypostslink={mypostslink}
          addcontentlink={addcontentlink} />
        <br />
        <img src = {this.state.pin.postPic} />
        <form onSubmit={this.handleEditSubmit}>
          <br />
          Title:
          <input type="text" value={this.state.title} onChange={this.handleTitle} />
          <br />
          Detail:
          <input type="text" value={this.state.detail} onChange={this.handleDetail} />
          <br />
          URL:
          <input type="text" value={this.state.url} onChange={this.handleURL} />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
})

export default Edit;
