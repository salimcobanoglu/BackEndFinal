/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").truncate();
  await knex("posts").truncate();
  await knex("favorites").truncate();
  // await knex("comments").truncate();

  await knex("users").insert([
    {
      username: "user1",
      password: "password1",
      email: "user1@example.com",
      avatar_url: "avatar1.jpg",
    },
    {
      username: "user2",
      password: "password2",
      email: "user2@example.com",
      avatar_url: "avatar2.jpg",
    },
    {
      username: "user3",
      password: "password3",
      email: "user3@example.com",
      avatar_url: "avatar3.jpg",
    },
  ]);
  await knex("posts").insert([
    {
      body: "Post body 1",
      image_url: "image1.jpg",
      user_id: 1,
    },
    {
      body: "Post body 2",
      image_url: "image2.jpg",
      user_id: 2,
    },
    {
      body: "Post body 3",
      image_url: "image3.jpg",
      user_id: 3,
    },
  ]);
  await knex("favorites").insert([
    {
      user_id: 1,
      post_id: 2,
    },
    {
      user_id: 2,
      post_id: 3,
    },
    {
      user_id: 3,
      post_id: 1,
    },
  ]);
  await knex("comments").insert([
    { body: "Bu yazı gerçekten harika!", user_id: 1, post_id: 2 },
    { body: "Teşekkür ederim, çok yardımcı oldu.", user_id: 1, post_id: 1 },
    {
      body: "Sanırım eksik bilgiler var.",
      user_id: 1,
      post_id: 3,
    },
    { body: "Tam da aradığım şey!", user_id: 2, post_id: 2 },
    {
      body: "Bu konuyla ilgili bir sorum var.",
      user_id: 2,
      post_id: 3,
    },
    {
      body: "Burada bahsedilen bazı noktalara katılmıyorum.",
      user_id: 2,
      post_id: 1,
    },
    { body: "Güzel yazılmış ve anlaşılır.", user_id: 3, post_id: 1 },
    { body: "Daha fazla örnek görmek isterim.", user_id: 3, post_id: 2 },
    { body: "Harika iş, iyi çalışmaya devam!", user_id: 3, post_id: 3 },
    {
      body: "İkinci paragrafta bir yazım hatası buldum.",
      user_id: 3,
      post_id: 2,
    },
  ]);
};
