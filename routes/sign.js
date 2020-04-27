var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');
var passport = require('passport')
var session = require('express-session');
var template = require('../lib/template');
var sanitizeHTML = require('sanitize-html');
var db = require('../lib/db');
var bcrypt = require('bcryptjs');
const app = express();

module.exports = function(passport){
    router.get('/login', function(request, response){
      var title = 'login';
      response.render('login', {title : title, topic: '로그인'});
  })

  router.post('/login_process', passport.authenticate('local',
  { successRedirect: '/', failureRedirect: '/sign/login' }));

  router.get('/logout_process', function(request, response){
    request.logout();
    response.redirect('/');
  })

  router.get('/register', function(request, response){
    var title = 'register';
    response.render('register', {title : title, topic : '회원가입'});
  })

  router.post('/register_process', function(request, response){
    var salt = bcrypt.genSaltSync(10);
    var post = request.body;
    var email = sanitizeHTML(post.email);
    var password = sanitizeHTML(post.password);
    var password2 = sanitizeHTML(post.password2);
    var hashPwd = bcrypt.hashSync(password, salt);
    var nick = sanitizeHTML(post.nickname);
    db.query(`insert into users(email, password, nickname) value(?, ?, ?)`, [email, hashPwd, nick], function(err, result){
      if(err) throw err;
      response.redirect('/');
    });
  })

  return router;
}
