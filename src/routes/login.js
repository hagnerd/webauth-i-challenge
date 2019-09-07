const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("../controllers/user");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  let user = await User.findByUsername(username);

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user.id;

    res.status(200).json({
      message: `Logged in`
    });

    return;
  } else {
    res.status(401).json({
      message: "Incorrect username or password"
    });
  }
});

module.exports = router;
