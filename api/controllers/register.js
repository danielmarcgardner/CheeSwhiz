'use strict';
const SwaggerExpress = require('swagger-express-mw');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');

function registerNewUser(req, res) {
  const knex = require('../../knex.js');
  const email = req.body.email;
  const password = req.body.password;

  knex('users')
  .where('users.email', '=', req.body.email)
  .then((oneOrNone) => {
    if (oneOrNone.length!==0) { // if user already
      res.set('Content-Type', 'text/plain');
      res.status(400).send('Email Already Exists');
    }
  }).then(() => {
    return bcrypt.hash(req.body.password, 1);
  }).then((hashed_password) => {
    const newUser = {
      email: req.body.email,
      hashed_password: hashed_password,
      super: false
    };
    return knex('users').insert(newUser, '*');
  }).then((newInsertedUser) => {
    const claim = { userId: injectedUser.id };
    const token = jwt.sign(claim, process.env.JWT_KEY, {
      expiresIn: '7 days'
    });
    const injectedUser = {
      id: newInsertedUser[0].id,
      email: newInsertedUser[0].email,
      token: token
    };
    res.status(200).json(injectedUser);
  });
}

module.exports = {
  registerNewUser: registerNewUser
}
