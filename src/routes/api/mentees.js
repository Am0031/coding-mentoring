const { Router } = require("express");

const router = Router();

const {
  getAllMentees,
  getMenteeById,
  updateMenteeById,
  deleteMenteeById,
} = require("../../controllers/api/mentees");

router.get("/", getAllMentees);
router.get("/:id", getMenteeById);
router.put("/:id", updateMenteeById);
router.delete("/:id", deleteMenteeById);

module.exports = router;
