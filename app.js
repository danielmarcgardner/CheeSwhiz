'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(cookieParser())

const verify = require('./validations/validations')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

app.use('/api/user/favorites', verify.verifyLoggedIn)
app.use('/api/super/cheese/:id', verify.verifySuperUser)

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port, () => {
    console.log('listening on port '+ port)
  });
});
