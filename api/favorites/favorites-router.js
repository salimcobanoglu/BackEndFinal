const favMw = require("./favorites-middleware");
const router = require("express").Router();

// Favorites tablosundaki kullanıcının favori postlarını getiren
router.get("/user/:id", favMw.checkFavsByUserId, (req, res) => {
  res.json(req.favPosts);
});

// Favorites tablosundaki bir postu favori yapan kullanıcıları getiren
router.get("/post/:id", favMw.checkFavsByPostId, (req, res) => {
  res.json(req.favUsers);
});

module.exports = router;
