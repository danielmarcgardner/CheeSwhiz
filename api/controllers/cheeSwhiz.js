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

function postCheese(req, res, next) {
  const knex = require('../../knex.js');
  const name = req.body.name;
  const animal = Number(req.body.animal_id);
  const firmness = Number(req.body.firmness_id);

  knex('cheeses').select('name')
  .then((names) => {
    let nameOfCheesesInDB = nameExtractor(names)
    return nameOfCheesesInDB
  })
  .then((namesOfCheeses) => {
    if (namesOfCheeses.indexOf(name) !== -1) {
      //ASK JOSH OR HAMID ABOUT THIS!!!!!!!!!!!!!!!!!!!!!!!!
      console.log('This Cheese Is In The DATABASE!!!!')
      res.status(400)
    }
  })

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

function updatedCheese(req, res, next) {
  const knex = require('../../knex.js')
  const id = Number.parseInt(req.swagger.params.id.value);

  knex('cheeses').max('id')
  .then((maxNum) => {
    if (maxNum[0].max < id || id < 0) {
      console.log("I am an invalid request!!")
      //Swagger will not let me send error code. I cannot do a next() or anything!!!!!!!!!!!!
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
