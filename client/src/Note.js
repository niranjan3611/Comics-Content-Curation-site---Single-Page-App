import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';

var Note = React.createClass({
    getInitialState() {
        return {likes: this.props.post.postLikenum}
    },
    remove() {
        this.props.onRemove(this.props.id)
    },
    like(){
      var likelist = []
      var self= this
      var appendid = this.props.id.toString();
      request
       .get('/api/pins/display/'+appendid)
       .set('Accept', 'application/json')
       .end(function(err, res) {
         if (err || !res.ok) {
           console.log('Oh no! error', err);
         } else {
           likelist.push.apply(likelist,res.body.postLike)
         }
         var flag = false;
         flag = self.props.onLike(self.props.id, likelist)
         console.log('received ',flag)
         if(flag){
           var num = self.state.likes;
           num++;
           console.log('New no. of likes ',num);
           self.setState({likes: num}, function(){
             console.log('State is now ',self.state.likes)
           });
         }
       })
    },
    addtagstouser(){
      this.props.appendtaginterests(this.props.post.postTag);
    },
    render() {
      var tags = []
      var nooflikes = this.state.likes
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
                <p> Likes: {nooflikes}</p>
                <span>
                  {this.props.flag ?
                  <button onClick={this.addtagstouser}>Add to my interests</button>
                  :
                  <span/>
                  }
                  <button onClick={this.like}><i className="fa fa-thumbs-up thumbsup"></i></button>
                  <button onClick={this.remove}>X</button>
                </span>
            </div>
        )
    }
})

export default Note;
