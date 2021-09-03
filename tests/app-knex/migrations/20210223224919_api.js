exports.up = function (knex) {
  return knex.schema.createTable('user', function (table) {
    table.increments('id');
    table.string('firstName', 255).notNullable();
    table.string('lastName', 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};
