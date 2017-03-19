
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('animals').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('animals').insert({ id: 1, animal: 'cow'}),
        knex('animals').insert({ id: 2, animal: 'goat'}),
        knex('animals').insert({ id: 3, animal: 'sheep'}),
        knex('animals').insert({ id: 4, animal: 'buffalo'})
      ]);
    });
};
