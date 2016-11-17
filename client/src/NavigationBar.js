import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';

var NavigationBar = React.createClass({
  checkactive(pagename){
    console.log('pagename passed ',pagename);
    console.log('activepagename', this.props.activepagename)
    console.log('result ',this.props.activepagename == pagename)
    if(this.props.activepagename == pagename){
      return "active"
    }
    return "no"
  },
  render(){
    console.log('Starting render navbar');
    console.log('With home ',this.checkactive("Home"));
    var username = "My Profile";
    if (this.props.username) {username = this.props.username;}
    return (
      <ul>
        <li><a className={"crows-brand "+this.checkactive("Explore")} href={this.props.explorelink}>W E B C R O W S</a></li>
        <li><a className={this.checkactive("Home")} href={this.props.myfeedlink}>Feed</a></li>
        <li className= "showright"><a className="active" href={this.props.addcontentlink}>
          <i className="fa fa-plus crows-add-fa"></i></a>
        </li>
        <li className="showright user-li"><a className={this.checkactive("MyPost")} href={this.props.mypostslink}>{username}</a></li>
        <li className="showright user-li"><a href={'/'}>Logout</a></li>
      </ul>
    )
  }
})

export default NavigationBar
