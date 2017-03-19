const request = require('supertest');
const app = require('../../../app');
const knex = require('../../../knex')
const expect = require('chai').expect;

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
