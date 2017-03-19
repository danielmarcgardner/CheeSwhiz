
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('firmness').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('firmness').insert({ id: 1, firmness: 'hard' }),
        knex('firmness').insert({ id: 2, firmness: 'semi-hard' }),
        knex('firmness').insert({ id: 3, firmness: 'semi-soft' }),
        knex('firmness').insert({ id: 4, firmness: 'soft' })
      ])
    }).then(function() {
      return knex.raw(`SELECT setval('firmness_id_seq', (SELECT MAX(id) FROM firmness))`);
    });
};
