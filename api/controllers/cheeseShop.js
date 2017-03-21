var SwaggerExpress = require('swagger-express-mw')
const bodyParser = require('body-parser');

var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var _ = require('lodash');
var qs = require('querystring');

/* Function for yelp call
 * ------------------------
 * set_parameters: object with params to search
 * callback: callback(error, response, body)
 */
 var request_yelp = function(set_parameters) {

   /* The type of request */
   var httpMethod = 'GET';

   /* The url we are using for the request */
   var url = 'http://api.yelp.com/v2/search';

   /* We can setup default parameters here */
   var default_parameters = {
     location: 'San+Francisco',
     sort: '2'
   };


  /* We set the require parameters here */
  var required_parameters = {
    oauth_consumer_key : process.env.OAUTH_CONSUMER_KEY,
    oauth_token : process.env.OAUTH_TOKEN,
    oauth_nonce : n(),
    oauth_timestamp : n().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  };

  /* We combine all the parameters in order of importance */
   var parameters = _.assign(default_parameters, set_parameters, required_parameters);

  /* We set our secrets here */
  var consumerSecret = process.env.OAUTH_CONSUMER_SECRET;
  var tokenSecret = process.env.OAUTH_TOKEN_SECRET;

  /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
  /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
  var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

 /* We add the signature to the list of paramters */
 parameters.oauth_signature = signature;

 /* Then we turn the paramters object, to a query string */
 var paramURL = qs.stringify(parameters);

 /* Add the query string to the url */
 var apiURL = url+'?'+paramURL;

 /* Then we use request to send make the API Request */
 request(apiURL, function(error, response, body){
   console.log(body)
 });

};

function cheeseShop(req, res) {
  const zip = Number(req.swagger.params.zip.value),
        radiusLimit = getMeters(Number(req.swagger.params.distance.value));

  let cheeseStores = request_yelp('Gourmet Cheese')
  console.log(cheeseStores)
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
  function getMeters(i) {
    return Math.round(i*1609.344);
  }
}

module.exports = {
  cheeseShop: cheeseShop
}
