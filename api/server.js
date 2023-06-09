const express = require("express");
const server = express();
const authRouter = require("../api/auth/auth-router");
const usersRouter = require("./users/users-router");
const postsRouter = require("../api/posts/post-router");
const favoritesRouter = require("../api/favorites/favorites-router");
const commentsRouter = require("../api/comments/comments-router");
const helmet = require("helmet");
const cors = require("cors");

server.use(cors());
server.use(helmet()); //  web uygulamalarını çeşitli güvenlik saldırılarına karşı korur.
server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);
server.use("/api/favorites", favoritesRouter);
server.use("/api/comments", commentsRouter);
// server.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // Tüm kaynaklara erişime izin verir (Dikkat: Güvenlik riski oluşturabilir)
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // İzin verilen HTTP yöntemleri
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   ); // İzin verilen başlıklar
//   next();
// });

server.get("/", (reg, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  res.json({ message: "welcome to my app!..." });
});

module.exports = server;
