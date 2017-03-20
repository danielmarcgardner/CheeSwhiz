const SwaggerExpress = require('swagger-express-mw');

function findCheeseByFirmness(req, res) {
  const knex = require('../../knex.js');
  const firmness = req.params.firmness;
  const validFirmnessLevels = ['soft', 'semi-soft', 'semi-hard', 'hard'];
  if (validFirmnessLevels.indexOf(firmness) === -1 || !firmness) {
    res.set('Content-Type', 'plain');
    res.status(404).send('Invalid Parameter!');
  }
  return knex('cheeses')
  .join('animals', 'animals.id', '=', 'cheeses.animal_id')
  .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
  .select('cheeses.id', 'cheeses.name', 'animals.animal', 'firmness.firmness')
  .where('firmness.firmness', firmness)
  .orderBy('id', 'asc')
  .then((cheeses) => {
    res.set('Content-Type', 'application/json');
    res.status(200).json(cheeses);
  }).catch((err) => {
    console.error(err);
  });
}

function findCheeseByAnimal(req, res) {
  const knex = require('../../knex.js');
  const animal = req.params.animal;
  const validAnimals = ['cow', 'buffalo', 'sheep', 'goat'];
  if (validAnimals.indexOf(animal) === -1 || !animal) {
    res.set('Content-Type', 'plain');
    res.status(404).send('Invalid Parameter!');
  }
  return knex('cheeses')
  .join('animals', 'animals.id', '=', 'cheeses.animal_id')
  .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
  .select('cheeses.id', 'cheeses.name', 'animals.animal', 'firmness.firmness')
  .where('animals.animal', animal)
  .orderBy('id', 'asc')
  .then((cheeses) => {
    res.set('Content-Type', 'application/json');
    res.status(200).json(cheeses);
  }).catch((err) => {
    console.error(err);
  });

}

function findCheeseByName(req, res) {
  const knex = require('../../knex.js');
  const name = req.params.name;
  if (!name) {
    res.set('Content-Type', 'plain');
    res.status(404).send('Invalid Parameter!');
  }


}

module.exports = {
  findCheeseByFirmness: findCheeseByFirmness,
  findCheeseByAnimal: findCheeseByAnimal,
  findCheeseByName: findCheeseByName
}
