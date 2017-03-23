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

function cheeseShop(req, res) {
  const zip = Number(req.swagger.params.zip.value);
  const radiusLimit = getMeters(req.swagger.params.distance.value);
  yelp.search({ term: 'Gourmet Cheese', location: zip, radius_filter: radiusLimit, category_filter: 'cheese', limit: 15 })
  .then(function (data) {
    if (data.businesses.length === 0) {
      res.set('Content-Type', 'application/json')
      res.status(404).json('Sorry, no cheese shops within range! Please check that your zipcode is no more or less than 5 characters long.');
    } else {
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
      res.set('Content-Type', 'application/json')
      res.json(data.businesses);
    }
  })
  .catch(function (err) {
    console.error(err);
  });


}

module.exports = {
  cheeseShop: cheeseShop
}
