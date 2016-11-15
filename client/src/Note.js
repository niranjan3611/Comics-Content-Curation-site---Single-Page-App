import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';

var Note = React.createClass({
    getInitialState() {
        return {editing: false}
    },
    remove() {
        this.props.onRemove(this.props.id)
    },
    like(){
      this.props.onLike(this.props.id)
    },
    render() {
      return (
        <div className="pin">
                <Link to={`/pins/${this.props.id}`}>
                <img src = {this.props.children} />
                </Link>
                <p>{this.props.post.postTitle}</p>
                <p>{this.props.post.postTag}</p>
                <p> Likes: {this.props.post.postLike}</p>
                <span>
                  <button onClick={this.like}>Like</button>
                  <button onClick={this.remove}>X</button>
                </span>
            </div>
        )
    }
})

export default Note;
