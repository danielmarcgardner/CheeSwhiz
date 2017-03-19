const request = require('supertest');
const app = require('../../../app');
const knex = require('../../../knex')
const expect = require('chai').expect;

describe('CheeSwhiz /cheese/animal/{type} route', (done) => {
  it('should return an array of cheeses when given the parameter cow', function(done) {
    request(app)
      .get('/cheese/animal/cow')
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

  it('should return an array of cheeses when given the parameter buffalo', function(done) {
    request(app)
      .get('/cheese/animal/buffalo')
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

  it('should return an array of cheeses when given the parameter goat', function(done) {
    request(app)
      .get('/cheese/animal/goat')
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

  it('should return an array of cheeses when given the parameter sheep', function(done) {
    request(app)
      .get('/cheese/animal/sheep')
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
      .get('/cheese/animal/bad')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404,'Invalid Parameter!', done)
  });
});
