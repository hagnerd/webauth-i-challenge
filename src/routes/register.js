const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../controllers/user");

function validateRegistration(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      message: "Please provide a username and password when registering"
    });
  } else {
    next();
  }
}

async function validateNewUser(req, res, next) {
  const { username } = req.body;

  const userExists = await User.userExists(username);

  if (userExists) {
    res.status(400).json({
      message: "Username already exists in the database"
    });
    return;
  } else {
    next();
  }
}

router.post("/", [validateRegistration, validateNewUser], async (req, res) => {
  const { username, password: raw } = req.body;
  const password = bcrypt.hashSync(raw, 16);

  try {
    const userId = await User.register({ username, password });

    // Come back and change this to send back a cookie
    res.status(201).json({
      message: "Successfully created user with id " + userId
    });
  } catch (err) {
    res.status(500).json({
      error: "internal server error",
      message: err.message
    });
  }
});

module.exports = router;
