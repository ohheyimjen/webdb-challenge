
exports.up = function(knex, Promise) {
  return knex.schema.createTable("items", tbl => {
    tbl.increments();
    tbl
      .string("name", 128)
      .notNullable()

    // foreign key
    tbl
      .integer("package_list_id")
      .unsigned()
      .references("id")
      .inTable("package_list")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl
    .string('description', 250)
    
    tbl
    .string('notes', 250)
  });
};

// remove table
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("items");
};


// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('items', tbl => {
//     tbl.increments();

//     tbl
//       .string('name', 128)
//       .string('description', 250)
//       .string('notes', 250)
  
//     // foreign key
//     tbl
//       .integer('packing_list_id')
//       .unsigned()
//       .references('id')
//       .inTable('packing_list')
//       .onDelete('CASCADE')
//       .onUpdate('CASCADE')
      

//   })
// };

// exports.down = function(knex, Promise) {
//   return knex.schema
//   .dropTableIfExists('items')
// };
