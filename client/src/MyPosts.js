import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';
import NoteEdit from './NoteEdit';
import NavigationBar from './NavigationBar'

var MyPosts = React.createClass ({
  getInitialState() {
      return {
          notes: ['']
      }
  },
  delete(id){
    var self = this;
    request
     .get('/api/delete/'+id)
     .set('Accept', 'application/json')
     .end(function(err, res) {
       console.log('After API call')
       if (err || !res.ok) {
         console.log('Oh no! error', err);
       } else {
         alert('Post Deleted');
       }
     });
     var notes = this.state.notes.filter(note => note.postId !== id)
     this.setState({notes})
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
  eachNote(note) {
      return (<NoteEdit key={note.postId}
                    id={note.postId}
                    post={note}
                    onDelete={this.delete}
                    userId={this.props.routeParams.userId}>
                {note.postPic}
              </NoteEdit>)
  },
  render(){
    var myfeedlink = "/user/"+this.props.routeParams.userId
    var mypostslink = "/myposts/"+this.props.routeParams.userId
    var explorelink = "/explore/"+this.props.routeParams.userId
    var addcontentlink = "/add/"+this.props.routeParams.userId
    return (
      <div>
      <NavigationBar
          explorelink={explorelink}
          myfeedlink={myfeedlink}
          mypostslink={mypostslink}
          addcontentlink={addcontentlink} />
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
