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
  test("[1] Post(/register) ile kayıt olunuyor mu?", async () => {
    // Arrange
    const userData = {
      username: "gunsandroses",
      password: "123456",
      email: "gunsandroses@example.com",
    };

    // Act
    const response = await request(server)
      .post("/api/auth/register")
      .send(userData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("username", "gunsandroses");
    expect(response.body).toHaveProperty("email", "gunsandroses@example.com");
  });
});
