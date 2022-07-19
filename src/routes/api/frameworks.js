const { Router } = require("express");

const router = Router();

const {
  getAllFrameworks,
  deleteFrameworkByUserId,
  addFrameworkByUserId,
} = require("../../controllers/api/frameworks");

router.get("/", getAllFrameworks);
router.post("/user", addFrameworkByUserId);
router.delete("/user/:id", deleteFrameworkByUserId);

module.exports = router;
