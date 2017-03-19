const request = require('supertest');
const app = require('../../../app');
const knex = require('../../../knex')
const expect = require('chai').expect;

describe('CheeSwhiz /cheese/firmness/{type} route', (done) => {
  it('should return an array of cheeses when given the parameter hard', function(done) {
    request(app)
      .get('/cheese/firmness/hard')
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

  it('should return an array of cheeses when given the parameter soft', function(done) {
    request(app)
      .get('/cheese/firmness/soft')
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

  it('should return an array of cheeses when given the parameter semi-soft', function(done) {
    request(app)
      .get('/cheese/firmness/semi-soft')
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

  it('should return an array of cheeses when given the parameter semi-hard', function(done) {
    request(app)
      .get('/cheese/firmness/semi-hard')
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
      .get('/cheese/firmness/bad')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404,'Invalid Parameter!', done)
  });
});
