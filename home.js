module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function randomIndex(){
      var index = 0;
      index = Math.floor(Math.random() * 460);
      if (index < 3) { index = 3; }
      return index;
    }

    /*Display home page */
    function getQuotes(res, mysql, context, complete){
      var idx = randomIndex();
      var inserts = idx;
      var sql ="SELECT quote FROM quotes WHERE quote_id=?;";
          mysql.pool.query(sql, inserts, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.quotes = results;
              complete();
          });
      }


      /*Display all quotes.*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getQuotes(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('home', context);
            }

        }
    });


    return router;
}();
