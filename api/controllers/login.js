const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.load();
app.use(cookieParser())


function logInUser(req, res) {
  const knex = require('../../knex.js');
  knex('users').select('hashed_password', 'id').where('email', req.body.email)
  .then((toCompare) => {
    let compare = toCompare[0].hashed_password;
    let userID = toCompare[0].id;
    bcrypt.compare(req.body.password, compare)
    .then((userAuth) => {
      const user = { user_id: userID};
      const token = jwt.sign(user, process.env.JWT_KEY, {
        expiresIn: '7 days'
      })
      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
      })
      return knex('users').select('id', 'email').where('email', req.body.email)
    })
    .then((user) => {
      let userToSend = user[0];
      res.status(200).json(userToSend)
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
