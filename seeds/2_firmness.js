
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('firmness').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('firmness').insert({ id: 1, animal: 'hard' }),
        knex('firmness').insert({ id: 2, animal: 'semi-hard' }),
        knex('firmness').insert({ id: 3, animal: 'semi-soft' }),
        knex('firmness').insert({ id: 4, animal: 'soft' })
      ])
    }).then(function() {
      return knex.raw(`SELECT setval('favorites_id_seq', (SELECT MAX(id) FROM favorites))`);
    });
};
