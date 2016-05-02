var express = require('express');
var path = require('path');

var appDist = '../client/dist';
var port = 7777;

var app = express();
app.use(express.static(path.join(__dirname, appDist)));
app.listen(port, function() {
  console.log('Started listening on port', port);
});

