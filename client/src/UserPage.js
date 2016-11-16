import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';
import Note from './Note';
import NavigationBar from './NavigationBar'


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
              function mycomparator(a,b) {
                  var some1 = []
                  var some2 = []
                  some1.push.apply(some1,a.postLike)
                  some2.push.apply(some2,b.postLike)
                  return parseInt(some2.length, 10) - parseInt(some1.length, 10);
                }
              addnotes.sort(mycomparator);
              self.setState({notes: addnotes});
            });
         });
       }
     });
  },
  remove(id) {
      var notes = this.state.notes.filter(note => note.postId !== id)
      this.setState({notes})
  },
  like (id, likelist){
    if(likelist.includes(this.props.routeParams.userId)){
      alert('You have already liked this')
      console.log('Will return false')
      return false;
    }
    else{
      request
        .post('/api/like/')
        .send({ postId: id, user: this.props.routeParams.userId })
        .set('Accept', 'application/json')
        .end(function(err, res){
          if (err || !res.ok) {
            alert('Oh no! error');
          } else {
            alert('Liked Post');
          }
        });
        console.log('Will return true')
        return true;
    }
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
    console.log(this.state.notes)
    var myfeedlink = "/user/"+this.props.routeParams.userId
    var mypostslink = "/myposts/"+this.props.routeParams.userId
    var explorelink = "/explore/"+this.props.routeParams.userId
    var addcontentlink = "/add/"+this.props.routeParams.userId
    return(
      <div>
      <NavigationBar
          explorelink={explorelink}
          myfeedlink={myfeedlink}
          mypostslink={mypostslink}
          addcontentlink={addcontentlink} />
      <h1>Welcome {this.props.routeParams.userId}. Here is your feed.</h1>
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
