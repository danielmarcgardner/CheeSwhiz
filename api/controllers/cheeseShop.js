var SwaggerExpress = require('swagger-express-mw')
const bodyParser = require('body-parser');
const Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: process.env.OAUTH_CONSUMER_KEY,
  consumer_secret: process.env.OAUTH_CONSUMER_SECRET,
  token: process.env.OAUTH_TOKEN,
  token_secret: process.env.OAUTH_TOKEN_SECRET
});

function getMeters(i) {
  return Math.round(i*1609.344);
}

//Distance Function isn't returning
function cheeseShop(req, res) {
  const zip = Number(req.swagger.params.zip.value),
        radiusLimit = getMeters(Number(req.swagger.params.distance.value));

        console.log(req.swagger.params.distance.value)
        console.log(radiusLimit)

        // Need to figure out distance with Reid in the AM...
        yelp.search({ term: 'Gourmet Cheese', location: zip, category_filter: 'cheese', limit: 15 })
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

}

module.exports = {
  cheeseShop: cheeseShop
}
