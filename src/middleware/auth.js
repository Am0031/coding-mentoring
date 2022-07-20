const auth = (req, res, next) => {
  if (req.session.isLoggedIn) {
    console.log(`[INFO]: User ${req.session.user.email} is in session`);
    return next();
  } else {
    res.redirect("/login");
  }
};

module.exports = auth;
