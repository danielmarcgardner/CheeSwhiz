var SwaggerExpress = require('swagger-express-mw')
const bodyParser = require('body-parser');
const Yelp = require('yelp');
const dotenv = require('dotenv')
dotenv.load();


var yelp = new Yelp({
  consumer_key: process.env.OAUTH_CONSUMER_KEY,
  consumer_secret: process.env.OAUTH_CONSUMER_SECRET,
  token: process.env.OAUTH_TOKEN,
  token_secret: process.env.OAUTH_TOKEN_SECRET
});

function getMeters(i) {
  return Math.round(i*1609.344);
}


function cheeseShop(req, res) {
  const zip = Number(req.swagger.params.zip.value),
        radiusLimit = getMeters(Number(req.swagger.params.distance.value));

        yelp.search({ term: 'Gourmet Cheese', location: zip, category_filter: 'cheese', distance: radiusLimit, limit: 15 })
        .then(function (data) {
          for (var i = 0; i < data.businesses.length; i++) {
            delete data.businesses[i].display_phone;
            delete data.businesses[i].catagories;
            delete data.businesses[i].id;
            delete data.businesses[i].image_url;
            delete data.businesses[i].is_claimed;
            delete data.businesses[i].is_closed;
            delete data.businesses[i].mobile_url;
            delete data.businesses[i].rating_img_url;
            delete data.businesses[i].rating_img_url_large;
            delete data.businesses[i].rating_img_url_small;
            delete data.businesses[i].review_count;
            delete data.businesses[i].snippet_image_url;
            delete data.businesses[i].snippet_text;
            delete data.businesses[i].url;
            delete data.businesses[i].menu_date_updated;
            delete data.businesses[i].menu_provider;
            delete data.businesses[i].categories;
          }

          res.json(data.businesses);
        })
        .catch(function (err) {
          console.error(err);
        });

  // if (!zip || !radiusLimit || Number.isNaN(zip) || Number.isNaN(radiusLimit) || zip.length !== 5) {
  //     console.log('I am here!!!!')
  //   res.set('Content-Type', 'plain');
  //   if (!zip || zip.length !== 5) { res.status(400).send('Please provide a valid zipcode with a length of 5 numbers.') }
  //   else if (Number.isNaN(zip)) { res.status(400).send('Your request contained non-numerical characters: please submit a zipcode that only contains integers.') }
  //   else if (!radiusLimit) { res.status(400).send('Please provide an integer for your distance parameter representing how many miles you are willing to journey from your starting position to nearby cheese shops.') }
  //   else if (Number.isNaN(radiusLimit)) { res.status(400).send('Your distance figure must be an integer!')}
  // }


// const yelpAuth = {
//  oauth_consumer_key: process.env.OAUTH_CONSUMER_KEY,
//  oauth_consumer_secret: process.env.OAUTH_CONSUMER_SECRET,
//  oauth_token: process.env.OAUTH_TOKEN,
//  oauth_token_secret: process.env.OAUTH_TOKEN_SECRET,
//  serviceProvider: {
//    //Yelp API Documentation
//    signatureMethod: 'HMAC-SHA1'
//  }
// };

  // const request = require('request');
  // request(`https://api.yelp.com/v2/search/?term=Gourmet%20Cheese&location=${zip}&radius_filter=${radiusLimit}&category_filter=cheese,grocery?oauth_consumer_key=hezWHxItRyCg0AZaaWHxdg&oauth_consumer_secret=CzsRQ0dRRlGeAWtfQXhggGrHzsc&oauth_token=DxQRMKc5HZcV_1yAe3EGMdSw286XQF-w&oauth_token_secret=jZJwurfXpcVWWDeQUibXpcIMY18`, function(error, response, body) {
  //   console.log('error:', error); // Print the error if one occurred
  //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //   console.log('body:', body); // Print the HTML for the Google homepage.
  // })
}

module.exports = {
  cheeseShop: cheeseShop
}
