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
    render() {
      return (
        <div className="pin">
                <img src = {this.props.children} />
                <p>{this.props.children}</p>
                <span>
                  <button onClick={this.remove}>X</button>
                </span>
            </div>
        )

    }
})

export default Note;
