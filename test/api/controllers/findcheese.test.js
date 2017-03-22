const request = require('supertest');
const app = require('../../../app');
const knex = require('../../../knex')
const expect = require('chai').expect;

//This test only tests the validity of the YELP API CALL and does not modify our database

// This is the endpoint: https://api.yelp.com/v2/search/?term=Gourmet Cheese&location=94115&radius_filter=1500&category_filter=cheese,grocery
describe('CheeSwhiz /findcheese/{zip}/{distance} route', (done) => {
  it('Should return a list of cheese shops in a specified zip and distance', (done) => {
    request(app)
    .get('/api/findcheese/94115/2')
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.body).to.deep.equal([
        {
          rating: 4.5,
          name: 'Cheese Plus',
          phone: '4159212001',
          location:
           {
             cross_streets: 'Broadway St & Pacific Ave',
             city: 'San Francisco',
             display_address: ['2001 Polk St', 'Nob Hill', 'San Francisco, CA 94109'],
             geo_accuracy: 8,
             neighborhoods: [ "Nob Hill" ],
             postal_code: '94109',
             country_code: 'US',
             address: ['2001 Polk St'],
             coordinate: {
               latitude: 37.7952308654785,
               longitude: -122.421829223633
             },
             state_code: 'CA'
           }
        },
        {
          rating: 4.5,
          name: 'Say Cheese',
          phone: '4156655020',
          location:
           {
             cross_streets: 'Carl St & Frederick St',
             city: 'San Francisco',
             display_address: ['856 Cole St', 'Cole Valley', 'San Francisco, CA 94117'],
             geo_accuracy: 8,
             neighborhoods: ['Cole Valley'],
             postal_code: '94117',
             country_code: 'US',
             address: ['856 Cole St'],
             coordinate: {
               latitude: 37.7660636901855,
               longitude: -122.449752807617
             },
             state_code: 'CA'
           }
         },
        {
          rating: 4,
          name: 'Mission Cheese',
          phone: '4155538667',
          location:
           {
             cross_streets: '19th St & 18th St',
             city: 'San Francisco',
             display_address: ['736 Valencia St', 'Mission', 'San Francisco, CA 94110'],
             geo_accuracy: 8,
             neighborhoods: ['Mission'],
             postal_code: '94110',
             country_code: 'US',
             address: ['736 Valencia St'],
             coordinate: {
               latitude: 37.7611389,
               longitude: -122.4216766
             },
             state_code: 'CA'
           }
         },
        {
          rating: 4,
          name: 'Union Larder',
          phone: '4152727567',
          location:
           {
             cross_streets: 'Union St & Warner Pl',
             city: 'San Francisco',
             display_address: ['1945 Hyde St', 'Russian Hill', 'San Francisco, CA 94109'],
             geo_accuracy: 8,
             neighborhoods: ['Russian Hill'],
             postal_code: '94109',
             country_code: 'US',
             address: ['1945 Hyde St'],
             coordinate: {
               latitude: 37.7988205,
               longitude: -122.4192581
             },
             state_code: 'CA'
           }
         },
        {
          rating: 5,
          name: 'Raxakoul Wine & Cheese',
          phone: '4158749133',
          location:
           {
             cross_streets: 'Oak St & Lily St',
             city: 'San Francisco',
             display_address: ['141 Gough St', 'Hayes Valley', 'San Francisco, CA 94102'],
             geo_accuracy: 8,
             neighborhoods: ['Hayes Valley'],
             postal_code: '94102',
             country_code: 'US',
             address: ['141 Gough St'],
             coordinate: {
               latitude: 37.7746849060059,
               longitude: -122.422805786133
             },
             state_code: 'CA'
           }
         },
        {
          rating: 4,
          name: 'Lucca Delicatessen',
          phone: '4159217873',
          location:
           {
             cross_streets: 'Pierce St & Steiner St',
             city: 'San Francisco',
             display_address: ['2120 Chestnut St', 'Marina/Cow Hollow', 'San Francisco, CA 94123'],
             geo_accuracy: 8,
             neighborhoods: ['Marina/Cow Hollow'],
             postal_code: '94123',
             country_code: 'US',
             address: ['2120 Chestnut St'],
             coordinate: {
               latitude: 37.8007698059082,
               longitude: -122.438385009766
             },
             state_code: 'CA'
           }
         },
        {
          rating: 4,
          name: 'Marina Supermarket',
          phone: '4153467470',
          location:
           {
             cross_streets: 'Divisadero St & Scott St',
             city: 'San Francisco',
             display_address: ['2323 Chestnut St', 'Marina/Cow Hollow', 'San Francisco, CA 94123'],
             geo_accuracy: 9.5,
             neighborhoods: ['Marina/Cow Hollow'],
             postal_code: '94123',
             country_code: 'US',
             address: ['2323 Chestnut St'],
             coordinate: {
               latitude: 37.800046310035,
               longitude: -122.44151908535
             },
             state_code: 'CA'
           }
         }
      ])
      done();
    });
  });

  it("should return a 404 message if there are no cheese shops within the given range from the given zipcode", (done) => {
    request(app)
    .get('/api/findcheese/81005/1')
    .set('Accept', 'application/json')
    // .expect('Content-Type', 'plain')
    .expect(404, JSON.stringify('Sorry, no cheese shops within range! Please check that your zipcode is no more or less than 5 characters long.'), done)
  });

})
