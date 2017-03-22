'use strict';
// const SwaggerExpress = require('swagger-express-mw');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');

function registerNewUser(req, res) {
  const knex = require('../../knex.js');
  const email = req.body.email;
  const password = req.body.password;
  if (!email) {
    // validation stuff here for blank password and/or email
    res.set('Content-Type', 'application/json');
    res.status(400).json('Email Missing');
  }
  if (!password) {
    res.set('Content-Type', 'application/json');
    res.status(400).json('Password Missing');
  }
  knex('users')
  .where('users.email', '=', req.body.email)
  .then((oneOrNone) => {
    if (oneOrNone.length!==0) { // if user already exists
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
      token: token,
      super: false
    };
    res.status(200).json(injectedUser);
  });
}

module.exports = {
  registerNewUser: registerNewUser
}
