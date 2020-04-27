var auth = require('./auth');
var db = require('./db');
var bcrypt = require('bcryptjs');

module.exports = function(app){
  var passport = require('passport')
  var LocalStrategy = require('passport-local').Strategy;
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user.email);
  });

  passport.deserializeUser(function(id, done) {
    db.query(`select * from users where email = ?`, [id], function(err, result){
      done(null, result[0]);
    })
  });

  passport.use(new LocalStrategy(
    {
    usernameField: 'email',
    passwordField: 'password'
    },
    function(givenMail, givenPassword, done){
      var salt = bcrypt.genSaltSync(10);
      db.query(`select * from users where email = ?`, [givenMail], function(err, result){
        if(!result){
          return done(null, false, { message: 'Incorrect' });
        }
        else{
          if(bcrypt.compareSync(givenPassword, result[0].password)){
            return done(null, result[0]);
          }
          else{
            return done(null, false, { message: 'Incorrect' });
          }
        }
      });
    }
  ));
  return passport;
}
