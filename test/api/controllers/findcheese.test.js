const request = require('supertest');
const app = require('../../../app');
const knex = require('../../../knex')
const expect = require('chai').expect;

//This test only tests the validity of the YELP API CALL and does not modify our database

// This is the endpoint: https://api.yelp.com/v2/search/?term=Gourmet Cheese&location=94115&radius_filter=1500&category_filter=cheese,grocery
describe('CheeSwhiz /findcheese/{zip}/{distance} route', (done) => {
  it('Should return a list of cheese shops in a specified zip and distance', (done) => {
    request(app)
      .get('/api/findcheese/94115/1500')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.deep.equal([
        {
            "rating": 4.5,
            "name": "Bi-Rite Market",
            "phone": "4155517900",
            "location": {
                "cross_streets": "Fell St & Hayes St",
                "city": "San Francisco",
                "display_address": [
                    "550 Divisadero St",
                    "NoPa",
                    "San Francisco, CA 94117"
                ],
                "geo_accuracy": 9.5,
                "neighborhoods": [
                    "NoPa",
                    "Alamo Square"
                ],
                "postal_code": "94117",
                "country_code": "US",
                "address": [
                    "550 Divisadero St"
                ],
                "coordinate": {
                    "latitude": 37.7745126368117,
                    "longitude": -122.437564575518
                },
                "state_code": "CA"
            }
        },
        {
            "rating": 3.0,
            "name": "Mollie Stone's",
            "phone": "4155674902",
            "location": {
                "cross_streets": "Fillmore St & Steiner St",
                "city": "San Francisco",
                "display_address": [
                    "2435 California St",
                    "Lower Pacific Heights",
                    "San Francisco, CA 94115"
                ],
                "geo_accuracy": 8.0,
                "neighborhoods": [
                    "Lower Pacific Heights"
                ],
                "postal_code": "94115",
                "country_code": "US",
                "address": [
                    "2435 California St"
                ],
                "coordinate": {
                    "latitude": 37.788459777832,
                    "longitude": -122.43473815918
                },
                "state_code": "CA"
            }
        },
        {
            "rating": 3.5,
            "name": "Mayflower Market",
            "phone": "4153461700",
            "location": {
                "cross_streets": "Washington St & Jackson St",
                "city": "San Francisco",
                "display_address": [
                    "2498 Fillmore St",
                    "Pacific Heights",
                    "San Francisco, CA 94115"
                ],
                "geo_accuracy": 8.0,
                "neighborhoods": [
                    "Pacific Heights"
                ],
                "postal_code": "94115",
                "country_code": "US",
                "address": [
                    "2498 Fillmore St"
                ],
                "coordinate": {
                    "latitude": 37.792421579361,
                    "longitude": -122.434483766556
                },
                "state_code": "CA"
            }
        },
        {
            "rating": 4.0,
            "name": "Alamo Square Market & Deli",
            "phone": "4158617120",
            "location": {
                "cross_streets": "Fell St & Hayes St",
                "city": "San Francisco",
                "display_address": [
                    "535 Scott St",
                    "Alamo Square",
                    "San Francisco, CA 94117"
                ],
                "geo_accuracy": 8.0,
                "neighborhoods": [
                    "Alamo Square"
                ],
                "postal_code": "94117",
                "country_code": "US",
                "address": [
                    "535 Scott St"
                ],
                "coordinate": {
                    "latitude": 37.77479,
                    "longitude": -122.43622
                },
                "state_code": "CA"
            }
        },
        {
            "rating": 5.0,
            "name": "Parkside Market",
            "phone": "4158853483",
            "location": {
                "cross_streets": "Lyon St & Central Ave",
                "city": "San Francisco",
                "display_address": [
                    "1600 Hayes St",
                    "NoPa",
                    "San Francisco, CA 94117"
                ],
                "geo_accuracy": 8.0,
                "neighborhoods": [
                    "NoPa"
                ],
                "postal_code": "94117",
                "country_code": "US",
                "address": [
                    "1600 Hayes St"
                ],
                "coordinate": {
                    "latitude": 37.7744611,
                    "longitude": -122.4429527
                },
                "state_code": "CA"
            }
        },
        {
            "rating": 4.5,
            "name": "Home Service Market",
            "phone": "4153467000",
            "location": {
                "cross_streets": "Masonic Ave & Central Ave",
                "city": "San Francisco",
                "display_address": [
                    "1700 Hayes St",
                    "NoPa",
                    "San Francisco, CA 94117"
                ],
                "geo_accuracy": 8.0,
                "neighborhoods": [
                    "NoPa"
                ],
                "postal_code": "94117",
                "country_code": "US",
                "address": [
                    "1700 Hayes St"
                ],
                "coordinate": {
                    "latitude": 37.7742691040039,
                    "longitude": -122.444671630859
                },
                "state_code": "CA"
            }
        },
        {
            "rating": 2.5,
            "name": "Safeway",
            "phone": "4159214557",
            "location": {
                "cross_streets": "Byington St & Ellis St",
                "city": "San Francisco",
                "display_address": [
                    "1335 Webster St",
                    "Fillmore",
                    "San Francisco, CA 94115"
                ],
                "geo_accuracy": 9.5,
                "neighborhoods": [
                    "Fillmore",
                    "Western Addition"
                ],
                "postal_code": "94115",
                "country_code": "US",
                "address": [
                    "1335 Webster St"
                ],
                "coordinate": {
                    "latitude": 37.782739400476,
                    "longitude": -122.431510900734
                },
                "state_code": "CA"
            }
        },
        {
            "rating": 3.0,
            "name": "Lucky",
            "phone": "4159236411",
            "location": {
                "cross_streets": "Central Ave & Masonic Ave",
                "city": "San Francisco",
                "display_address": [
                    "1750 Fulton St",
                    "NoPa",
                    "San Francisco, CA 94117"
                ],
                "geo_accuracy": 8.0,
                "neighborhoods": [
                    "NoPa"
                ],
                "postal_code": "94117",
                "country_code": "US",
                "address": [
                    "1750 Fulton St"
                ],
                "coordinate": {
                    "latitude": 37.7760429382324,
                    "longitude": -122.445655822754
                },
                "state_code": "CA"
            }
        },
        {
            "rating": 4.0,
            "name": "California & Lyon Market",
            "phone": "4157754400",
            "location": {
                "cross_streets": "Presidio Ave & Lyon St",
                "city": "San Francisco",
                "display_address": [
                    "3100 California St",
                    "Pacific Heights",
                    "San Francisco, CA 94115"
                ],
                "geo_accuracy": 8.0,
                "neighborhoods": [
                    "Pacific Heights",
                    "Presidio Heights"
                ],
                "postal_code": "94115",
                "country_code": "US",
                "address": [
                    "3100 California St"
                ],
                "coordinate": {
                    "latitude": 37.7876396179199,
                    "longitude": -122.445610046387
                },
                "state_code": "CA"
            }
          }
        ])
        done();
    });
  });
})
