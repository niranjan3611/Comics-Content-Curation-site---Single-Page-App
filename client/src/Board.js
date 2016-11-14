import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';
import Note from './Note';

var Board = React.createClass({
    getInitialState() {
        return {
            notes: ['']
        }
    },
    componentDidMount() {
      var self = this;
      request
       .get('/api/explore')
       .set('Accept', 'application/json')
       .end(function(err, res) {
         if (err || !res.ok) {
           console.log('Oh no! error', err);
         } else {
           self.setState({notes: res.body.allposts});
         }
       });
    },
    remove(id) {
        var notes = this.state.notes.filter(note => note.postId !== id)
        this.setState({notes})
    },
    eachNote(note) {
        return (<Note key={note.postId}
                      id={note.postId}
                      onRemove={this.remove}>
                  {note.postTitle}
                </Note>)
    },
    render() {
        return (
            <div className="wrapper">
            <div className="columns">
            <div className='board'>
                   {this.state.notes.map(this.eachNote)}
                </div>
                </div>
                </div>
                )
    }
})

export default Board;
