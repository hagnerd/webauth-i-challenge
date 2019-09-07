const router = require("express").Router();
const User = require("../controllers/user");
const restricted = require("../middleware/restricted");

router.get("/", restricted, async (_req, res) => {
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
