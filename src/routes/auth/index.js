const { Router } = require("express");

const { login, logout, signup } = require("../../controllers/auth");

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

module.exports = router;
