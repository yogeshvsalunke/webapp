var http = require('http');
var sockjs = require('sockjs');

var PORT = 	8080

var server = http.createServer()

/*  server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});
 */
/* 
 var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
 // response.write("<!DOCTYPE "html">");
  response.write("<html>");
  response.write("<head>");
  response.write("<title>Hello World Page</title>");
  response.write("</head>");
  response.write("<body>");
  response.write("Hello World!");
  response.write("</body>");
  response.write("</html>");
  response.end();
}); */

var sockjs = require('sockjs')
var wss = sockjs.createServer()
wss.on('connection', function(ws) {
  ws.on('data', function(data) {
    ws.write('from server: ' + data)
  })
  ws.on('close', function() {
    console.log('close')
  })
})

wss.installHandlers(server, {prefix: '/data'})
server.listen(PORT)