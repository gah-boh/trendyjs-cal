var express = require('express');
var path = require('path');

var port = 9000;

var app = express();

app.use(express.static(path.join(__dirname, 'app')));

app.listen(port);

console.log('Listening on port', port);

