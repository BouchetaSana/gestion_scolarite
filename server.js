var http = require('http');
var url = require("url");
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
  var params = querystring.parse(url.parse(req.url).query); 
  res.end("server")
})
  
server.listen(8000);

