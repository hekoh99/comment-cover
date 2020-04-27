var db = require('./db');

exports.checkLike = function(userid, commentid){
  db.query(`select * from likes where user_id = ? and comment_id = ?`, [userid, commentid], function(err, result){
    if(result[0] != undefined){
      return true;
    }
    else return false;
  })
}
exports.checkDislike = function(userid, commentid){
  db.query(`select * from dislikes where user_id = ? and comment_id = ?`, [userid, commentid], function(err, result){
    if(result[0] != undefined){
      return true;
    }
    else return false;
  })
}
