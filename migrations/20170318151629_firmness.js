
exports.up = function(knex, Promise) {
  knex.schema.createTable('firmness', (table) => {
    table.increments('id');
    table.string('firmness').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('firmness');
};
