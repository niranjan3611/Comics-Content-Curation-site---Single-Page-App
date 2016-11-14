import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';
import Note from './Note';

var Board = React.createClass({
    getInitialState() {
        return {
            notes: [
              {id: 0, note: './paris.jpg'},
              {id: 1, note: './berlin.jpg'},
              {id: 2, note: './newyork.jpg'},
              {id: 3, note: './rio.jpg'}
            ]
        }
    },
    componentDidMount() {
        var self = this;
        request
         .get('/explore')
         .set('Accept', 'application/json')
         .end(function(err, res) {
           if (err || !res.ok) {
             console.log('Oh no! error', err);
           } else {
             self.setState({notes: res.body.bar});
           }
         });
      },
    remove(id) {
        var notes = this.state.notes.filter(note => note.id !== id)
        this.setState({notes})
    },
    eachNote(note) {
        return (<Note key={note.id}
                      id={note.id}
                      onChange={this.update}
                      onRemove={this.remove}>
                  {note.note}
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
