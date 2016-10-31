var express = require('express');
var router = express.Router();

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
