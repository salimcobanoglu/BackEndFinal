const express = require("express");
const server = express();
const authRouter = require("../api/auth/auth-router");
const usersRouter = require("./users/users-router");

server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (reg, res) => {
  res.json({ message: "welcome to my app!..." });
});

module.exports = server;
