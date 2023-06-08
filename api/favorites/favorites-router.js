const router = require("express").Router();
const favModel = require("./favorites-model");
const favMw = require("./favorites-middleware");

// add to favorites
router.post("/:user_id/:post_id", async (req, res, next) => {
  try {
    const userId = req.params.user_id;
    const postId = req.params.post_id;
    if (userId && postId) {
      await favModel.create(userId, postId);
      res.status(200).json({ message: "Post added to favorites." });
    } else {
      res.status(400).json({ message: "Cannot add to favorites." });
    }
  } catch (error) {
    next(error);
  }
});

// gel all favorites
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const favorites = await favModel.getAll(id);
    res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:user_id/:post_id",
  // favMw.isFavoritedBefore,
  async (req, res, next) => {
    try {
      const userId = req.params.user_id;
      const postId = req.params.post_id;
      if (userId && postId) {
        await favModel.remove(userId, postId);
        res.status(200).json({ message: "Post removed from favorites." });
      } else {
        res.status(400).json({ message: "Cannot remove from favorites." });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
