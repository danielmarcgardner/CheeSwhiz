const request = require('supertest');
const app = require('../../../app');
const knex = require('../../../knex')
const expect = require('chai').expect;

process.env.NODE_ENV = 'test';

beforeEach((done) => {
  knex.migrate.latest()
  .then(() =>{
  return Promise.all([
    knex('animals').insert({ id: 1, animal: 'cow' }),
    knex('animals').insert({ id: 2, animal: 'goat' }),
    knex('animals').insert({ id: 3, animal: 'sheep' }),
    knex('animals').insert({ id: 4, animal: 'buffalo' })
  ])
  })
    .then(function() {
      return knex.raw(`SELECT setval('animals_id_seq', (SELECT MAX(id) FROM animals))`)
    })
    .then(function() {
      return Promise.all([
        knex('firmness').insert({ id: 1, firmness: 'hard' }),
        knex('firmness').insert({ id: 2, firmness: 'semi-hard' }),
        knex('firmness').insert({ id: 3, firmness: 'semi-soft' }),
        knex('firmness').insert({ id: 4, firmness: 'soft' })
      ])
    })
    .then(function() {
      return knex.raw(`SELECT setval('firmness_id_seq', (SELECT MAX(id) FROM firmness))`)
    })
    .then(function(){
      return Promise.all([
        knex('users').insert({
          id: 1,
          email: 'reidpierredelahunt@gmail.com',
          hashed_password: '$2a$10$MRUMlhoWF9v7OwC53j.x3OL/R7FNmxbjHO30ZxOpPeHx.esnpSxtO', //cheese1
          super: true
        }),
        knex('users').insert({
          id: 2,
          email: 'daniel.marc.gardner@gmail.com',
          hashed_password: '$2a$10$ndDF1KKZ49JMiDPn5c9xI.rqICqIm72l4bMxLQ4xTZmpk9qM0YCTq', //cheese2
          super: true
        })
      ])
    })
    .then(function() {
      return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`)
    })
  .then(() => {
    return Promise.all([
      knex('cheeses').insert({
        id: 1,
        name: 'Manchego',
        animal_id: 3,
        firmness_id: 1,
        user_id: 1
      }),
      knex('cheeses').insert({
        id: 2,
        name: 'Cheddar',
        animal_id: 1,
        firmness_id: 2,
        user_id: 1
      }),
      knex('cheeses').insert({
        id: 3,
        name: 'Chevre Bucheron',
        animal_id: 2,
        firmness_id: 4,
        user_id: 1
      }),
      knex('cheeses').insert({
        id: 4,
        name: 'Buffalo Blue',
        animal_id: 4,
        firmness_id: 3,
        user_id: 1
      })
    ])
  })
  .then(function() {
    return knex.raw(`SELECT setval('cheeses_id_seq', (SELECT MAX(id) FROM cheeses))`)
  })
  .then(() => {
    return Promise.all([
      knex('favorites').insert({
        id: 1,
        user_id: 1,
        cheese_id: 1
      }),
      knex('favorites').insert({
        id: 2,
        user_id: 1,
        cheese_id: 2
      }),
      knex('favorites').insert({
        id: 3,
        user_id: 2,
        cheese_id: 3
      }),
      knex('favorites').insert({
        id: 4,
        user_id: 2,
        cheese_id: 4
      })
    ])
  })
  .then(function() {
    return knex.raw(`SELECT setval('favorites_id_seq', (SELECT MAX(id) FROM favorites))`)
  })
  .then(() => done());
});

afterEach((done) => {
  knex.migrate.rollback()
  .then(() => {
    done()
  })
  .catch((err) => {
    done(err)
  })
})

function hasToken(res) {
  if (!('token' in res.body)) throw new Error("Token is missing!");
  if (!('id' in res.body)) throw new Error("ID is missing!");
  if (!('email' in res.body)) throw new Error("email is missing!");
  if (!('super' in res.body)) throw new Error("Super user status is missing!");
}

describe('CheeSwhiz /user/login route', (done) => {
  it('Should log a user in with proper credentials', (done) => {

    const user = {
      email: 'reidpierredelahunt@gmail.com',
      password: 'cheese1'
    }

    request(app)
    .post('/api/user/login')
    .set('Accept', 'application/json')
    .send(user)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(hasToken)
    .expect(200, done);
  });

  it('Should reject a user with a user in with bad email', (done) => {
    const user = {
      email: 'bademail@email.com',
      password: 'cheese1'
    }

    request(app)
    .post('/api/user/login')
    .set('Accept', 'application/json')
    .send(user)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(400, JSON.stringify('Bad email or password'), done)
  })

  it('Should reject a user with a user in with bad password', (done) => {
    const user = {
      email: 'reidpierredelahunt@gmail.com',
      password: 'cheese2'
    }

    request(app)
    .post('/api/user/login')
    .set('Accept', 'application/json')
    .send(user)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(400, JSON.stringify('Bad email or password'), done)
  })

  it('Should reject a user with a user in with no email', (done) => {
    const user = {
      password: 'cheese2'
    }

    request(app)
    .post('/api/user/login')
    .set('Accept', 'application/json')
    .send(user)
    .expect('Content-Type', 'application/json')
    .expect(400, {
      "message":"Request validation failed: Parameter (credentials) failed schema validation",
      "code":"SCHEMA_VALIDATION_FAILED",
      "failedValidation":true,
      "results":{
        "errors":[
          {"code":"OBJECT_MISSING_REQUIRED_PROPERTY",
          "message":"Missing required property: email",
          "path":[],
          "description":"Used for either creating a user or logging a user into CheeSwhiz."
        }],
        "warnings":[]
      },
      "path":["paths","/user/login","post","parameters","0"],
      "paramName":"credentials"
    }, done)
  })

  it('Should reject a user with a user in with no email', (done) => {
    const user = {
      email: 'reidpierredelahunt@gmail.com'
    }

    request(app)
    .post('/api/user/login')
    .set('Accept', 'application/json')
    .send(user)
    .expect('Content-Type', 'application/json')
    .expect(400, {
      "message":"Request validation failed: Parameter (credentials) failed schema validation",
      "code":"SCHEMA_VALIDATION_FAILED",
      "failedValidation":true,
      "results":{
        "errors":[
          {"code":"OBJECT_MISSING_REQUIRED_PROPERTY",
          "message":"Missing required property: password",
          "path":[],
          "description":"Used for either creating a user or logging a user into CheeSwhiz."
        }],
        "warnings":[]
      },
      "path":["paths","/user/login","post","parameters","0"],
      "paramName":"credentials"
    }, done)
  })
})
