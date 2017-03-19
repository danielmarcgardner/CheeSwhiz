
exports.up = function(knex, Promise) {
  knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('email').notNullable().defaultTo('');
    table.string('hashed_password').notNullable();
    table.boolean('super').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('users');
};
