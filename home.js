module.exports = function(){
    var express = require('express');
    var router = express.Router();
    const fs = require('fs');


   function randomIndex(){
      var index = 0;
      index = Math.floor(Math.random() * 114);
      if (index < 3) { index = 3; }
      return index;
    }

    /*Display home page*/
    function getQuotes(res, context, complete){
      var idx = randomIndex();
      var inserts = idx;
              var result = ""
              var quotation = ""
              fs.readFile('quotes_test.json', (err, data) => {
                  if (err) throw err;
                  var quotation = JSON.parse(data);
                  if (quotation.quotes[idx] === undefined){
                    var result = "do or do not there is no try - yoda";
                  }
                  else{
                    var result = quotation.quotes[idx].quote;
                  }
                  context.quotes = result;
                  complete();
              });

      };

    /*Display quotes.*/
    router.get('/', function(req, res){
        var context = {};
        context.quotes = "do or do not there is no try - yoda";
        res.render('home', context);

    });

    /*Display quotes.*/
    router.post('/', function(req, res){
      var callbackCount = 0;
      var context = {};
      getQuotes(res, context, complete);
      function complete(){
          callbackCount++;
          if(callbackCount >= 1){
              res.render('home', context);
          }

      }
  });


    return router;
}();
