var express = require('express');
var router = express.Router();
var User = require('../schema/user')
var fs = require('fs');
var path = require('path');

var clientSrc = path.resolve(__dirname, '../../client/src')
if (!fs.existsSync(clientSrc)) {
  throw 'client src does not exist'
}
var indexView = path.join(clientSrc, 'views/index.ejs');
var signupView = path.join(clientSrc, 'views/signup.ejs');
var userSession;

/* GET home page. */
router.get('/', function(req, res, next) {
    if(userSession && userSession.email) {
        console.log(userSession.email, ' currently logged in');
        res.write("<h2> Hi! You are logged into WebCrows portal! </h2><hr>");
        res.end('If you want to logout : <a href="/logout">here</a>')
    }
    else {
        res.render(indexView);    
    }
  /*res.send('hi. try <a href="/api/example/">example two</a>');
    console.log('**************');
    console.log('**************');
    console.log(req.cookies);
    console.log('**************');
    console.log(req.session);
    console.log('**************');
    console.log('**************');*/
});

router.get('/signup', function(req,res){
    res.render(signupView, {message: 'Please signup'});
});

router.post('/signup', function(req, res){
    var aNewUser = new User();
    aNewUser.local.username = req.body.email;
    aNewUser.local.password = req.body.password;
    aNewUser.save(function(err){
                        if(err)
                            throw err;
                })
    res.redirect('/');
});

router.get('/login', function(req,res) {
    res.render(indexView);
});

router.post('/login', function(req, res) {
    userSession = req.session;
    /* TODO retrieve from db and validate password */
    
    userSession.email = req.body.email;
    res.end('user logged in');
});


router.get('/logout',function(req,res){
    /*req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });*/
    delete userSession.email;
    delete req.session.email;
    res.redirect('/');
});

module.exports = router;
