const router = require("express").Router();
const userModel = require("./users-model");

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

//get user w id
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

module.exports = router;
