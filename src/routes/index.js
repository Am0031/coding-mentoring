const { Router } = require("express");

const apis = require("./api/api");
const views = require("./views/views");

const router = Router();

router.use("/api", apis);
router.use("/", views);

module.exports = router;
