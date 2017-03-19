const request = require('supertest');
const app = require('../../../app');
const knex = require('../../../knex')
const expect = require('chai').expect;

process.env.NODE_ENV = 'test';

beforeEach((done) => {
  knex.migrate.latest()
  .then((done) => {
    knex.seed.run()
  })
  .then(() => {
    done()
  })
  .catch((err) => {
    done(err)
  })
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

describe('CheeSwhiz /api/cheese route all verbs', function() {

  describe('GET /api/cheese', function() {
    it('returns a json with the status 200', (done) => {
      reques(app)
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
          should.not.exist(err);

          expect(res.body).to.deep.equall([
            {
            //insert data here!!!
            }
          ])

          done();
        });
    });
  });
  describe('POST /api/cheese', function() {
    it('should add a cheese to the database', function(done) {
      const newCheese = {
        name: 'Pule',
        milk: 8, //Will change based on what our data dictates
        firmness: 8, //Will change based on what our data dictates
        user_id: 1 //optional parameter
      }

      request(server)
        .post('/api/cheese')
        .type('form')
        .send(newCheese)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          expect(res.body).to.deep.equall([
            {
              name: 'Pule',
              milk: 8, //Will change based on what our data dictates
              firmness: 8, //Will change based on what our data dictates
              user_id: 1, //optional parameter
              id: 10 // Will change based on wht our data dictates
            }
          ])
          done();
        });
    });
    it('it should return a 400 Bad Request when not name is not present', (done) => {
      const newBadCheese = {
        milk: 8, //Will change based on what our data dictates
        firmness: 8, //Will change based on what our data dictates
        user_id: 1 //optional parameter
      }
      request(server)
        .post('/api/cheese')
        .type('form')
        .send(newBadCheese)
        .set('Accept', 'application/json')
        .expect('Content-Type', /plain/)
        .expect(400,'Name must not be blank!', done)
    })

    it('it should return a 400 Bad Request when not firmness is not present', (done) => {
      const newBadCheese = {
        name: 'Pule',
        milk: 8, //Will change based on what our data dictates
        user_id: 1 //optional parameter
      }
      request(server)
        .post('/api/cheese')
        .type('form')
        .send(newBadCheese)
        .set('Accept', 'application/json')
        .expect('Content-Type', /plain/)
        .expect(400,'Firmness must not be blank!', done)
    })

    it('it should return a 400 Bad Request when not milk is not present', (done) => {
      const newBadCheese = {
        name: 'Pule',
        firmness: 8, //Will change based on what our data dictates
        user_id: 1 //optional parameter
      }
      request(server)
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
        firmness: 1, //Will change based on what our data dictates
        animal: 2, //Will change based on what our data dictates
        user_id: 1 //optional parameter
      }
      request(server)
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
        firmness: 2
      }
      request(server)
        .patch('/api/cheese/1') //DEPENDING ON WHAT MANCHEGO IS!!!
        .type('form')
        .send(newBadCheese)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          expect(res.body).to.deep.equall([
            {
              name: 'Manchego',
              milk: 1, //Will change based on what our data dictates
              firmness: 1, //Will change based on what our data dictates
              user_id: 1, //optional parameter
              id: 1 // Will change based on wht our data dictates
            }
          ])
          done();
        });
    })
    it('Should return a 404 not found if the id does not exist', (done) => {
      const updatedCheese = {
        name: 'Manchego',
        firmness: 2
      }
      request(server)
        .patch('/api/cheese/9000') //DEPENDING ON WHAT MANCHEGO IS!!!
        .type('form')
        .send(updatedCheese)
        .set('Accept', 'application/json')
        .expect('Content-Type', /plain/)
        .expect(404,'Cheese not found!', done)
    })
  })
  describe('DELETE /cheese/{id}', (done) => {
      request(server)
        .del('/api/cheese/1') //DEPENDING ON WHAT CHEESE ID = 1 IS!!!
        .type('form')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          expect(res.body).to.deep.equall([
            {
              name: 'Manchego',
              milk: 1, //Will change based on what our data dictates
              firmness: 2, //Will change based on what our data dictates
              user_id: 1, //optional parameter
              id: 1 // Will change based on wht our data dictates
            }
          ])
          done();
        });
    })
    it('Should return a 404 not found if the id does not exist', (done) => {
      request(server)
        .patch('/api/cheese/9000')
        .type('form')
        .set('Accept', 'application/json')
        .expect('Content-Type', /plain/)
        .expect(404,'Cheese not found!', done)
    })
  })
})
