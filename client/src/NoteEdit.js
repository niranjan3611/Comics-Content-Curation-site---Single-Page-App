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
    edit(){
        window.location = "/edit/"+this.props.id
    },
    render() {
      var tags = []
      tags.push.apply(tags,this.props.post.postTag)
      return (
        <div className="pin">
                <Link to={`/pins/${this.props.userId}/${this.props.id}`}>
                <img src = {this.props.children} />
                </Link>
                <p>{this.props.post.postTitle}</p>
                {tags.map((tag) =>
                  <i>#{tag} </i>
                )}
                <p> Likes: {this.props.post.postLikenum}</p>
                <span>
                  <button className="btn btn-default" onClick={this.edit}><i className="fa fa-pencil crows-edit"></i> Edit</button>
                  <button className="showright btn btn-danger" onClick={this.delete}><i className="fa fa-times crows-delete"></i> Delete</button>
                </span>
            </div>
        )
    }
})

export default NoteEdit;
