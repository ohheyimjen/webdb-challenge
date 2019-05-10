
exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', tbl => {
    tbl.increments();

    tbl
      .string('name', 128).notNullable()
      .string('description', 250).notNullable()
      .string('notes', 250)
      

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('items');
};
