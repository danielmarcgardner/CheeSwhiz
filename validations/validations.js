const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
var app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

function verifyLoggedIn(req, res, next){
  jwt.verify(req.headers['token'], process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.status(401).json('Not Logged In')
    }
    else {
      next()
    }
  })
}

function verifySuperUser(req, res, next){
  const knex = require('../knex.js');
  jwt.verify(req.headers['token'], process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.status(401).json('Unauthorized')
    }
    else {
      let userId = Number(payload.userId)
      knex('users').where('id', userId)
      .then((userInfo) => {
        if (userInfo[0].super === true) {
          console.log('I am here in next')
          next()
        }
        else {
          console.log('I am here in Unauthorized - not super user')
          res.status(401).json('Unauthorized - Not A Super User')
        }
      })
    }
  })
}

module.exports = {
  verifyLoggedIn: verifyLoggedIn,
  verifySuperUser: verifySuperUser
}
