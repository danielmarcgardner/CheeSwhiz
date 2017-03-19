'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('animals', (table) => {
    table.increments('id');
    table.string('animal').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('animals');
};
