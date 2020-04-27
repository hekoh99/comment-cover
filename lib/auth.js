var cookie = require('cookie');
var db = require('./db');

exports.check = function(request, response){
  var isAuth = false;
  if(request.user){
    isAuth = true;
  }
  return isAuth;
}

exports.nickname = function(request, response){
  var nick = request.user.nickname;
  return nick;
}

exports.loginUI = function(request, response, isAuth){
  var loginUI = '<div id="login"><a href="/sign/login">로그인</a>|<a href="/sign/register">회원가입</a></div>';
  if(isAuth === true){
    loginUI = `<div id="login">${this.nickname(request, response)}<a href="/sign/logout_process">로그아웃</a></div>`;
  }

  return loginUI;
}
