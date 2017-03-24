'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', (table) => {
    table.increments('id');
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.integer('cheese_id').notNullable().references('id').inTable('cheeses').onDelete('CASCADE');
    table.string('notes');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites');
};
