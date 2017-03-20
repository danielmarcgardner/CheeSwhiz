var SwaggerExpress = require('swagger-express-mw')
const bodyParser = require('body-parser');

function cheeseShop(req, res) {
  console.log('im here');
  const zip = req.params.zip,
        radiusLimit = getMeters(req.params.distance);
  if (!zip || !radiusLimit || Number.isNaN(zip) || Number.isNaN(radiusLimit) || zip.length !== 5) {
    res.set('Content-Type', 'plain');
    if (!zip || zip.length !== 5) { res.status(400).send('Please provide a valid zipcode with a length of 5 numbers.') }
    else if (Number.isNaN(zip)) { res.status(400).send('Your request contained non-numerical characters: please submit a zipcode that only contains integers.') }
    else if (!radiusLimit) { res.status(400).send('Please provide an integer for your distance parameter representing how many miles you are willing to journey from your starting position to nearby cheese shops.') }
    else if (Number.isNaN(radiusLimit)) { res.status(400).send('Your distance figure must be an integer!')}
  }
  const request = require('request');
  console.log(request(`https://api.yelp.com/v2/search/?term=Gourmet%20Cheese&location=${zip}&radius_filter=${radiusLimit}&category_filter=cheese,grocery`, function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  }))
  function getMeters(i) {
    return Math.round(i*1609.344);
  }
}

module.exports = { cheeseShop: cheeseShop }
