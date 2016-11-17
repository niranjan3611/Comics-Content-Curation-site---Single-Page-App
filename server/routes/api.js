var express = require('express');
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs('mongodb://webcrows:umncsfall16@ds019068.mlab.com:19068/webcrowsdb', ['userInfo','postDetail','tags']);

router.get('/userpage/:userId', function(req, res, next) {
  var userid = req.params.userId;
  db.userInfo.find({userId: userid}).toArray(function(err, result) {
    if(err)
    {
      res.send({flag: 0});
    }
    else if(result.length)
    {
      res.send(result[0]);
    }
    else
    {
        res.send({flag: 0});
    }
  });
});

router.get('/listtags', function(req, res, next) {
  db.tags.find({}).toArray(function(err,result){
    if(err)
    {
      res.send({flag: 0});
    }
    else if(result.length)
    {
      var foo = {alltags: result};
      res.send(foo);
    }
    else
    {
        res.send({flag: 0});
    }
  });
});

router.get('/tagsearch/:tagId', function(req, res, next) {
  var tagid = req.params.tagId;
  db.postDetail.find({postTag: tagid}).sort({postLikenum: -1}).toArray(function(err, result) {
    if(err)
    {
      res.send({flag: 0});
    }
    else if(result.length)
    {
      var foo = {tagPosts: result}
      res.send(foo);
    }
    else
    {
      var foo = {tagPosts: result}
      res.send(foo);
    }
  });
});

router.get('/userposts/:userId', function(req, res, next) {
  var userId = req.params.userId;
  db.postDetail.find({postUser: userId}).sort({postLikenum: -1}).toArray(function(err, result) {
    if(err)
    {
      console.log('error')
      res.send({flag: 0});
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
        var foo = {userPosts: result}
        res.send(foo);
    }
  });
});

router.get('/explore', function(req, res, next) {
  db.postDetail.find({}).sort({postLikenum: -1}).toArray(function(err, result) {
      if(err)
      {
        res.send({flag: 0});
      }
      else if (result.length)
      {
        var foo = {allposts: result};
        res.send(foo);
      }
      else
      {
        var foo = {allposts: result};
        res.send(foo);
      }
    });
});

router.get('/pins/display/:postId', function(req, res, next) {
  var postid = parseInt(req.params.postId);
  db.postDetail.find({postId: postid}).toArray(function(err, result) {
    if(err)
    {
      res.send({flag: 0});
    }
    else if (result.length)
    {
      res.send(result[0]);
    }
    else
    {
      res.send({flag: 0});
    }
  });
});

router.get('/delete/:postId', function(req, res, next) {
  var postid = req.params.postId.parseInt();
  db.postDetail.remove({postId: postid}, function(err, noOfRemovedDocs){
    if (err)
    {
      res.send({flag: 0});
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
      res.send({flag: 0});
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
      res.send({flag: 0});
    }
    else if (noUpdated)
    {
      var foo = {flag: 1};
      res.send(foo);
    }
    else
    {
      res.send({flag: 0});
    }
  });
});

router.post('/addX', function(req, res, next){
  var posttitle = req.body.postTitle;
  var postdetail = req.body.postDetail;
  var postpic = req.body.postPic;
  var posturl = req.body.postURL;
  var postuser = req.body.postUser;
  var posttag = [];
  var postlike = [];
  posttag.push(req.body.postTag);
  var oldPostId = db.postDetail.find().sort({postId:-1}).limit(1).toArray(function(err, oldcounter) {
    var postid = oldcounter[0].postId + 1;
    db.postDetail.insert({postId: postid, postTitle: posttitle, postDetail: postdetail, postPic: postpic, postURL: posturl, postUser: postuser, postTag: posttag, postLike: postlike, postLikenum: 0}, function(err, noOfInsertedDocs){
      if (err)
      {
        res.send({flag: 0});
      }
      else
      {
        console.log('inserted successfully in postDetail');
        var foo = {flag: 1};
        res.send(foo);
      }
    });
  });
});

router.post('/editX', function(req, res, next){
  console.log('inside editX API');
  var postid = parseInt(req.body.postId);
  var posttitle = req.body.postTitle;
  var postdetail = req.body.postDetail;
  var posturl = req.body.postURL;
  console.log('postid: ', postid);
  console.log('posttitle: ', posttitle);
  console.log('postdetail: ', postdetail);
  console.log('posturl: ', posturl);

  db.postDetail.update({postId: postid}, {$set: {postDetail: postdetail, postTitle: posttitle, postURL: posturl}}, function(err, noUpdated){
    if (err)
    {
      console.log('Error');
      res.end();
    }
    else if (noUpdated)
    {
      console.log('updated the value ');
      res.end();
    }
    else
    {
      console.log('0 results');
      res.end();
    }
  });
});

router.post('/appendtags', function(req, res, next)
{
  var taglist = req.body.tags;
  var taguser = req.body.user;
  db.userInfo.update({userId: taguser}, {$addToSet: {userTags: {$each:taglist}}}, function(err, noUpdated){
    if (err)
    {
      res.send({flag: 0});
    }
    else if (noUpdated)
    {
      var foo = {flag: 1};
      res.send(foo);
    }
    else
    {
      res.send({flag: 0});
    }
  });
});



module.exports = router;
