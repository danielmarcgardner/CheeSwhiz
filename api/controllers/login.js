const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const app = express();
// const dotenv = require('dotenv')
// dotenv.load();
app.use(cookieParser())

function logInUser(req, res) {
  const knex = require('../../knex.js');
  knex('users').where('email', req.body.email)
  .then((toCompare) => {
    let compare = toCompare[0].hashed_password;
    let userID = toCompare[0].id;
    let superUser = toCompare[0].super;
    bcrypt.compare(req.body.password, compare)
    .then((userAuth) => {
      const user = { userId: userID};
      const token = jwt.sign(user, process.env.JWT_KEY, {
        expiresIn: '7 days'
      })
      let userInfo = {
        email: req.body.email,
        id: userID,
        super: superUser,
        token: token
      }
      res.status(200).json(userInfo)
    })
    .catch((badPass) => {
      return res.status(400).json('Bad email or password')
    })
  })
  .catch((badEmail) => {
    return res.status(400).json('Bad email or password')
  })
}

module.exports = {
  logInUser: logInUser
}
