import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';
import Note from './Note';


var UserPage = React.createClass({
  getInitialState() { 
      return {
          notes: ['']
      }
  },
  componentDidMount() {
    var self = this;
    var tags = []
    request
     .get('/api/userpage/'+this.props.routeParams.userId)
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         console.log('Oh no! error', err);
       }
       else {
         tags = res.body.userTags;
       }
       if(tags.length){
         console.log('Going to print tags')
         var addnotes = []
         tags.forEach((tag) => {
           console.log(tag)
           request
            .get('/api/tagsearch/'+tag)
            .set('Accept', 'application/json')
            .end(function(err, res) {
              if (err || !res.ok) {
                console.log('Oh no! error', err);
              }
              else {
                addnotes.push.apply(addnotes, res.body.tagPosts)
              }
              self.setState({notes: addnotes});
            });
         });
       }
     });
  },
  eachNote(note) {
      return (<Note key={note.postId}
                    id={note.postId}
                    title={note.postTitle}
                    onRemove={this.remove}>
                {note.postPic}
              </Note>)
  },
  render(){
    console.log(this.state.notes)
    return(
      <div>
      <h1>Welcome {this.props.routeParams.userId}. Here is your feed.</h1>
      <a href="/explore"><h2>Explore</h2></a>
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

export default UserPage;
