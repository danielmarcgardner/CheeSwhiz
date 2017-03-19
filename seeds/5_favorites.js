
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('favorites').insert({
          id: 1,
          user_id: 1,
          cheese_id: 58
        }),
        knex('favorites').insert({
          id: 2,
          user_id: 1,
          cheese_id: 15
        }),
        knex('favorites').insert({
          id: 3,
          user_id: 2,
          cheese_id: 54
        }),
        knex('favorites').insert({
          id: 4,
          user_id: 2,
          cheese_id: 51
        }),
        knex('favorites').insert({
          id: 5,
          user_id: 3,
          cheese_id: 47
        }),
        knex('favorites').insert({
          id: 6,
          user_id: 3,
          cheese_id: 21
        }),
        knex('favorites').insert({
          id: 7,
          user_id: 4,
          cheese_id: 54
        })
        knex('favorites').insert({
          id: 8,
          user_id: 4,
          cheese_id: 36
        }),
      ]);
    }).then(function() {
      return knex.raw(`SELECT setval('favorites_id_seq', (SELECT MAX(id) FROM favorites))`);
    });
};
