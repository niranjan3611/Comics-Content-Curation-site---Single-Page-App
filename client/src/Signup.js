import React, { Component } from 'react';
import { Link } from 'react-router';
import request from 'superagent';

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      email: '',
      pass: '',
      tags: [''],
      selectedtags: ''
  };


    this.handleId = this.handleId.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

componentDidMount() {
  var self = this;
  var tagset = []
  request
   .get('/api/listtags')
   .set('Accept', 'application/json')
   .end(function(err, res) {
     if (err || !res.ok) {
       console.log('Oh no! error', err);
     }
     else {
       tagset = res.body.alltags;
       self.setState({tags: tagset})
     }

   });

}

handleOptionChange(event){
  var tagsselect = event.target.value
//  console.log('start - selectedtags ',this.state.selectedtags)
var temp = this.state.selectedtags
//console.log('temp    '+temp)
if(!temp)
  { temp= temp+tagsselect
  }
  else {
    temp= temp+','+tagsselect
  }
//  console.log(' temp1 '+temp)
this.setState({selectedtags: temp});
//console.log('end - state ' +this.state.selectedtags);
}
  handleId(event) {
    this.setState({id: event.target.value});
  }

  handleName(event) {
    this.setState({name: event.target.value});
  }

  handleEmail(event) {
    this.setState({email: event.target.value});
  }

  handlePass(event) {
    this.setState({pass: event.target.value});
  }

  handleTags(event) {

    this.setState({tags: event.target.value});
  }

  handleSignupSubmit(event) {
    var userId=this.state.id;
    var userName=this.state.name;
    var userEmail=this.state.email;
    var userPass=this.state.pass;
    //console.log('state '+this.state.selectedtags)
    var userTags=this.state.selectedtags;
    var self = this;
    request
     .get('/api/signUpX/'+userId+'/'+userName+'/'+userEmail+'/'+userPass+'/'+userTags)
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         alert('Oh no! error', err);
       } else {
         var signUpCheck = res.body.flag;
         if(signUpCheck==1)
         {
           window.location = '/user/'+self.state.id;
         }
         else {
            alert('Signup failed ');
         }
       }
     });
    event.preventDefault();
  }

  render() {
var tags = this.state.tags
//console.log(this.state.selectedtags);
    return (
      <form onSubmit={this.handleSignupSubmit}>
        <br />
        User Id:
        <input type="text" value={this.state.id} onChange={this.handleId} />
        <br />
        User Name:
        <input type="text" value={this.state.name} onChange={this.handleName} />
        <br />
        User Email:
        <input type="text" value={this.state.email} onChange={this.handleEmail} />
        <br />
        Password:
        <input type="password" value={this.state.pass} onChange={this.handlePass} />
        <br />
         {this.state.tags.map((tag) =>
            <span>
             {tag.tagName}
             <input type="checkbox" name={tag.tagName} value={tag.tagName} onChange={this.handleOptionChange}/>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          )}
<br />
        <input type="submit" className="btn btn-info" value="Submit" />
      </form>
    );
  }
}

export default Signup;
