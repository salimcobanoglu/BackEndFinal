const router = require("express").Router();
const userModel = require("./users-model");
const favMw = require("../favorites/favorites-middleware");
const commentsMw = require("../comments/comments-middleware");

//get all users w/o pass
router.get("/", async (req, res) => {
  try {
    const users = await userModel.getAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the resources." });
  }
});

//get user w id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.getById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

//delete user
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.remove(id);
    if (!deletedUser) {
      res.status(400).json({ message: `User with id: ${id} is not found.` });
    } else {
      res.status(200).json({ message: "User removed successfully." });
    }
  } catch (error) {
    next(error);
  }
});

// brings users favorited posts
router.get(
  "/:id/favorites",
  favMw.checkFavsByUserId,
  async (req, res, next) => {
    try {
      res.status(200).json(req.favPosts);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id/comments",
  commentsMw.checkCommentsByUserId,
  async (req, res, next) => {
    try {
      res.status(200).json(req.comments);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
