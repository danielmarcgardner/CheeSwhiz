'use strict';
const SwaggerExpress = require('swagger-express-mw');
const jwt = require('jsonwebtoken');

function favCheeseMaker(arrOfCheeses) {
  let finalArr =[]
  for (var i = 0; i < arrOfCheeses.length; i++) {
    let cheeseObj = {
      animal: arrOfCheeses[i].animal,
      cheese_id: arrOfCheeses[i].cheese_id,
      favorite_id: arrOfCheeses[i].id,
      firmness: arrOfCheeses[i].firmness,
      notes: arrOfCheeses[i].notes,
      name: arrOfCheeses[i].name,
      user_id:arrOfCheeses[i].user_id
    }
  finalArr.push(cheeseObj)
  }
  return finalArr
}

function getFavorites(req, res) {
  const knex = require('../../knex.js');
  jwt.verify(req.body.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.set('Content-Type', 'application/json');
      res.status(401).send('Unauthorized');
    }
    knex('favorites')
    .join('users', 'users.id', '=', 'favorites.user_id')
    .join('cheeses', 'cheeses.id', '=', 'favorites.cheese_id')
    .join('animals', 'animals.id', '=', 'cheeses.animal_id')
    .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
    .select('cheeses.name', 'animals.animal', 'firmness.firmness', 'favorites.cheese_id', 'favorites.user_id', 'favorites.id', 'favorites.notes')
    .where('users.id', '=', payload.userId)
    .then((favorites) => {
      let cheeseToSend = favCheeseMaker(favorites)
      res.set('Content-Type', 'application/json');
      res.status(200).json(cheeseToSend);
    }).catch((err) => { console.error(err) });
  })
}

function addFavorites(req, res) {
  const knex = require('../../knex.js');
  jwt.verify(req.body.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.set('Content-Type', 'application/json');
      res.status(401).send('Unauthorized');
    }
    const cheeseID = req.body.cheese_id;
    knex('favorites')
    .insert({
      user_id: payload.userId,
      cheese_id: cheeseID
    }, '*')
    .then((idHere) => {
      return knex('favorites')
          .join('users', 'users.id', '=', 'favorites.user_id')
          .join('cheeses', 'cheeses.id', '=', 'favorites.cheese_id')
          .join('animals', 'animals.id', '=', 'cheeses.animal_id')
          .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
          .select('cheeses.name', 'animals.animal', 'firmness.firmness', 'favorites.cheese_id', 'favorites.user_id', 'favorites.id', 'favorites.notes')
          .where('favorites.id', idHere[0].id)
    })
    .then((newFavorite) => {
      let favorite = [{
        favorite_id: newFavorite[0].id,
        name: newFavorite[0].name,
        firmness: newFavorite[0].firmness,
        animal: newFavorite[0].animal,
        cheese_id: newFavorite[0].cheese_id,
        user_id: newFavorite[0].user_id,
        notes: newFavorite[0].notes
      }]
      res.set('Content-Type', 'application/json');
      res.status(200).json(favorite);
    })
    .catch((error) => {
      console.error(error)
    });
  })
}

function addFavoritesNote(req, res) {
  const knex = require('../../knex.js');
  jwt.verify(req.body.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.set('Content-Type', 'application/json');
      res.status(401).send('Unauthorized');
    }
    const favoriteId = req.body.favorite_id;
    const newNote = req.body.notes;
    knex('favorites')
    .where('favorites.id', '=', favoriteId)
    .update({
      notes: newNote
    }).then((updatedFavorite) => {
      return knex('favorites')
      .join('users', 'users.id', '=', 'favorites.user_id')
      .join('cheeses', 'cheeses.id', '=', 'favorites.cheese_id')
      .join('animals', 'animals.id', '=', 'cheeses.animal_id')
      .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
      .select('cheeses.name', 'animals.animal', 'firmness.firmness', 'favorites.cheese_id', 'favorites.user_id', 'favorites.id', 'favorites.notes')
      .where('favorites.id', '=', favoriteId);
    })
    .then((newNote) => {
      let cheeseWithNote = [{
        favorite_id: newNote[0].id,
        name: newNote[0].name,
        firmness: newNote[0].firmness,
        animal: newNote[0].animal,
        cheese_id: newNote[0].cheese_id,
        user_id: newNote[0].user_id,
        notes: newNote[0].notes
      }]
      res.set('Content-Type', 'application/json');
      res.status(200).json(cheeseWithNote);
    }).catch((err) => { console.error(err); })
  })
}

function deleteFavorites(req, res) {
  const knex = require('../../knex.js');
  jwt.verify(req.body.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.set('Content-Type', 'application/json');
      res.status(401).send('Unauthorized');
    }
    const favToDelete = req.body.favorite_id;
      knex('favorites')
      .join('users', 'users.id', '=', 'favorites.user_id')
      .join('cheeses', 'cheeses.id', '=', 'favorites.cheese_id')
      .join('animals', 'animals.id', '=', 'cheeses.animal_id')
      .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
      .select('cheeses.name', 'animals.animal', 'firmness.firmness', 'favorites.cheese_id', 'favorites.user_id', 'favorites.id', 'favorites.notes')
      .where('favorites.id', '=', favToDelete)
      .then((deletedFavorite) => {
        knex('favorites').where('favorites.id', '=', favToDelete).del()
        let deletedCheese = [{
          favorite_id: deletedFavorite[0].id,
          name: deletedFavorite[0].name,
          firmness: deletedFavorite[0].firmness,
          animal: deletedFavorite[0].animal,
          cheese_id: deletedFavorite[0].cheese_id,
          user_id: deletedFavorite[0].user_id,
          notes: deletedFavorite[0].notes
        }]
        return deletedCheese
      })
      .then((sendDeleteCheese) => {
        res.set('Content-Type', 'application/json');
        res.status(200).json(sendDeleteCheese);
      })
      .catch((err) => {
        console.error(err);
    })
  })
}

module.exports = {
  getFavorites: getFavorites,
  addFavorites: addFavorites,
  addFavoritesNote: addFavoritesNote,
  deleteFavorites: deleteFavorites
}
