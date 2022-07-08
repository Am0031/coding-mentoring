const { Router } = require("express");

const router = Router();

const {
  getAllMentees,
  getMenteeById,
  createMentee,
  updateMenteeById,
  deleteMenteeById,
} = require("../../controllers/api/mentees");

router.get("/", getAllMentees);
router.get("/:id", getMenteeById);
router.post("/", createMentee);
router.put("/:id", updateMenteeById);
router.delete("/:id", deleteMenteeById);

module.exports = router;
