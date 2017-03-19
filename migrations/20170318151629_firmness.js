'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('firmness', (table) => {
    table.increments('id');
    table.string('firmness').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('firmness');
};
