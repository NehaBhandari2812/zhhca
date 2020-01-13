var db = require('../db.js');

module.exports = {
    insert: async function (table,data) {
      var sql = "INSERT INTO "+table+" SET ? ";
      db.query(sql, data, function(err, result) {
        if (err) throw err;
        let json = ({
            error: "",
            data: result.insertId,
            status:1
          });
        return json;
      });        
    },
};