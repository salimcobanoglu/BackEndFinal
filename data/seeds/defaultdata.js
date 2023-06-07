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
  // await knex("comments").insert([
  //   { body: "This is a great article!", user_id: 1, post_id: 7 },
  //   { body: "Thank you, it was very helpful.", user_id: 1, post_id: 6 },
  //   {
  //     body: "Seems like there is missing information.",
  //     user_id: 1,
  //     post_id: 5,
  //   },
  //   { body: "Exactly what I was looking for!", user_id: 2, post_id: 7 },
  //   {
  //     body: "I have a question regarding this topic.",
  //     user_id: 2,
  //     post_id: 6,
  //   },
  //   {
  //     body: "I disagree with some points mentioned here.",
  //     user_id: 2,
  //     post_id: 5,
  //   },
  //   { body: "Well written and easy to understand.", user_id: 3, post_id: 1 },
  //   { body: "I would love to see more examples.", user_id: 3, post_id: 2 },
  //   { body: "Great job, keep up the good work!", user_id: 3, post_id: 3 },
  //   {
  //     body: "I found a typo in the second paragraph.",
  //     user_id: 3,
  //     post_id: 4,
  //   },
  // ]);
};
