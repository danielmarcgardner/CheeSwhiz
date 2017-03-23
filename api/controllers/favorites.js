'use strict';
const SwaggerExpress = require('swagger-express-mw');
const jwt = require('jsonwebtoken');

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
    .select('cheeses.name', 'animals.animal', 'firmness.firmness', 'cheeses.id', 'favorites.user_id', 'favorites.id', 'favorites.notes')
    .where('users.id', '=', payload.userId)
    .then((favorites) => {
      res.set('Content-Type', 'application/json');
      res.status(200).json(favorites);
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
    }).then(() => {
      return knex('favorites')
      .join('users', 'users.id', '=', 'favorites.user_id')
      .join('cheeses', 'cheeses.id', '=', 'favorites.cheese_id')
      .join('animals', 'animals.id', '=', 'cheeses.animal_id')
      .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
      .select('cheeses.name', 'animals.animal', 'firmness.firmness', 'cheeses.id', 'favorites.user_id', 'favorites.favorite_id', 'favorites.notes')
      .where('users.id', '=', payload.userId)
      .andWhere('favorites.cheese_id', '=', cheeseID);
    })
    .then((newFavorite) => {
      res.set('Content-Type', 'application/json');
      res.status(200).json(newFavorite);
    })
  }).catch((err) => { console.error(err) });
}

function addFavoritesNote(req, res) {
  const knex = require('../../knex.js');
  jwt.verify(req.body.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.set('Content-Type', 'application/json');
      res.status(401).send('Unauthorized');
    }
    const favoriteId = req.body.favorite_id;
    const newNote = req.body.note;
    knex('favorites')
    .where('favorites.id', '=', favoriteId)
    .update({
      note: newNote
    }).then((updatedFavorite) => {
      return knex('favorites')
      .join('users', 'users.id', '=', 'favorites.user_id')
      .join('cheeses', 'cheeses.id', '=', 'favorites.cheese_id')
      .join('animals', 'animals.id', '=', 'cheeses.animal_id')
      .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
      .select('cheeses.name', 'animals.animal', 'firmness.firmness', 'cheeses.id', 'favorites.user_id', 'favorites.favorite_id', 'favorites.note')
      .where('favorites.id', '=', favoriteId);
    })
    .then((newFavorite) => {
      res.set('Content-Type', 'application/json');
      res.status(200).json(newFavorite);
    }).catch((err) => { console.error(err); })
  })
}

function deleteFavorites(req, res) {
  const knex = require('../../knex.js');
  console.log('here');
  jwt.verify(req.body.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.set('Content-Type', 'application/json');
      res.status(401).send('Unauthorized');
    }
    const favToDelete = req.body.favorite_id;
    knex('favorites')
    .where('favorites.id', '=', favToDelete)
    .del()
    .then(() => {
      knex('favorites')
      .join('users', 'users.id', '=', 'favorites.user_id')
      .join('cheeses', 'cheeses.id', '=', 'favorites.cheese_id')
      .join('animals', 'animals.id', '=', 'cheeses.animal_id')
      .join('firmness', 'firmness.id', '=', 'cheeses.firmness_id')
      .select('cheeses.name', 'animals.animal', 'firmness.firmness', 'cheeses.id', 'favorites.user_id', 'favorites.favorite_id', 'favorites.note')
      .where('favorites.id', '=', favToDelete)
      .then((deletedFavorite) => {
        res.set('Content-Type', 'application/json');
        res.status(200).json(deletedFavorite);
      }).catch((err) => {
        console.error(err);
      })
    })

  }).catch((err) => { console.error(err) });
}

module.exports = {
  getFavorites: getFavorites,
  addFavorites: addFavorites,
  addFavoritesNote: addFavoritesNote,
  deleteFavorites: deleteFavorites
}
