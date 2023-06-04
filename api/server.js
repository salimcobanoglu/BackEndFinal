const express = require("express");
const server = express();

// const projectRouter = require("./project/router");

server.use(express.json());

// server.use("/api/projects", projectRouter);

server.get("/", (reg, res) => {
  res.json({ message: "welcome to my app!..." });
});

module.exports = server;