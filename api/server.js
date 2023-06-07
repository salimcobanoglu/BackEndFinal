const express = require("express");
const server = express();
const authRouter = require("../api/auth/auth-router");
const usersRouter = require("./users/users-router");
const postsRouter = require("../api/posts/post-router");

server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

server.get("/", (reg, res) => {
  res.json({ message: "welcome to my app!..." });
});

module.exports = server;
