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
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("favorites", (favorites) => {
      favorites.increments("favorite_id");
      favorites
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      favorites
        .integer("post_id")
        .unsigned()
        .notNullable()
        .references("post_id")
        .inTable("posts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("comments", (comments) => {
      comments.increments("comment_id");
      comments.timestamp("created_at").defaultTo(knex.fn.now());
      comments.string("body", 280).notNullable();
      comments.string("image_url");
      comments
        .integer("post_id")
        .notNullable()
        .references("post_id")
        .inTable("posts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      comments
        .integer("user_id")
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("tokenBlackList", (t) => {
      t.increments(), t.string("token").notNullable();
      t.timestamp("createdate").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("tokenBlackList")
    .dropTableIfExists("comments")
    .dropTableIfExists("favorites")
    .dropTableIfExists("posts")
    .dropTableIfExists("users");
};
