const request = require('supertest');
const app = require('../../../app');
const knex = require('../../../knex')
const expect = require('chai').expect;

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
