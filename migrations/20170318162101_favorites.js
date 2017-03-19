
exports.up = function(knex, Promise) {
  knex.schema.createTable('favorites', (table) => {
    table.increments('id');
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.integer('cheese_id').notNullable().references('id').inTable('cheeses');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('favorites');
};
