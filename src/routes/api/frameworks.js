const { Router } = require("express");

const router = Router();

const { getAllFrameworks } = require("../../controllers/api/frameworks");

router.get("/", getAllFrameworks);

module.exports = router;
