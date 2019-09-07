const router = require("express").Router();
const User = require("../controllers/user");

function protected(req, res, next) {
  const { user } = req.session;

  if (!user) {
    res.status(401).json({
      message: "You shall not pass!"
    });
    return;
  } else {
    next();
  }
}

router.get("/", protected, async (_req, res) => {
  try {
    const users = await User.getAll();

    res.json({
      users
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      message: err.message
    });
  }
});

module.exports = router;
