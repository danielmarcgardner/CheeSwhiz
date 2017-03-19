
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cheeses').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('cheeses').insert({
          id: 1,
          name: 'cow/hard',
          animal_id: 1,
          firmness_id: 1,
          user_id: ,
        }),
        knex('cheeses').insert({
          id: 2,
          name: 'cow/semihard',
          animal_id: 1,
          firmness_id: 2,
          user_id: ,
        }),
        knex('cheeses').insert({
          id: 3,
          name: 'cow/semisoft',
          animal_id: 1,
          firmness_id: 3,
          user_id: ,
        }),
        knex('cheeses').insert({
          id: 4,
          name: 'cow/soft',
          animal_id: 1,
          firmness_id: 4,
          user_id: ,
        }),
        knex('cheeses').insert({
          id: 5,
          name: 'goat/hard',
          animal_id: 2,
          firmness_id: 1,
          user_id: ,
        }),
        knex('cheeses').insert({
          id: 6,
          name: 'goat/semihard',
          animal_id: 2,
          firmness_id: 2,
          user_id: ,
        }),
        knex('cheeses').insert({
          id: 7,
          name: 'goat/semisoft',
          animal_id: 2,
          firmness_id: 3,
          user_id: ,
        }),
        knex('cheeses').insert({
          id: 8,
          name: 'goat/soft',
          animal_id: 2,
          firmness_id: 4,
          user_id: ,
        }),
        knex('cheeses').insert({
          id: 9,
          name: 'sheep/hard',
          animal_id: 3,
          firmness_id: 1,
          user_id: ,
        }),
        knex('cheeses').insert({
          id: 10,
          name: 'sheep/semihard',
          animal_id: 3,
          firmness_id: 2,
          user_id: ,
        }),
        knex('cheeses').insert({
          id: 11,
          name: 'sheep/soft',
          animal_id: 3,
          firmness_id: 4,
          user_id: ,
        }),
        knex('cheeses').insert({
          id: 12,
          name: 'buffalo/semisoft',
          animal_id: 4,
          firmness_id: 3,
          user_id: ,
        }),
        knex('cheeses').insert({
          id: 13,
          name: 'buffalo/soft',
          animal_id: 4,
          firmness_id: 4,
          user_id: ,
        })
      ]);
    });
};
