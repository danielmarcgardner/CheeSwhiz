
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('users').insert({
          id: 1,
          email: 'reidpierredelahunt@gmail.com',
          hashed_password: '$2a$10$MRUMlhoWF9v7OwC53j.x3OL/R7FNmxbjHO30ZxOpPeHx.esnpSxtO', //cheese1
          super: true
        }),
        knex('users').insert({
          id: 2,
          email: 'daniel.marc.gardner@gmail.com',
          hashed_password: '$2a$10$ndDF1KKZ49JMiDPn5c9xI.rqICqIm72l4bMxLQ4xTZmpk9qM0YCTq', //cheese2
          super: true
        }),
        knex('users').insert({
          id: 3,
          email: 'hamid@galvanize.com',
          hashed_password: '$2a$10$CtAplCADL7eJPYKwomK6huS5/d48VDbEW2xaiITltch6cAZiHqzsi', //cheese3
          super: false
        }),
        knex('users').insert({
          id: 4,
          email: 'marylychee@gmail.com',
          hashed_password: '$2a$10$jT3FoTu2zmqydmtrk06j6.UVaFMHOQ3VfrEsv9/ESTv4uJch.PShy', //cheese4
          super: false
        })
      ]);
    }).then(function() {
      return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`);
    });
};
