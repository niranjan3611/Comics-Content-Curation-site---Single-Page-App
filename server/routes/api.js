var express = require('express');
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs('mongodb://webcrows:umncsfall16@ds019068.mlab.com:19068/webcrowsdb', ['userInfo','postDetail']);

router.get('/userpage/:userId', function(req, res, next) {
  var userid = req.params.userId;
  db.userInfo.find({userId: userid}).toArray(function(err, result) {
    if(err)
    {
      res.status(404).send('invalid user ', req.params.userId);
    }
    else if(result.length)
    {
      res.send(result[0]);
    }
    else
    {
        res.status(404).send('invalid user ', req.params.userId);
    }
  });
});

router.get('/tagsearch/:tagId', function(req, res, next) {
  var tagid = req.params.tagId;
  db.postDetail.find({postTag: tagid}).sort({postLikenum: -1}).toArray(function(err, result) {
    if(err)
    {
      res.status(404).send('invalid user ', req.params.userId);
    }
    else if(result.length)
    {
      var foo = {tagPosts: result}
      res.send(foo);
    }
    else
    {
        res.status(404).send('invalid user ', req.params.userId);
    }
  });
});

router.get('/userposts/:userId', function(req, res, next) {
  var userId = req.params.userId;
  db.postDetail.find({postUser: userId}).sort({postLikenum: -1}).toArray(function(err, result) {
    if(err)
    {
      console.log('error')
      res.status(404).send('invalid user ', req.params.userId);
    }
    else if(result.length)
    {
      console.log('Found some results')
      var foo = {userPosts: result}
      res.send(foo);
    }
    else
    {
        console.log('0 results')
        res.status(404).send('invalid user ', req.params.userId);
    }
  });
});

router.get('/explore', function(req, res, next) {
  db.postDetail.find({}).sort({postLikenum: -1}).toArray(function(err, result) {
      if(err)
      {
        res.status(404).send('no posts found');
      }
      else if (result.length)
      {
        var foo = {allposts: result};
        res.send(foo);
      }
      else
      {
        res.status(404).send('no posts found');
      }
    });
});

router.get('/pins/display/:postId', function(req, res, next) {
  var postid = parseInt(req.params.postId);
  db.postDetail.find({postId: postid}).toArray(function(err, result) {
    if(err)
    {
      res.status(404).send('post not found ', req.params.postId);
    }
    else if (result.length)
    {
      res.send(result[0]);
    }
    else
    {
      res.status(404).send('post not found ', req.params.postId);
    }
  });
});

router.get('/delete/:postId', function(req, res, next) {
  var postid = req.params.postId.parseInt();
  db.postDetail.remove({postId: postid}, function(err, noOfRemovedDocs){
    if (err)
    {
      res.status(404).send('post not found ', req.params.postId);
    }
    else
    {
      console.log('deleted from db');
      var foo = {flag: 1};
      res.send(foo);
    }
  });
});

router.get('/loginX/:userId/:userPass', function(req, res, next){
  var userid = req.params.userId;
  var userpass = req.params.userPass;
  db.userInfo.find({userId: userid, userPass: userpass}).toArray(function(err, result) {
    if(err)
    {
      var foo = {flag: 0};
      res.send(foo);
    }
    else if(result.length)
    {
      var foo = {flag: 1};
      res.send(foo);
    }
    else
    {
        var foo = {flag: 0};
        res.send(foo);
    }
  });
});

router.get('/signUpX/:userId/:userName/:userEmail/:userPass/:userTags', function(req, res, next){
  var userid = req.params.userId;
  var username = req.params.userName;
  var useremail = req.params.userEmail;
  var userpass = req.params.userPass;
  var usertags = req.params.userTags;
  var tempString = usertags.split(',');
  db.userInfo.insert({userId: userid, userName: username, userEmail: useremail, userPass: userpass, userTags: tempString}, function(err, noOfInsertedDocs){
    if (err)
    {
      res.status(404).send('could not insert ');
    }
    else
    {
      var foo = {flag: 1};
      res.send(foo);
    }
  });
});

router.post('/like', function(req, res, next)
{
  var postid = req.body.postId;
  var likeuser = req.body.user;
  db.postDetail.update({postId: postid}, {$push: {postLike: likeuser}, $inc: {postLikenum: 1}}, function(err, noUpdated){
    if (err)
    {
      res.status(404).send('post not found ', req.params.postId);
    }
    else if (noUpdated)
    {
      var foo = {flag: 1};
      res.send(foo);
    }
    else
    {
      res.status(404).send('post not found ', req.params.postId);
    }
  });
});

module.exports = router;
