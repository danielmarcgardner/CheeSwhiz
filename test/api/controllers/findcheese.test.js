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
    "location": {
      "address": [
         "2001 Polk St"
      ],
      "city": "San Francisco",
      "coordinate": {
        "latitude": 37.7952308654785,
        "longitude": -122.421829223633
      },
      "country_code": "US",
      "cross_streets": "Broadway St & Pacific Ave",
      "display_address": [
        "2001 Polk St",
        "Nob Hill",
        "San Francisco, CA 94109",
      ],
      "geo_accuracy": 8,
      "neighborhoods": [
        "Nob Hill"
      ],
      "postal_code": "94109",
      "state_code": "CA",
    },
    "name": "Cheese Plus",
    "phone": "4159212001",
    "rating": 4.5,
  },
  {
    "location": {
      "address": [
        "856 Cole St"
      ],
      "city": "San Francisco",
      "coordinate": {
        "latitude": 37.7660636901855,
        "longitude": -122.449752807617,
      },
      "country_code": "US",
      "cross_streets": "Carl St & Frederick St",
      "display_address": [
        "856 Cole St",
        "Cole Valley",
        "San Francisco, CA 94117"
      ],
      "geo_accuracy": 8,
      "neighborhoods": [
        "Cole Valley"
      ],
      "postal_code": "94117",
      "state_code": "CA"
    },
    "name": "Say Cheese",
    "phone": "4156655020",
    "rating": 4.5,
  },
  {
    "location": {
      "address": [
        "141 Gough St"
      ],
      "city": "San Francisco",
      "coordinate": {
        "latitude": 37.7746849060059,
        "longitude": -122.422805786133,
      },
      "country_code": "US",
      "cross_streets": "Oak St & Lily St",
      "display_address": [
        "141 Gough St",
        "Hayes Valley",
        "San Francisco, CA 94102"
      ],
      "geo_accuracy": 8,
      "neighborhoods": [
        "Hayes Valley"
      ],
      "postal_code": "94102",
      "state_code": "CA"
    },
    "name": "Raxakoul Wine & Cheese",
    "phone": "4158749133",
    "rating": 5
  },
  {
    "location": {
      "address": [
        "1945 Hyde St"
      ],
      "city": "San Francisco",
      "coordinate": {
        "latitude": 37.7988205,
        "longitude": -122.4192581
      },
      "country_code": "US",
      "cross_streets": "Union St & Warner Pl",
      "display_address": [
        "1945 Hyde St",
        "Russian Hill",
        "San Francisco, CA 94109"
      ],
      "geo_accuracy": 8,
      "neighborhoods": [
        "Russian Hill"
      ],
      "postal_code": "94109",
      "state_code": "CA"
    },
    "name": "Union Larder",
    "phone": "4152727567",
    "rating": 4
  },
  {
    "location": {
      "address": [
        "2120 Chestnut St"
      ],
      "city": "San Francisco",
      "coordinate": {
        "latitude": 37.8007698059082,
        "longitude": -122.438385009766
      },
      "country_code": "US",
      "cross_streets": "Pierce St & Steiner St",
      "display_address": [
        "2120 Chestnut St",
        "Marina/Cow Hollow",
        "San Francisco, CA 94123"
      ],
      "geo_accuracy": 8,
      "neighborhoods": [
        "Marina/Cow Hollow"
      ],
      "postal_code": "94123",
      "state_code": "CA",
    },
    "name": "Lucca Delicatessen",
    "phone": "4159217873",
    "rating": 4
  },
  {
    "location": {
      "address": [
        "2323 Chestnut St"
      ],
      "city": "San Francisco",
      "coordinate": {
        "latitude": 37.800046310035,
        "longitude": -122.44151908535
      },
      "country_code": "US",
      "cross_streets": "Divisadero St & Scott St",
      "display_address": [
        "2323 Chestnut St",
        "Marina/Cow Hollow",
        "San Francisco, CA 94123"
      ],
      "geo_accuracy": 9.5,
      "neighborhoods": [
        "Marina/Cow Hollow"
      ],
      "postal_code": "94123",
      "state_code": "CA"
    },
    "name": "Marina Supermarket",
    "phone": "4153467470",
    "rating": 4
  }
])
        done();
    });
  });
})
