var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;
var hoff = require('./hoff');

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));


// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});

app.post('/hoff', hoff);
app.get('/hoff', hoff);

app.get('/', function (req, res) { res.status(200).send('Hoff world!') });
