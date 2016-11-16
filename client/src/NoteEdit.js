import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';

var NoteEdit = React.createClass({
    getInitialState() {
        return {editing: false}
    },
    delete() {
        this.props.onDelete(this.props.id)
    },
    like(){
      this.props.onLike(this.props.id)
    },
    render() {
      var tags = []
      tags.push.apply(tags,this.props.post.postTag)
      return (
        <div className="pin">
                <Link to={`/pins/${this.props.id}`}>
                <img src = {this.props.children} />
                </Link>
                <p>{this.props.post.postTitle}</p>
                {tags.map((tag) =>
                  <i>#{tag} </i>
                )}
                <p> Likes: {this.props.post.postLike}</p>
                <span>
                  <button onClick={this.delete}>Delete</button>
                </span>
            </div>
        )
    }
})

export default NoteEdit;
