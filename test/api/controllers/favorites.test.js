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


// token to use: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ5MDIwODUwOCwiZXhwIjoxNDkwODEzMzA4fQ.2XlICHvUu73Y_603Q9KJ5Lb5ahUEOTsZO4gULTOJsWo'
describe('CheeSwhiz /user/favorites route', (done) => {
  describe('GET favorites', (done) => {
    it('Should allow a logged in user to see their favorite cheeses', (done) => {
      //token for id 1

      request(app)
      .get('/api/user/favorites')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ5MDIwODUwOCwiZXhwIjoxNDkwODEzMzA4fQ.2XlICHvUu73Y_603Q9KJ5Lb5ahUEOTsZO4gULTOJsWo')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.deep.equal([
          {
            favorite_id: 1,
            name: 'Manchego',
            firmness: 'hard',
            animal: 'sheep',
            cheese_id: 1,
            user_id: 1,
            notes: null
          },
          {
            favorite_id: 2,
            name: 'Cheddar',
            firmness: 'semi-hard',
            animal: 'cow',
            cheese_id: 2,
            user_id: 1,
            notes: null
          }
        ])
        done();
      });
    })

    it('Should not allow a non-logged in user to see any favorites', (done) => {

      request(app)
      .get('/api/user/favorites')
      .set('Accept', 'application/json')
      .expect(401, JSON.stringify('Not Logged In'), done)
    })
})
  describe('POST favorites', (done) => {
    it("Should let logged in user's add a cheese to a favorite", (done) => {

      const userSend = {
        cheese_id: 3,
      }

      request(app)
      .post('/api/user/favorites')
      .set('Accept', 'application/json')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ5MDIwODUwOCwiZXhwIjoxNDkwODEzMzA4fQ.2XlICHvUu73Y_603Q9KJ5Lb5ahUEOTsZO4gULTOJsWo')
      .send(userSend)
      .expect('Content-Type', 'application/json')
      .expect((res) => {
        delete res.body.notes
      })
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.deep.equal([
          {
            favorite_id: 5,
            name: 'Chevre Bucheron',
            firmness: 'soft',
            animal: 'goat',
            cheese_id: 3,
            user_id: 1,
            notes: null
          }
        ])
        done();
      });
    })

    it('Should not allow a non-logged in user to add any favorites', (done) => {
      const userSend = {
        cheese_id: 3,
      }

      request(app)
      .post('/api/user/favorites')
      .set('Accept', 'application/json')
      .send(userSend)
      .expect(401, JSON.stringify('Not Logged In'), done)
    })
  })
  describe('PATCH Favorites', (done) => {
    it('Should add a note to a favorite cheese', (done) => {

      const userSend = {
        favorite_id: 1,
        notes: 'I like Manchego... it is tasty... very tasty'
      }

      request(app)
      .patch('/api/user/favorites')
      .set('Accept', 'application/json')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ5MDIwODUwOCwiZXhwIjoxNDkwODEzMzA4fQ.2XlICHvUu73Y_603Q9KJ5Lb5ahUEOTsZO4gULTOJsWo')
      .send(userSend)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.deep.equal([
          {
            favorite_id: 1,
            name: 'Manchego',
            firmness: 'hard',
            animal: 'sheep',
            cheese_id: 1,
            user_id: 1,
            notes: 'I like Manchego... it is tasty... very tasty'
          }
        ])
        done();
      });
    })

    it('Should not allow a non-logged in user to add any notes', (done) => {
      const userSend = {
        favorite_id: 1,
        notes: 'I like Manchego... it is tasty... very tasty'
      }

      request(app)
      .patch('/api/user/favorites')
      .set('Accept', 'application/json')
      .send(userSend)
      .expect(401, JSON.stringify('Not Logged In'), done)
    })
  })
  describe('DELETE favorites', (done) => {
    it('Should allow a logged in user to delete a favorite cheese from their collection of favorites', (done) => {
      const userSend = {
        favorite_id: 1,
        user_id: 1
      }

      request(app)
      .delete('/api/user/favorites')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ5MDIwODUwOCwiZXhwIjoxNDkwODEzMzA4fQ.2XlICHvUu73Y_603Q9KJ5Lb5ahUEOTsZO4gULTOJsWo')
      .set('Accept', 'application/json')
      .send(userSend)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.deep.equal([
          {
            favorite_id: 1,
            name: 'Manchego',
            firmness: 'hard',
            animal: 'sheep',
            cheese_id: 1,
            user_id: 1,
            notes: null
          }
        ])
        done();
      });
    })

    it('Should not allow a non-logged in user to delete any user favorites', (done) => {
      const userSend = {
        favorite_id: 1,
        notes: 'I like Manchego... it is tasty... very tasty'
      }

      request(app)
      .delete('/api/user/favorites')
      .set('Accept', 'application/json')
      .send(userSend)
      .expect(401, JSON.stringify('Not Logged In'), done)
    })
  })
})
