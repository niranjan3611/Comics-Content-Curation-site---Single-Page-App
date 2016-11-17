import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';

var NavigationBar = React.createClass({
  render(){
    return (
      <ul>
        <li><a className="active" href={this.props.myfeedlink}>Home</a></li>
        <li><a href={this.props.explorelink}>Explore</a></li>
        <li><a href={this.props.mypostslink}>My Posts</a></li>
        <li className= "showright"><a className="active" href={this.props.addcontentlink}>+</a></li>
      </ul>
    )
  }
})

export default NavigationBar
