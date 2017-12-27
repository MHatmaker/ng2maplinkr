var express = require("express");
var bodyParser = require("body-parser");
var routes = require('./routes/index');
var logger = require('morgan');
var path = require('path');

var app = express();
app.use(bodyParser.json());
app.use(logger('dev'));

// Create link to Angular build directory
// var distDir = __dirname + "/dist/";
// app.use(express.static(distDir));

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
// });

console.log(path.join(__dirname, 'routes'));
app.use(express.static(path.join(__dirname, 'routes')));
app.use('/', express.static(__dirname));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

module.exports = app;
