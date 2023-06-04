/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", function(table){
table.increments("user_id");
table.string("username").notNullable().unique();
table.string("password").notNullable();
table.string("avatar_url").notNullable();
table.string("email").notNullable().unique();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
