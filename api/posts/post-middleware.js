const validator = require("validator");
const tokenHelper = require("../../helper/token-helper");

function isImageUrl(url) {
  return (
    validator.isURL(url) &&
    (url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png"))
  );
}

const checkPayload = (req, res, next) => {
  try {
    const { body, image_url } = req.body;
    const isUrl = isImageUrl(image_url);

    if (
      (body.length > 0 && body.length <= 300) ||
      (isUrl && image_url.length > 0)
    ) {
      next();
    } else if (body.length > 300) {
      res
        .status(400)
        .json({ mesasage: "Text cannot be more than 300 characters." });
    } else if (!isUrl) {
      res.status(400).json({ mesasage: "URL is not valid." });
    } else {
      res.status(400).json({ mesasage: "Text or image_url is must." });
    }
  } catch (error) {
    next(error);
  }
};
const isUserAllowed = async (req, res, next) => {
  try {
    const payload = tokenHelper.decodeTokensPayload(
      req.headers["authorization"]
    );
    const userId = req.body.user_id;
    if (payload.user_id == userId) {
      next();
    } else {
      res.status(400).json({
        message: `User with id:${payload.user_id} is not allowed.`,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { checkPayload, isUserAllowed };
