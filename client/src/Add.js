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
      title:'',
      detail: '',
      selectedoption:'weburl'
  };
    this.handleURL = this.handleURL.bind(this);
    this.handleTag = this.handleTag.bind(this);
    this.handleDetail = this.handleDetail.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
      this.handleAddSubmitimageurl = this.handleAddSubmitimageurl.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);

    this.handleTitle = this.handleTitle.bind(this);
  }

  handleOptionChange (changeEvent) {
  //  console.log(changeEvent.target.value);
 this.setState({ selectedoption: changeEvent.target.value });
}

  handleURL(event) {
    this.setState({url: event.target.value});
  }

  handleTag(event) {
    this.setState({tag: event.target.value});
  }
handleTitle(event){
  this.setState({title:event.target.value});
}
  handleDetail(event) {
    this.setState({detail: event.target.value});
  }
handleAddSubmitimageurl(event){
  var self = this;
  var url=this.state.url;
  var tag=this.state.tag;
  var postdetail = this.state.detail;
  var urlFinalUrl = url.substring(0,24) + "printable/" + url.substring(24);
  var posttitle = this.state.title;
  var postpic = this.state.url;
  var posturl = "" ;
  var posttag = tag;
  var postuser = this.props.routeParams.userId;
  console.log(this.state.url+"  "+this.state.title +"  "+this.state.tag+ "  "+ this.state.detail);
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
                      self.setState({tag: ''});
                      self.setState({url: ''});
                      self.setState({detail: ''});
                      self.setState({title: ''});
                      self.setState({selectedoption:'weburl'});
                      //console.log("\n" + this.state.url+"  "+this.state.title +"  "+this.state.tag+ "  "+ this.state.detail);
                    }

                    else {
                       alert('insertion failed ');
                    }
                  }
                });



  event.preventDefault();

}

  handleAddSubmit(event) {
    var self = this;
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
                        self.setState({tag: ''});
                        self.setState({url: ''});
                        self.setState({detail: ''});
                      //  console.log("\n" + this.state.url+"  "+this.state.tag+ "  "+ this.state.detail);
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
  //  console.log(this.state.selectedoption);
    return (
      <div>
      <NavigationBar
          explorelink={explorelink}
          myfeedlink={myfeedlink}
          mypostslink={mypostslink}
          addcontentlink={addcontentlink} />
      <br />
      <p>Please use URLs from http://www.gocomics.com/explore/comics. Call Ambuj in case of queries</p>


      <form className="chooseinput" action="">
        <input type="radio" name="weburl" checked={this.state.selectedoption==='weburl'} value="weburl" onChange={this.handleOptionChange} /> Add from Website URL
        <input type="radio" name="imageurl" checked={this.state.selectedoption==='imageurl'} value="imageurl" onChange={this.handleOptionChange} /> Add direct Image

      </form>
    { this.state.selectedoption ==="weburl" ?
      <span className="WebUrl">
      <form onSubmit={this.handleAddSubmit}>
        <br />
        Enter the Web URL:
        &nbsp; <input type="text" value={this.state.url} onChange={this.handleURL} />
        <br />
        Enter the tags:
        &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; <input type="text" value={this.state.tag} onChange={this.handleTag} />
        <br />
        Enter details:
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;  &nbsp; <input type="text" value={this.state.detail} onChange={this.handleDetail} />
        <br /><br />
        <input type="submit" className =" btn btn-info" value="Submit" />&nbsp;
        <input type="button" className =" btn btn-info" value="Clear" onClick={this.handleClear} />
      </form>
      </span>
:
      <span className="ImageUrl">
      <form onSubmit={this.handleAddSubmitimageurl}>
        <br />
        Select the Image URL:
        &nbsp; <input type="text" value={this.state.url} onChange={this.handleURL} />
        <br />
        Enter the tags:
        &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp;<input type="text" value={this.state.tag} onChange={this.handleTag} />
        <br />
        Enter Title:
        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;  &nbsp;  &nbsp;&nbsp; &nbsp; <input type="text" value={this.state.title} onChange={this.handleTitle} />
        <br />
        Enter details:
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;  &nbsp;  &nbsp;&nbsp; &nbsp; <input type="text" value={this.state.detail} onChange={this.handleDetail} />
        <br /><br />
        <input type="submit" className =" btn btn-info" value="Submit" />&nbsp;
        <input type="button" className =" btn btn-info" value="Clear" onClick={this.handleClear} />
      </form>
      </span>

    }
    </div>
    );
  }
}

export default Add;
