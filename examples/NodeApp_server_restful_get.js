"use strict";

var express = require('express');
var app = express();
var fs = require("fs");

var DDPClient = require('ddp');
var connectionStatus ;

 var ddpclient = new DDPClient({
  // All properties optional, defaults shown 
  autoReconnect : true,
  autoReconnectTimer : 500,
  maintainCollections : true,
  url: 'ws://test.kloojj.com/backend/websocket'
});

ddpclient.connect(function(err,wasReconnect) {
    //connection.subscribe('some_name');
	
	if (err) {
    console.log("DDP connection error!");
	connectionStatus = "DDP connection error!" ;
    return;
	}

  else if (wasReconnect) {
    console.log("Reestablishment of a connection.");
	connectionStatus = "Reestablishment of a connection.";
  }
 else {
	console.log("connected!"); 
	connectionStatus = "connected!";
 }
  
  //res.end( "Meteor connection is succesful by web serices " );
});


app.get('/connection', function (req, res) {
	
 res.end( connectionStatus );

})



app.get('/meteorservice', function (req, res) {
	
	 var feedDataObj = {}; // input object for get kloojj feeds
    feedDataObj.userId = 'gTzsGsg9qnfpLZHBk';
    feedDataObj.limit = 15;
    feedDataObj.offset = 0;
	 	  console.log("i m in check feedDataObj : "+feedDataObj.userId);
    ddpclient.call(
      "getKloojjFeed",             // name of Meteor Method being called
       [feedDataObj],            // parameters to send to Meteor Method
      function (err, result) {   // callback which returns the method call results
       // console.log("called function, result: " + result);
		console.log(JSON.stringify(result));
		
		 res.end( JSON.stringify(result) );
      }
    );

})
  
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})