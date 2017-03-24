'use strict';

var SwaggerExpress = require('swagger-express-mw');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors())
app.use(express.static(path.join('public')));
const verify = require('./validations/validations');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

app.use('/api/user/favorites', verify.verifyLoggedIn);
app.use('/api/super/cheese/:id', verify.verifySuperUser);

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port, () => {
    console.log('listening on port '+ port)
  });
});
