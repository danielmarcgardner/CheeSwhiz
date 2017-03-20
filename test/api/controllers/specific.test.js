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

describe('CheeSwhiz /cheese/specific/{type} route', (done) => {
  it('should return information about Manchego Cheese when given the parameter Manchego', function(done) {
    request(app)
      .get('/cheese/specific/Manchego')
      .set('Accept', 'application/json')
      .end((err, res) => {
        should.not.exist(err);

        expect(res.body).to.deep.equall([
          {
          //insert data here!!!
          }
        ])

        done();
      });
  });

  it('should return information about Colby Cheese when given the parameter Colby', function(done) {
    request(app)
      .get('/cheese/specific/Colby')
      .set('Accept', 'application/json')
      .end((err, res) => {
        should.not.exist(err);

        expect(res.body).to.deep.equall([
          {
          //insert data here!!!
          }
        ])

        done();
      });
  });

  it('should return information about Idaho Goatster Cheese when given the parameter Idaho Goatster', function(done) {
    request(app)
      .get('/cheese/specific/Idaho Goatster')
      .set('Accept', 'application/json')
      .end((err, res) => {
        should.not.exist(err);

        expect(res.body).to.deep.equall([
          {
          //insert data here!!!
          }
        ])

        done();
      });
  });

  it('should return information about Ricotta Cheese when given the parameter Ricotta', function(done) {
    request(app)
      .get('/cheese/specific/Ricotta')
      .set('Accept', 'application/json')
      .end((err, res) => {
        should.not.exist(err);

        expect(res.body).to.deep.equall([
          {
          //insert data here!!!
          }
        ])

        done();
      });
  });

  it('should return an error when given invalid parameters', function(done) {
    request(app)
      .get('/cheese/specific/bad')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404,'Invalid Parameter!', done)
  });
});
