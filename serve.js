/* eslint-env node */

var express = require('express');
var path = require('path');

var port = 9000;

var app = express();

app.get('/events', function(req, res) {
    res.send(require('./starter-day-events'));
});

app.use(express.static(path.join(__dirname, 'app')));

app.listen(port);

console.log('Listening on port', port);

