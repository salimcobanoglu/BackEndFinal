const db = require("./data/dbconfig");
const request = require("supertest");
const server = require("./api/server");

afterAll(async () => {
  await db.destroy();
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});

describe("UserTestler", () => {
  test("[1] Get methoduyla tüm görevler geliyor mu", async () => {
    //act
    const allGorevs = await request(server).get("/api/users");
    //assert
    expect(allGorevs.statusCode).toBe(200);
  });
});
test("[2] Post(/register) ile kayıt olunuyor mu?", async () => {
  // Arrange
  const userData = {
    username: "deneme1",
    password: "1234567",
    email: "deneme1@example.com",
    avatar_url: "avatar1.jpg",
  };

  // Act
  const response = await request(server)
    .post("/api/auth/register")
    .send(userData);

  // Assert
  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty("username", userData.username);
  expect(response.body).toHaveProperty("email", userData.email);
  expect(response.body).toHaveProperty("avatar_url", userData.avatar_url);
});
test("[3] post methodu user id ve post id ile yorum ekliyor mu", async () => {
  //arrange
  let commentData = {
    body: "Algoritma Öğren",
    user_id: 2,
    post_id: 2,
  };
  //act
  const response = await request(server)
    .post("/api/comments/2/2")
    .send(commentData);
  //assert
  expect(response.status).toBe(200);
  expect(response.body.addedComment).toHaveProperty("body", commentData.body);
  expect(response.body.addedComment).toHaveProperty(
    "user_id",
    commentData.user_id
  );
  expect(response.body.addedComment).toHaveProperty(
    "post_id",
    commentData.post_id
  );
});
