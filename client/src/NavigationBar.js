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
    return (
      <ul>
        <li><a className={this.checkactive("Home")} href={this.props.myfeedlink}>Home</a></li>
        <li><a className={this.checkactive("Explore")} href={this.props.explorelink}>Explore</a></li>
        <li><a className={this.checkactive("MyPost")} href={this.props.mypostslink}>My Posts</a></li>
        <li className= "showright"><a className="active" href={this.props.addcontentlink}>+</a></li>
      </ul>
    )
  }
})

export default NavigationBar
