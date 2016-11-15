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
      tags: ['']
  };
    this.handleId = this.handleId.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
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
    var userTags=this.state.tags;
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
        Interest:
        <input type="text" value={this.state.tags} onChange={this.handleTags} />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Signup;
