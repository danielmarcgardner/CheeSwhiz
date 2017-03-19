
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('users').insert({
          id: 1,
          email: 'reidpierredelahunt@gmail.com',
          hashed_password: '',
          super: true
        }),
        knex('users').insert({
          id: 2,
          email: 'daniel.marc.gardner@gmail.com',
          hashed_password: '',
          super: true
        })//,
        /*knex('users').insert({
          id: 3,
          email: '',
          hashed_password: '',
          super: false
        }),
        knex('users').insert({
          id: 4, true
          email: '',
          hashed_password: '',
          super: false
        })*/
      ]);
    });
};
