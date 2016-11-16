import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';
import Note from './Note';

var MyPosts = React.createClass ({
  getInitialState() {
      return {
          notes: ['']
      }
  },
  componentDidMount() {
    var self = this;
    request
     .get('/api/userposts/'+this.props.routeParams.userId)
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         console.log('Oh no! error', err);
       } else {
         self.setState({notes: res.body.userPosts});
       }
     });
  },
  like (id){
    request
      .post('/api/like/'+id)
      .send({ name: 'Manny', species: 'cat' })
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (err || !res.ok) {
          alert('Oh no! error');
        } else {
          alert('Liked Post');
        }
      });
  },
  eachNote(note) {
      return (<Note key={note.postId}
                    id={note.postId}
                    post={note}
                    onRemove={this.remove}
                    onLike={this.like}>
                {note.postPic}
              </Note>)
  },
  render(){
    return (
      <div>
      <Link to={`/explore/${this.props.routeParams.userId}`}><h2>Explore</h2></Link>
      <Link to={`/user/${this.props.routeParams.userId}`}><h2>My feed</h2></Link>
      <div className="wrapper">
      <div className="columns">
      <div className='board'>
             {this.state.notes.map(this.eachNote)}
          </div>
          </div>
          </div>
    </div>
    )
  }
})

export default MyPosts;
