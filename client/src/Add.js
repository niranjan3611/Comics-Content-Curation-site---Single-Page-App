import React, { Component } from 'react';
import { Link } from 'react-router';
import request from 'superagent';
import NavigationBar from './NavigationBar'

class Add extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      tag: '',
      detail: ''
  };
    this.handleURL = this.handleURL.bind(this);
    this.handleTag = this.handleTag.bind(this);
    this.handleDetail = this.handleDetail.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleURL(event) {
    this.setState({url: event.target.value});
  }

  handleTag(event) {
    this.setState({tag: event.target.value});
  }

  handleDetail(event) {
    this.setState({detail: event.target.value});
  }

  handleAddSubmit(event) {
    var url=this.state.url;
    var tag=this.state.tag;
    var postdetail = this.state.detail;
    var urlFinalUrl = url.substring(0,24) + "printable/" + url.substring(24);
    var posttitle = '';
    var postpic = '';
    var posturl = "" + url;
    var posttag = tag;
    var postuser = this.props.routeParams.userId;
    request
        .get('https://opengraph.io/api/1.0/site/'+urlFinalUrl)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          if (err || !res.ok) {
            alert('Oh no! error', err);
          } else {
            posttitle = res.body.htmlInferred.title;
            postpic = res.body.htmlInferred.images[1];
            request
              .post('/api/addX')
              .send({ postTitle: posttitle, postDetail: postdetail, postPic: postpic, postURL: posturl, postUser: postuser, postTag: posttag })
              .set('Accept', 'application/json')
              .end(function(err, res) {
                    if (err || !res.ok) {
                      alert('Oh no! error', err);
                    }
                    else
                    {
                      var insertionCheck = res.body.flag;
                      if(insertionCheck==1)
                      {
                        alert('post added !');
                        this.setState({tag: ''});
                        this.setState({url: ''});
                        this.setState({detail: ''});
                      }
                      else {
                         alert('insertion failed ');
                      }
                    }
                  });
            }
        });

    event.preventDefault();
  }

  handleClear(event) {
    this.setState({tag: ''});
    this.setState({url: ''});
    this.setState({detail: ''});
  }

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
      <p>Please use URLs from http://www.gocomics.com/explore/comics. Call Ambuj in case of queries</p>
      <form onSubmit={this.handleAddSubmit}>
        <br />
        Select the URL:
        <input type="text" value={this.state.url} onChange={this.handleURL} />
        <br />
        Enter the tag:
        <input type="text" value={this.state.tag} onChange={this.handleTag} />
        <br />
        Enter details:
        <input type="text" value={this.state.detail} onChange={this.handleDetail} />
        <br />
        <input type="submit" value="Submit" />
        <input type="button" value="Clear" onClick={this.handleClear} />
      </form>
    </div>
    );
  }
}

export default Add;
