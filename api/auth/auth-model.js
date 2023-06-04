const db = require("../../data/dbconfig");

function getAll() {
  return db("users");
}

function getById(id) {
  return db("users").where("id", id).first();
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
