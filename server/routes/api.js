var express = require('express');
var router = express.Router();
// Ambuj start
var mongojs = require("mongojs");
var db = mongojs('mongodb://webcrows:umncsfall16@ds019068.mlab.com:19068/webcrowsdb', ['userInfo','postDetail']);

router.get('/pins/:userId', function(req, res, next) {
  var userid = req.params.userId;
  db.userInfo.find({userId: userid}).toArray(function(err, result) {
    if(err)
    {
      res.status(404).send('invalid user ', req.params.userId);
    }
    else if(result.length)
    {
      var foo = {zoo: result};
      res.send(foo);
    }
    else
    {
        res.status(404).send('invalid user ', req.params.userId);
    }
  });
});

router.get('/pins/:tagId', function(req, res, next) {
  var tagid = req.params.tagId;
  db.postDetail.find({postTag: tagid}).toArray(function(err, result) {
    if(err)
    {
      res.status(404).send('invalid user ', req.params.userId);
    }
    else if(result.length)
    {
      var foo = {boo: result}
      res.send(foo);
    }
    else
    {
        res.status(404).send('invalid user ', req.params.userId);
    }
  });
});

router.get('/explore', function(req, res, next) {
  db.postDetail.find({}).toArray(function(err, result) {
      if(err)
      {
        res.status(404).send('no posts found');
      }
      else if (result.length)
      {
        var foo = {bar: result};
        res.send(foo);
      }
      else
      {
        res.status(404).send('no posts found');
      }
    });
});

router.get('/pins/:postId', function(req, res, next) {
  var postid = req.params.postId;
  db.postDetail.find({postId: postid}).toArray(function(err, result) {
    if(err)
    {
      res.status(404).send('post not found ', req.params.postId);
    }
    else if (result.length)
    {
      var foo={baz: result}
      res.send(foo);
    }
    else
    {
      res.status(404).send('post not found ', req.params.postId);
    }
  });
});

// Ambuj end

var movies = require('../data/movies.json')

// allow easy lookup by id
var moviesById = {}
movies.movieList.map(function(movie) {
  moviesById[movie.movieId] = movie
})

/* GET example. */
router.get('/example', function(req, res, next) {
  var foo = {
    message: 'hello from express!'
  }
  res.send(foo);
});

router.get('/movies', function(req, res, next) {
  res.send(movies);
});

router.get('/movies/:id', function(req, res, next) {
  var movie = moviesById[req.params.id]
  if (movie) {
    res.send(movie)
  } else {
    res.status(404).send('movie id %d not found', req.params.id);
  }

});

module.exports = router;
