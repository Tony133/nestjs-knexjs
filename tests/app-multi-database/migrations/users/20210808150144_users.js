exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('firstName', 255).notNullable();
    table.string('lastName', 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
