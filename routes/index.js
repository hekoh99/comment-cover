var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');
var db = require('../lib/db');
var fs = require('fs');
var comments = require('../lib/comments.js')

router.get('/', function(request, response, next) {
  db.query(`select * from contents`, function(err, result){
    if(err) throw err;
    var title = 'comments cover';
    var nickname = '';
    if(request.Auth) nickname = request.user.nickname;
    db.query(`select * from comments`, function(err, commentResult){
      coList = comments.coList(commentResult, request.Auth);
      db.query(`select * from comments where (dislikes != 0 and likes/dislikes >=2) or (dislikes = 0 and likes >= 0)`, function(err2, goodCommentResult){
        goodCoList = comments.coList(goodCommentResult, request.Auth);
        fs.writeFile('../myapp/public/html/comments.html', coList, 'utf-8', function(err3){
          if(err3) throw err3;
          fs.writeFile('../myapp/public/html/goodComments.html', goodCoList, 'utf-8', function(err4){
            if(err4) throw err4;
            response.render('index', {title : title, topic:result, is_login:request.Auth, nick : nickname})
          })
        })
      })
    })
  });
});

module.exports = router;
