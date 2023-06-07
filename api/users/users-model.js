const db = require("../../data/dbconfig");

async function getAll() {
  return db("users").select(
    "users.user_id",
    "users.username",
    "users.email",
    "users.avatar_url"
  );
}

function getById(id) {
  return db("users").where("user_id", id).first();
}

function getBy(filter) {
  return db("users").where(filter).first();
}

async function create(user) {
  const insertedUser = await db("users").insert(user);
  return getById(insertedUser[0]);
}

module.exports = {
  getAll,
  getById,
  create,
  getBy,
};
