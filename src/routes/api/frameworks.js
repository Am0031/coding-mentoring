const { Router } = require("express");

const router = Router();

const {
  getAllFrameworks,
  deleteFrameworkByUserId,
  addFrameworkByUserId,
  getFrameworksByUserId,
} = require("../../controllers/api/frameworks");

router.get("/", getAllFrameworks);
router.get("/user", getFrameworksByUserId);
router.post("/user", addFrameworkByUserId);
router.delete("/user/:id", deleteFrameworkByUserId);

module.exports = router;
