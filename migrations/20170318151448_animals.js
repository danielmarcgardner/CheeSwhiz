
exports.up = function(knex, Promise) {
  knex.schema.createTable('animals', (table) => {
    table.increments('id');
    table.string('animal').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('animals');
};
