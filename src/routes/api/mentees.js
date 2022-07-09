const { Router } = require("express");

const router = Router();

const {
  getMentees,
  getMenteeById,
  updateMenteeById,
  deleteMenteeById,
} = require("../../controllers/api/mentees");

router.post("/", getMentees);
router.get("/:id", getMenteeById);
router.put("/:id", updateMenteeById);
router.delete("/:id", deleteMenteeById);

module.exports = router;
