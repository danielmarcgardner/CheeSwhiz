'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('email').notNullable().defaultTo('');
    table.string('hashed_password').notNullable();
    table.boolean('super').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
