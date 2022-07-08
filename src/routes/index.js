const { Router } = require("express");
const auth = require("./auth");
const api = require("./api");
const views = require("./views");

const router = Router();

router.use("/api", api);
router.use("/auth", auth);
router.use("/", views);

module.exports = router;
