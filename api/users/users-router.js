const router = require("express").Router();
const userModel = require("./users-model");

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

//id ile istek calismadi, debug yapalim.
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.getById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
