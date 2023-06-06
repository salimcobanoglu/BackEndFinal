/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username").notNullable().unique();
      users.string("password").notNullable();
      users.string("email").notNullable().unique();
      users.string("avatar_url");
    })
    .createTable("posts", (posts) => {
      posts.increments("post_id");
      posts.string("body", 300);
      posts.timestamp("created_at").defaultTo(knex.fn.now());
      posts.string("image_url");
      posts
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    })
    .createTable("favorites", (favorites) => {
      favorites.increments("favorite_id");
      favorites
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
      favorites
        .integer("post_id")
        .unsigned()
        .notNullable()
        .references("post_id")
        .inTable("posts")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema
    .dropTableIfExists("favorites")
    .dropTableIfExists("posts")
    .dropTableIfExists("users");
};

//   .createTable("users", function (table) {
//     table.increments("user_id");
//     table.string("username").notNullable().unique();
//     table.string("password").notNullable();
//     table.string("avatar_url").notNullable();
//     table.string("email").notNullable().unique();
//   });
// };
