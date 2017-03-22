'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(cookieParser())

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

// function mw(req, res, next) {
//   console.log('hello');
//   next();
// }
// example of middleware
// app.use('/api/cheese', mw);
SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
});
