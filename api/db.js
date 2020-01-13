var mysql = require('mysql');

var db = mysql.createConnection({
  socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "zhhca",
  port:8889
});

db.connect(function(err) {
    if(err) console.log(err);
    else console.log("Connection has been Established");
  });
  
module.exports = db;

