const express = require("express");
const server = express();
const authRouter = require("../api/auth/auth-router");

server.use(express.json());
server.use("/api", authRouter);

server.get("/", (reg, res) => {
  res.json({ message: "welcome to my app!..." });
});

module.exports = server;
