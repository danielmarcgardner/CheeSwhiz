var SwaggerExpress = require('swagger-express-mw')
const bodyParser = require('body-parser')
const nameExtractor = require('../helpers/paramFinders.js').nameExtractor;
const randomIndexFinder = require('../helpers/paramFinders.js').randomIndexFinder;


function allCheese(req, res) {
  const knex = require('../../knex.js');
  return knex('cheeses')
  .join('animals', 'animals.id', '=', 'cheeses.animal_id')
  .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
  .select('cheeses.id', 'cheeses.name', 'animals.animal', 'firmness.firmness')
  .orderBy('id', 'asc')
  .then((cheeses) => {
    res.set('Content-Type', 'application/json');
    res.status(200).json(cheeses);
  }).catch((err) => {
    console.error(err);
  });
}

function postCheese(req, res) {
  const knex = require('../../knex.js');
  const name = req.body.name;
  const animal = Number(req.body.animal_id);
  const firmness = Number(req.body.firmness_id);

  knex('cheeses').select('name')
  .then((names) => {
    let nameOfCheesesInDB = nameExtractor(names)
    return nameOfCheesesInDB
  })
  .then((namesOfTheCheeses) => {
    if (namesOfTheCheeses.indexOf(name) >= 0) {
      res.status(400).json('This Cheese is in the Database')
    }
    else {
      const newCheese = {
        name: req.body.name,
        animal_id: animal,
        firmness_id: firmness,
        user_id: Number(req.body.user_id)
      }
      knex('cheeses').insert(newCheese, '*')
      .then((cheese) => {
        return knex('cheeses')
        .join('animals', 'animals.id', '=', 'cheeses.animal_id')
        .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
        .select('cheeses.id', 'cheeses.name', 'animals.animal', 'firmness.firmness', 'cheeses.user_id')
        .where('cheeses.id', cheese[0].id)
        .then((allCheeseInfo) => {
          res.set('Content-Type', 'application/json');
          res.status(200).json(allCheeseInfo);
        })
      }).catch((err) => {
        console.error(err);
      });
    }
  })
}

function updatedCheese(req, res, next) {
  const knex = require('../../knex.js')
  const id = Number.parseInt(req.swagger.params.id.value);

  knex('cheeses').max('id')
  .then((maxNum) => {
    if (maxNum[0].max < id || id < 0) {
      res.status(404).json('Cheese Not Found')
    }
    else {
      const updatedVersion = req.body;
      knex('cheeses').where('cheeses.id', id).update(updatedVersion, '*')
      .then((cheese) => {
        return knex('cheeses')
        .join('animals', 'animals.id', '=', 'cheeses.animal_id')
        .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
        .select('cheeses.id', 'cheeses.name', 'animals.animal', 'firmness.firmness', 'cheeses.user_id')
        .where('cheeses.id', cheese[0].id)
        .then((updatedCheese) => {
          res.set('Content-Type', 'application/json');
          res.status(200).json(updatedCheese);
        })
      }).catch((err) => {
        console.error(err);
      });
    }
  })
}

function randomCheeseGenerator(req, res) {
  const knex = require('../../knex.js');
  const randomQuantity = req.swagger.params.number.value;
  const prop = req.swagger.params.cheese_prop.value; //change YAML for better name than 'animal_or_firmness', like 'cheese_prop'
  const validProps = ['cow', 'goat', 'sheep', 'buffalo', 'hard', 'semi-hard', 'semi-soft', 'soft'];
  let tooManyRandoms = false;
  for (var i = 0; i < validProps.length; i++) {
    if (prop === validProps[i]) {
      let randomCheesePromises = [];
      let indices = [];
      let params;
      i<4 ? params = { type: 'animal', knexCheck: 'animals.animal' }: params = { type: 'firmness', knexCheck: 'firmness.firmness' };
      for (var j = 0; j < randomQuantity; j++) {
        if (tooManyRandoms === true) { break; }
        let randomIndex, p;
        p = knex('cheeses')
        .join('animals', 'animals.id', '=', 'cheeses.animal_id')
        .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
        .select('cheeses.id', 'cheeses.name', 'animals.animal', 'firmness.firmness')
        .groupBy('cheeses.id')
        .groupBy('animals.animal')
        .groupBy('firmness.firmness')
        .where(params.knexCheck, '=', prop)
        .count('cheeses.id')
        .then((count) => {
          if (count.length < randomQuantity) { tooManyRandoms = true; }
          randomIndex = randomIndexFinder(count.length, indices);
          indices.push(randomIndex);
          return randomIndex;
        }).then(() => {
          return knex('cheeses')
          .join('animals', 'animals.id', '=', 'cheeses.animal_id')
          .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
          .select('cheeses.id', 'animals.animal')
          .where(params.knexCheck, '=', prop);
        }).then((ids) => {
          let arrayOfIds = [];
          for (var k = 0; k < ids.length; k++) {
            let currentObj = ids[k];
            arrayOfIds.push(currentObj.id);
          }
          return arrayOfIds;
        }).then((arrayOfIds) => {
          return arrayOfIds[randomIndex];
        }).then((randomID) => {
          return knex('cheeses')
          .join('animals', 'animals.id', '=', 'cheeses.animal_id')
          .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
          .select('cheeses.id', 'cheeses.name', 'animals.animal', 'firmness.firmness')
          .where('cheeses.id', '=', randomID);
        }).then((cheese) => {
          const cheeseObj = cheese[0];
          return cheeseObj;
        });
        randomCheesePromises.push(p);
      }
      if (tooManyRandoms === true) {
        res.set('Content-Type', 'plain');
        return res.status(400).send('You requested more random cheeses than the database can supply! Please provide a smaller quantity.');
      }
      return Promise.all(randomCheesePromises).then((randomCheeses) => {
        res.set('Content-Type', 'application/json');
        return res.status(200).json(randomCheeses);
      });
      break;
    }
  }
  res.set('Content-Type', 'plain');
  return res.status(400).send('Invalid parameter: please provide a valid animal type or firmness level.');
}

function deleteCheese(req, res) {
  const knex = require('../../knex.js');
  const id = Number.parseInt(req.swagger.params.id.value);

  knex('cheeses').max('id')
  .then((maxNum) => {
    if (maxNum[0].max < id || id < 0) {
      res.status(404).json('Cheese Not Found')
    }
    else {
      knex('cheeses')
      .join('animals', 'animals.id', '=', 'cheeses.animal_id')
      .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
      .select('cheeses.id', 'cheeses.name', 'animals.animal', 'firmness.firmness', 'cheeses.user_id')
      .where('cheeses.id', id)
      .then((cheeseToDelete) => {
        let deletedCheese = cheeseToDelete[0]
        res.status(200).json(deletedCheese)
      })
      .then((sendDelete) => {
        return knex('cheeses').where('id', id).del()
      })
      .catch((err) => {
        console.error(err)
      })
    }
  })

}

module.exports = {
  allCheese: allCheese,
  postCheese: postCheese,
  updatedCheese: updatedCheese,
  randomCheeseGenerator: randomCheeseGenerator,
  deleteCheese: deleteCheese
}
