
exports.up = function(knex, Promise) {
  knex.schema.createTable('cheeses', (table) => {
    table.increments('id');
    table.string('name').notNullable().defaultTo('');
    table.integer('animal_id').notNullable().references('id').inTable('animals').onDelete('CASCADE');
    table.integer('firmness_id').notNullable().references('id').inTable('firmness').onDelete('CASCADE');
    table.integer('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('cheeses');
};
