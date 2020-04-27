var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');
var db = require('../lib/db');
var fs = require('fs');

router.post('/comment_process', function(request, response){
  var post = request.body;
  var content = post.content;
  db.query(`insert into comments(content, article_id, wrote_by) value(?, 1, ?)`, [content, request.user.nickname], function(err, result){
    response.redirect(`/`);
  })
})

router.post('/like_process', function(request, response){
  var post = request.body;
  var commentID = post.target;
  db.query(`select id from users where nickname = ?`, [request.user.nickname], function(er, userid){
    db.query(`select * from dislikes where user_id = ? and comment_id = ?`, [userid[0].id, commentID], function(er, checkD){
      db.query(`select * from likes where user_id = ? and comment_id = ?`, [userid[0].id, commentID], function(err, checkL){
        if(checkD[0] != undefined){
          response.send({answer:"이미 싫어요를 눌렀습니다"});
        }
        else if(checkL[0] != undefined){
          db.query(`delete from likes where user_id=? and comment_id=?`, [userid[0].id, commentID], function(err, dresult){
            db.query(`update comments set likes = likes - 1 where id = ?`, [commentID], function(err2, result2){
              db.query(`select likes from comments where id = ?`, [commentID], function(err, likes){
                response.send(likes[0]);
              })
            })
          })
        }
        else{
          db.query(`insert into likes(user_id, comment_id) value(?, ?)`, [userid[0].id, commentID], function(err, iresult){
            db.query(`update comments set likes = likes + 1 where id = ?`, [commentID], function(err2, result2){
              db.query(`select likes from comments where id = ?`, [commentID], function(err, likes){
                response.send(likes[0]);
              })
            })
          })
        }
      })
    })
  })
})

router.post('/dislike_process', function(request, response){
  var post = request.body;
  var commentID = post.target;
  db.query(`select id from users where nickname = ?`, [request.user.nickname], function(er, userid){
    db.query(`select * from dislikes where user_id = ? and comment_id = ?`, [userid[0].id, commentID], function(er, checkD){
      db.query(`select * from likes where user_id=? and comment_id = ?`, [userid[0].id, commentID], function(er2, checkL){
        if(checkL[0] != undefined){
          response.send({answer:"이미 좋아요를 눌렀습니다"});
        }
        else if(checkD[0] != undefined){
          db.query(`delete from dislikes where user_id=? and comment_id=?`, [userid[0].id, commentID], function(err1, dresult){
            db.query(`update comments set dislikes = dislikes - 1 where id = ?`, [commentID], function(err2, result2){
              db.query(`select dislikes from comments where id = ?`, [commentID], function(err3, dislikes){
                response.send(dislikes[0]);
              })
            })
          })
        }
        else{
          db.query(`insert into dislikes(user_id, comment_id) value(?, ?)`, [userid[0].id, commentID], function(err, iresult){
            db.query(`update comments set dislikes = dislikes + 1 where id = ?`, [commentID], function(err2, result2){
              db.query(`select dislikes from comments where id = ?`, [commentID], function(err, dislikes){
                response.send(dislikes[0]);
              })
            })
          })
        }
      })
    })
  })
})

module.exports = router;
