const request = require('supertest');
const app = require('../../../app');
const knex = require('../../../knex')
const expect = require('chai').expect;

process.env.NODE_ENV = 'test';

beforeEach((done) => {
  Promise.all([
    knex('animals').insert({
      id:1,
      name: 'cow'
    }),
    knex('animals').insert({
      id:2,
      name: 'goat'
    }),
    knex('animals').insert({
      id:3,
      name: 'sheep'
    }),
    knex('animals').insert({
      id:4,
      name: 'buffalo'
    }),
    knex('firmness').insert({
      id:1,
      name: 'hard'
    }),
    knex('firmness').insert({
      id:2,
      name: 'semi-hard'
    }),
    knex('firmness').insert({
      id:3,
      name: 'semi-soft'
    }),
    knex('firmness').insert({
      id:4,
      name: 'soft'
    }),
    knex('users').insert({
      id:1,
      email: 'reidpierredelahunt@gmail.com',
      hashed_password: '$2a$10$MRUMlhoWF9v7OwC53j.x3OL/R7FNmxbjHO30ZxOpPeHx.esnpSxtO',
      super: true
    }),
    knex('users').insert({
      id:2,
      email: 'daniel.marc.gardner@gmail.com',
      hashed_password: '$2a$10$ndDF1KKZ49JMiDPn5c9xI.rqICqIm72l4bMxLQ4xTZmpk9qM0YCTq',
      super: true
    }),
    knex('cheeses').insert({
      id:1,
      name: 'Manchego',
      animal_id: 3,
      firmness_id: 1,
      user_id: 1
    }),
    knex('cheeses').insert({
      id:2,
      name: 'Cheddar',
      animal_id: 1,
      firmness_id: 2,
      user_id: 1
    }),
    knex('cheeses').insert({
      id:3,
      name: 'Chevre Bucheron',
      animal_id: 2,
      firmness_id: 4,
      user_id: 1
    }),
    knex('cheeses').insert({
      id:4,
      name: 'Buffalo Blue',
      animal_id: 4,
      firmness_id: 3,
      user_id: 1
    }),
    knex('favorites').insert({
      id:1,
      user_id: 1,
      cheese_id: 1,
      notes: null
    }),
    knex('favorite').insert({
      id:2,
      user_id: 1,
      cheese_id: 3,
      notes: null
    }),
    knex('favorites').insert({
      id:3,
      user_id: 2,
      cheese_id: 2,
      notes: null
    }),
    knex('favorites').insert({
      id:1,
      user_id: 2,
      cheese_id: 4,
      notes: null
    })
  ]).then(() => done());
});

afterEach((done) => {
  knex('favorites').del()
  .then(() => {
    knex('cheeses').del()
  })
  .then(() => {
    knex('users').del()
  })
  .then(() => {
    knex('firmness').del()
  })
  .then(() => {
    knex('animals').del()
  })
  .then(() => done())
});

describe('CheeSwhiz /cheese/substitute/{cheesename} route', (done) => {
  it('should return an array of cheeses when given the parameter Manchego that are similar', function(done) {
    request(app)
      .get('/cheese/substitute/Manchego')
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

  it('should return an array of cheeses when given the parameter Colby that are similar', function(done) {
    request(app)
      .get('/cheese/substitute/Colby')
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

  it('should return an array of cheeses when given the parameter Idaho Goatster that are similar', function(done) {
    request(app)
      .get('/cheese/substitute/Idaho Goatster')
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

  it('should return an array of cheeses when given the parameter Ricotta that are similar', function(done) {
    request(app)
      .get('/cheese/substitute/Ricotta')
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
      .get('/cheese/substitute/bad')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404,'Invalid Parameter!', done)
  });
});
