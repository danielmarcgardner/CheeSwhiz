var SwaggerExpress = require('swagger-express-mw')
const bodyParser = require('body-parser')

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


function nameExtractor(arrayOfObjs){
  let arrOfNames = []
  for (var i = 0; i < arrayOfObjs.length; i++) {
    arrOfNames.push(arrayOfObjs[i].name)
  }
  return arrOfNames
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

  delete req.body.token
  knex('cheeses').max('id')
  .then((maxNum) => {
    if (maxNum[0].max < id || id < 0) {
      res.status(404).json('Cheese Not Found')
    }
    else {
      const updatedVersion = req.body
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
  const num = req.swagger.params.number.value;
  const param = req.swagger.params.animal_or_firmness.value;
  const validParams = ['cow', 'goat', 'sheep', 'buffalo', 'hard', 'semi-hard', 'semi-soft', 'soft', 'error'];
  let errorSwitch = false;
  for (var i = 0; i < validParams.length; i++) {
    if (i === 8) {
      errorSwitch = true;
      break;
    }
    if (param === validParams[i]) {
      let randomCheesePromises = [];
      let paramType;
      i<4 ? paramType = 'animal': paramType = 'firmness';
      for (var j = 0; j < num; j++) {
        let randomIndex = 0;
        let p;
        if (paramType === 'animal') {
          p = knex('cheeses')
          .join('animals', 'animals.id', '=', 'cheeses.animal_id')
          .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
          .select('cheeses.id', 'cheeses.name', 'animals.animal', 'firmness.firmness')
          .groupBy('cheeses.id')
          .groupBy('animals.animal')
          .groupBy('firmness.firmness')
          .where('animals.animal', '=', param)
          .count('cheeses.id')
          .then((count) => {
            let maxCount = count.length;
            let randomInt = Math.floor(Math.random()*maxCount);
            randomIndex+=randomInt;
            return randomIndex;
          }).then(() => {
            return knex('cheeses')
            .join('animals', 'animals.id', '=', 'cheeses.animal_id')
            .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
            .select('cheeses.id', 'animals.animal')
            .where('animals.animal', '=', param);
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
        } else if (paramType === 'firmness') {
          p = knex('cheeses')
          .join('animals', 'animals.id', '=', 'cheeses.animal_id')
          .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
          .select('cheeses.id', 'cheeses.name', 'animals.animal', 'firmness.firmness')
          .groupBy('cheeses.id')
          .groupBy('animals.animal')
          .groupBy('firmness.firmness')
          .where('firmness.firmness', '=', param)
          .count('cheeses.id')
          .then((count) => {
            let maxCount = count.length;
            let randomInt = Math.floor(Math.random()*maxCount);
            randomIndex+=randomInt;
            return randomIndex;
          }).then(() => {
            return knex('cheeses')
            .join('animals', 'animals.id', '=', 'cheeses.animal_id')
            .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
            .select('cheeses.id', 'animals.animal')
            .where('firmness.firmness', '=', param);
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
            console.log(cheese);
            const cheeseObj = cheese[0];
            return cheeseObj;
          });
        }
        randomCheesePromises.push(p);
      }
      return Promise.all(randomCheesePromises).then((randomCheeses) => {
        res.set('Content-Type', 'application/json');
        res.status(200).json(randomCheeses);
      });
      break;
    }
  }
  if (errorSwitch === true) {
    res.set('Content-Type', 'plain');
    res.status(400).send('Invalid parameter: please provide a valid animal type or firmness level.')
  }
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
        knex('cheeses').where('id', id).del()
        let deletedCheese = cheeseToDelete[0]
        return deletedCheese
      })
      .then((sendDelete) => {
        res.status(200).json([sendDelete])
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
