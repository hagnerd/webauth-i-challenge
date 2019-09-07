const db = require("../db");

async function register(user) {
  const [id] = await db.from("users").insert(user);

  return id ? id : null;
}

function getAll() {
  return db.select("*").from("users");
}

async function userExists(username) {
  const [user] = await db
    .select("*")
    .from("users")
    .where({ username });

  return !!user;
}

async function findByUsername(username) {
  const [user] = await db
    .select("*")
    .from("users")
    .where({ username });

  return user ? user : null;
}

module.exports = {
  register,
  getAll,
  userExists,
  findByUsername
};
