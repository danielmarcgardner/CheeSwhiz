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
    console.log('I am here!!')
    done()
  })
  .catch((err) => {
    done(err)
  })
})

describe('CheeSwhiz /api/cheese route all verbs', function() {

  describe('GET /api/cheese', function() {
    it('returns a json with the status 200', (done) => {
      request(app)
      .get('/api/cheese')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
    })

    it('should return an array of cheeses', function(done) {
      request(app)
        .get('/api/cheese')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.deep.equal([
            {
              id:1,
              name: 'Manchego',
              animal: 'sheep',
              firmness: 'hard'
            },
            {
              id:2,
              name: 'Cheddar',
              animal: 'cow',
              firmness: 'semi-hard'
            },
            {
              id:3,
              name: 'Chevre Bucheron',
              animal: 'goat',
              firmness: 'soft'
            },
            {
              id:4,
              name: 'Buffalo Blue',
              animal: 'buffalo',
              firmness: 'semi-soft'
            }
          ])
          done();
        });
    });
  });
  describe('POST /api/cheese', function() {
    it('should add a cheese to the database', function(done) {
      const newCheese = {
        name: 'Mahon',
        animal_id: 1,
        firmness_id: 1,
        user_id: 1
      }

      request(app)
        .post('/api/cheese')
        .type('form')
        .send(newCheese)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.deep.equal([
            {
              id: 5,
              name: 'Mahon',
              animal_id: 1,
              firmness_id: 1,
              user_id: 1
            }
          ])
          done();
        });
    });
    it('it should return a 400 Bad Request when not name is not present', (done) => {
      const newBadCheese = {
        animal_id: 1,
        firmness_id: 1,
        user_id: 1
      }
      request(app)
        .post('/api/cheese')
        .type('form')
        .send(newBadCheese)
        .set('Accept', 'application/json')
        .expect('Content-Type', /plain/)
        .expect(400,'Name must not be blank!', done)
    })

    it('it should return a 400 Bad Request when not firmness is not present', (done) => {
      const newBadCheese = {
        name: 'Mahon',
        animal_id: 1,
        user_id: 1
      }
      request(app)
        .post('/api/cheese')
        .type('form')
        .send(newBadCheese)
        .set('Accept', 'application/json')
        .expect('Content-Type', /plain/)
        .expect(400,'Firmness must not be blank!', done)
    })

    it('it should return a 400 Bad Request when not milk is not present', (done) => {
      const newBadCheese = {
        name: 'Mahon',
        firmness_id: 1,
        user_id: 1
      }
      request(app)
        .post('/api/cheese')
        .type('form')
        .send(newBadCheese)
        .set('Accept', 'application/json')
        .expect('Content-Type', /plain/)
        .expect(400,'Animal must not be blank!', done)
    })

    it('it should return a 400 Bad Request when cheese already exists in database', (done) => {
      const newBadCheese = {
        name: 'Manchego',
        firmness_id: 3,
        animal_id: 1,
        user_id: 1
      }
      request(app)
        .post('/api/cheese')
        .type('form')
        .send(newBadCheese)
        .set('Accept', 'application/json')
        .expect('Content-Type', /plain/)
        .expect(400,'Cheese already exists!', done)
    })
  });

  describe('PATCH /cheese/{id}', (done) => {
    it('Should update a cheese at a given id', (done) => {
      const updatedCheese = {
        name: 'Manchego',
        firmness_id: 2
      }
      request(app)
        .patch('/api/cheese/1')
        .type('form')
        .send(updatedCheese)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.deep.equal([
            {
              id: 1,
              name: 'Manchego',
              animal_id: 3,
              firmness_id: 2,
              user_id: 1
            }
          ])
          done();
        });
    })
    it('Should return a 404 not found if the id does not exist', (done) => {
      const updatedCheese = {
        name: 'Manchego',
        firmness_id: 2
      }
      request(app)
        .patch('/api/cheese/9000')
        .type('form')
        .send(updatedCheese)
        .set('Accept', 'application/json')
        .expect('Content-Type', /plain/)
        .expect(404,'Cheese not found!', done)
    })
  })
  describe('DELETE /cheese/{id}', (done) => {
    it('Should return the deleted cheese information', (done) => {
      request(app)
        .del('/api/cheese/1')
        .type('form')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.deep.equal([
            {
              id: 1,
              name: 'Manchego',
              animal_id: 3,
              firmness_id: 2,
              user_id: 1
            }
          ])
          done();
        });
    })
    it('Should return a 404 not found if the id does not exist', (done) => {
      request(app)
        .patch('/api/cheese/9000')
        .type('form')
        .set('Accept', 'application/json')
        .expect('Content-Type', /plain/)
        .expect(404,'Cheese not found!', done)
    })
  })
})
