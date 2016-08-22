"use strict";

var DDPClient = require("../lib/ddp-client");

/* var ddpclient = new DDPClient({
  // All properties optional, defaults shown
  host : "test.kloojj.com/backend",
  port : 443,
  ssl  : true,
  autoReconnect : true,
  autoReconnectTimer : 500,
  maintainCollections : true,
  ddpVersion : "1",  // ["1", "pre2", "pre1"] available,
  // uses the sockJs protocol to create the connection
  // this still uses websockets, but allows to get the benefits
  // from projects like meteorhacks:cluster
  // (load balancing and service discovery)
  // do not use `path` option when you are using useSockJs
  useSockJs: false,
  // Use a full url instead of a set of `host`, `port` and `ssl`
  // do not set `useSockJs` option if `url` is used
  //url: 'wss://test.kloojj.com/backend/sockjs'
  

}); */

var ddpclient = new DDPClient({
  // All properties optional, defaults shown 
  autoReconnect : true,
  autoReconnectTimer : 500,
  maintainCollections : true,
  url: 'ws://test.kloojj.com/backend/websocket'
});


//url: 'wss://example.com/websocket'


/*
 * Connect to the Meteor Server
 */
ddpclient.connect(function(error, wasReconnect) {
  // If autoReconnect is true, this callback will be invoked each time
  // a server connection is re-established
  if (error) {
    console.log("DDP connection error!");
    return;
  }

  if (wasReconnect) {
    console.log("Reestablishment of a connection.");
  }

  console.log("connected!");

  //commented by me working code for localhost 
  
  /*
  
  setTimeout(function () {
    /*
     * Call a Meteor Method
     *
    ddpclient.call(
      "deletePosts",             // name of Meteor Method being called
      ["foo", "bar"],            // parameters to send to Meteor Method
      function (err, result) {   // callback which returns the method call results
        console.log("called function, result: " + result);
      },
      function () {              // callback which fires when server has finished
        console.log("updated");  // sending any updated documents as a result of
        console.log(ddpclient.collections.posts);  // calling this method
      }
    );
  }, 3000);

  */
  
  /*
  
  this is custom added code to fetch data from METEOR - SERVER 
  
  */
    /* setTimeout(function () {
		
		
var feedDataObj = {}; // input object for get kloojj feeds
    feedDataObj.userId = 'gTzsGsg9qnfpLZHBk';
    feedDataObj.limit = 15;
    feedDataObj.offset = 0;
	
			  console.log("i m in 1 !");
	  ddpclient.call('getKloojjFeed', feedDataObj, function(error, result) {
		  
		  console.log("i m in 2 !");
		  
				if (error) {
					if (displayLog) {
						console.log("CALL SERVER - Call Meteor's getKloojjFeed Failed-"+Date()+"Error" + err);
					}
					//Hide loader (Spinner)
					SpinnerService.hideSpinner();
					console.log('failed', err);
				} else {
					if (displayLog) {
						console.log("CALL SERVER - Call Meteor's getKloojjFeed Successful."+Date());
					}
					//Hide loader (Spinner)
					SpinnerService.hideSpinner();
					callback(result);
				}
			});
			  }, 3000); */
	  
   setTimeout(function () {
    /*
     * Call a Meteor Method
     */
	 
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
		console.log(JSON.stringify(result))
      },
      function () {              // callback which fires when server has finished
        console.log("updated Collection : ");  // sending any updated documents as a result of
       // console.log(ddpclient.collections.videoKloojj);  // calling this method
      }
    );
  }, 3000);
  
  /*
   * Call a Meteor Method while passing in a random seed.
   * Added in DDP pre2, the random seed will be used on the server to generate
   * repeatable IDs. This allows the same id to be generated on the client and server
   */
   
    /*
  
  this is custom added code to fetch data from METEOR - SERVER 
  
  */
  
  /*
   
  var Random = require("ddp-random"),
      random = Random.createWithSeeds("randomSeed");  // seed an id generator

  ddpclient.callWithRandomSeed(
    "getKloojjFeed",              // name of Meteor Method being called
    [{ _id : random.id(),      // generate the id on the client
      body : "asdf" }],
    "randomSeed",              // pass the same seed to the server
    function (err, result) {   // callback which returns the method call results
      console.log("called function, result: " + result);
    },
    function () {              // callback which fires when server has finished
      console.log("updated");  // sending any updated documents as a result of
      console.log(ddpclient.collections.getKloojjFeed);  // calling this method
    }
  );
*/



  /*
   * Subscribe to a Meteor Collection
   */
   
      /*
  
  this is custom added code to fetch data from METEOR - SERVER 
  
  */
  /*
  ddpclient.subscribe(
    "posts",                  // name of Meteor Publish function to subscribe to
    [],                       // any parameters used by the Publish function
    function () {             // callback when the subscription is complete
      console.log("posts complete:");
      console.log(ddpclient.collections.posts);
    }
  );
  */

  /*
   * Observe a collection.
   */
  var observer = ddpclient.observe("posts");
  observer.added = function(id) {
    console.log("[ADDED] to " + observer.name + ":  " + id);
  };
  observer.changed = function(id, oldFields, clearedFields) {
    console.log("[CHANGED] in " + observer.name + ":  " + id);
    console.log("[CHANGED] old field values: ", oldFields);
    console.log("[CHANGED] cleared fields: ", clearedFields);
  };
  observer.removed = function(id, oldValue) {
    console.log("[REMOVED] in " + observer.name + ":  " + id);
    console.log("[REMOVED] previous value: ", oldValue);
  };

  setTimeout(function() { observer.stop(); }, 6000);
});
