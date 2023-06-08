const favsModel = require("./favorites-model");

const checkFavsByUserId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const favPosts = await favsModel.getById(id);
    if (!favPosts || favPosts.length <= 0) {
      res.status(400).json({ message: `Favorite posts is not found.` });
    } else {
      req.favPosts = favPosts;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkFavsByPostId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const favUsers = await favsModel.getByPostId(id);
    if (!favUsers || favUsers.length <= 0) {
      res
        .status(400)
        .json({ message: `No user found who liked post id: ${id}.` });
    } else {
      req.favUsers = favUsers;
      next();
    }
  } catch (error) {
    next(error);
  }
};

//if the post favorited before
const isFavoritedBefore = async (req, res, next) => {
  const userId = req.params.user_id;
  const postId = req.params.post_id;
  const favPosts = await favsModel.getByPostId(postId);
  const isFavorited = favPosts.filter((post) => post.user_id == userId);

  if (isFavorited.length > 0) {
    res
      .status(400)
      .json({ message: `Post with the id: ${postId} is favorited before.` });
  } else {
    next();
  }
};

module.exports = { checkFavsByUserId, checkFavsByPostId, isFavoritedBefore };
