import React, { Component } from 'react';
import { Link } from 'react-router';
import request from 'superagent';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pass: ''
  };
    this.handleName = this.handleName.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleName(event) {
    this.setState({name: event.target.value});
  }

  handlePass(eventX) {
    this.setState({pass: eventX.target.value});
  }

  handleSubmit(event) {
    var userId=this.state.name;
    var userPass=this.state.pass;
    var self = this;
    request
     .get('/api/loginX/'+userId+'/'+userPass)
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         alert('Oh no! error', err);
       } else {
         var loginCheck = res.body.flag;
         if(loginCheck==1)
         {
           window.location = '/user/'+self.state.name;
         }
         else {
            alert('Invalid credentials ');
         }
       }
     });
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <br />
        Username: <input type="text" value={this.state.name} onChange={this.handleName} /><br />
        Password: <input type="password" value={this.state.pass} onChange={this.handlePass} />
        <br />
        <br />
        <button type="submit" class="btn btn-primary">Log In</button>
        <br />
      </form>
      <br />
      <br />
      <a href="/signup">Sign Up</a>
    </div>
    );
  }
}

export default Login;
