var mysql = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'your_password',
  database : 'db_name'
});
db.connect();
module.exports = db;
