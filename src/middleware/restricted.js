function restricted(req, res, next) {
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

module.exports = restricted;
