const SwaggerExpress = require('swagger-express-mw');

function findCheeseByFirmness(req, res) {
  const knex = require('../../knex.js');
  const firmness = req.swagger.params.type.value;
  const validFirmnessLevels = ['soft', 'semi-soft', 'semi-hard', 'hard'];
  if (validFirmnessLevels.indexOf(firmness) === -1 || !firmness) {
    res.set('Content-Type', 'plain');
    res.status(404).send('Invalid Parameter!');
  }
  return knex('cheeses')
  .join('animals', 'animals.id', '=', 'cheeses.animal_id')
  .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
  .select('cheeses.id', 'cheeses.name', 'animals.animal', 'firmness.firmness', 'cheeses.user_id')
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
  const animal = req.swagger.params.type.value;
  const validAnimals = ['cow', 'buffalo', 'sheep', 'goat'];
  if (validAnimals.indexOf(animal) === -1 || !animal) {
    res.set('Content-Type', 'plain');
    res.status(404).send('Invalid Parameter!');
  }
  return knex('cheeses')
  .join('animals', 'animals.id', '=', 'cheeses.animal_id')
  .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
  .select('cheeses.id', 'cheeses.name', 'animals.animal', 'firmness.firmness', 'cheeses.user_id')
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
  const name = req.swagger.params.name.value;
  if (!name) {
    res.set('Content-Type', 'plain');
    res.status(404).send('Name parameter must not be blank.');
  }
  return knex('cheeses')
  .join('animals', 'animals.id', '=', 'cheeses.animal_id')
  .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
  .select('cheeses.id', 'cheeses.name', 'animals.animal', 'firmness.firmness', 'cheeses.user_id')
  .where('cheeses.name', name)
  .then((oneOrNone) => {
    if (oneOrNone.length === 0) {
      res.set('Content-Type', 'plain');
      res.status(200).send('Sorry, that cheese is not in the database: make sure you are spelling the cheese correctly!');
    }
    res.set('Content-Type', 'application/json');
    res.status(200).send(oneOrNone);
  }).catch((err) => {
    console.error(err);
  });
}

function substituteCheese(req, res) {
  const knex = require('../../knex.js');
  const name = req.swagger.params.cheesename.value;
  return knex('cheeses')
  .where('cheeses.name', '=', name)
  .then((oneOrNone) => {
    if (oneOrNone.length === 0) {
      res.status(404).json('Sorry, that cheese is not in the database: make sure you are spelling the cheese correctly!');
    }
    else {
    const cheeseToReplace = {
      animal: oneOrNone[0].animal_id,
      firmness: oneOrNone[0].firmness_id
    }
    return knex('cheeses')
    .where('cheeses.animal_id', '=', cheeseToReplace.animal)
    .andWhere('cheeses.firmness_id', '=', cheeseToReplace.firmness)
    .whereNot('cheeses.name', name)
    .join('animals', 'animals.id', '=', 'cheeses.animal_id')
    .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
    .select('cheeses.id', 'cheeses.name', 'animals.animal', 'firmness.firmness', 'cheeses.user_id')
    .then((cheeses) => {
      res.set('Content-Type', 'application/json');
      res.status(200).json(cheeses);
    })
  }
})
}


module.exports = {
  findCheeseByFirmness: findCheeseByFirmness,
  findCheeseByAnimal: findCheeseByAnimal,
  findCheeseByName: findCheeseByName,
  substituteCheese: substituteCheese
}
