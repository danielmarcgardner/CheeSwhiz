
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('favorites').insert({ id: 1, animal: 'cow'}),
        knex('favorites').insert({ id: 2, animal: 'buffalo'}),
        knex('favorites').insert({ id: 3, animal: 'goat'}),
        knex('favorites').insert({ id: 4, animal: 'sheep'})
      ]);
    });
};
