const express = require("express");
const server = express();
const authRouter = require("../api/auth/auth-router");
const usersRouter = require("./users/users-router");
const postsRouter = require("../api/posts/post-router");
const favoritesRouter = require("../api/favorites/favorites-router");
const commentsRouter = require("../api/comments/comments-router");

server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);
server.use("/api/favorites", favoritesRouter);
server.use("/api/comments", commentsRouter);

server.get("/", (reg, res) => {
  res.json({ message: "welcome to my app!..." });
});

module.exports = server;
