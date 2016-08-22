var http = require('http');
//var sockjs = require('sockjs');
var WebSocket = require('ws')

var wsUrl = 'wss://localhost:8080'
//'ws://' + window.location.host 

var ws = new WebSocket('ws://localhost:8080/data/websocket')

ws.onmessage = function(e) {
  console.log(e.data)
}

ws.onopen = function() {
  console.log('opening...')
  ws.send('hello server')
}

ws.onerror = function(error) {
  console.log('WEbSocket error ' + error)
  console.dir(error)
}