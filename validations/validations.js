const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');

function verifyLoggedIn(req, res, next){
  jwt.verify(req.body.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      console.log(req.body.token)
      res.status(401).json('Not Logged In')
    }
    else {
      next()
    }
  })
}

function verifySuperUser(req, res, next){
  const knex = require('../../knex.js');
  jwt.verify(req.body.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.status(401).json('Not Logged In')
    }
    else {
      knex('users').where('id', payload.userId)
      .then((userInfo) => {
        if (userInfo[0].super === true) {
          next()
        }
        else {
          res.status(401).json('Not A Super User')
        }
      })
    }
  })
}

module.exports = {
  verifyLoggedIn: verifyLoggedIn,
  verifySuperUser: verifySuperUser
}
