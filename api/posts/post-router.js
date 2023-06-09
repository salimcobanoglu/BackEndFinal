const router = require("express").Router();
const postModel = require("./post-model");
const mw = require("./post-middleware");
const restricted = require("../middleware/restricted");

// Gel all posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await postModel.getAll();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

//Create new post
router.post(
  "/",
  restricted,
  mw.isUserAllowed,
  mw.checkPayload,
  async (req, res, next) => {
    try {
      const { body, image_url, user_id } = req.body;
      const newPost = { user_id: user_id, body: body, image_url: image_url };
      const insertedPost = await postModel.create(newPost);
      if (!insertedPost) {
        next(error);
      } else {
        res
          .status(200)
          .json({ message: "New post successfully submitted.", insertedPost });
      }
    } catch (error) {
      next(error);
    }
  }
);

//Update post

router.put("/:id", mw.checkPayload, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { body, image_url, user_id } = req.body;
    const newPost = {
      user_id: user_id,
      body: body,
      image_url: image_url,
    };
    const updatedPost = await postModel.update(id, newPost);
    if (!updatedPost) {
      next(error);
    } else {
      res
        .status(200)
        .json({ message: "Edited post successfully submitted.", updatedPost });
    }
  } catch (error) {
    next(error);
  }
});

//Delete post

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedPost = await postModel.remove(id);
    if (!deletedPost) {
      res.status(400).json({ message: `Post with id: ${id} is not found.` });
    } else {
      res.status(200).json({ message: "Post removed successfully." });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
