var SwaggerExpress = require('swagger-express-mw')

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

// function postCheese(req, res) {
//   const knex = require('../../knex.js');
//   const name = req.body.name;
//   const animal = Number(req.body.animal_id);
//   const firmness = Number(req.body.firmness_id);
//
//   const newCheese = {
//     name: req.body.name,
//     animal_id: animal,
//     firmness_id: firmness,
//     user_id: Number(req.body.user_id)
//   }
//   knex('cheeses').insert(newCheese, '*')
//   .then((cheese) => {
//     res.set('Content-Type', 'application/json');
//     res.status(200).json(cheese);
//   }).catch((err) => {
//     console.error(err);
//   });
// }

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
    console.log(name)
    console.log(namesOfTheCheeses)
    if (namesOfTheCheeses.indexOf(name) >= 0) {
      //ASK JOSH OR HAMID ABOUT THIS!!!!!!!!!!!!!!!!!!!!!!!!
      console.log('This Cheese Is In The DATABASE!!!!')
      // console.log(res)
      res.set("Content-Type", "text/plain");
      // throw SwaggerExpress.errors.notFound('Cheese')
      return res.status(400).send('Cheese already exists!')
    }
    else {
      console.log('I exist');
      const newCheese = {
        name: req.body.name,
        animal_id: animal,
        firmness_id: firmness,
        user_id: Number(req.body.user_id)
      }
      knex('cheeses').insert(newCheese, '*')
      .then((cheese) => {
        res.set('Content-Type', 'application/json');
        res.status(200).json(cheese);
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
      console.log("I am an invalid request!!")

    }
  })
  const updatedVersion = req.body
  knex('cheeses').where('cheeses.id', id).update(updatedVersion, '*')
  .then((cheese) => {
    res.status(200).json(cheese);
  }).catch((err) => {
    console.error(err);
  });
}

module.exports = {
  allCheese: allCheese,
  postCheese: postCheese,
  updatedCheese: updatedCheese
}
