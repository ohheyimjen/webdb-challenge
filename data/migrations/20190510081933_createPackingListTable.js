
exports.up = function(knex, Promise) {
  return knex.schema.createTable('packing_list', tbl => {
    tbl.increments();

    tbl
      .string('name', 128).notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('packing_list');
};
