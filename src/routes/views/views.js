const { Router } = require("express");

const publicRoute = require("./public");
const mentorRoute = require("./mentor");
const menteeRoute = require("./mentee");

const router = Router();

router.use("/", publicRoute);
router.use("/mentor", mentorRoute);
router.use("/mentee", menteeRoute);

module.exports = router;
