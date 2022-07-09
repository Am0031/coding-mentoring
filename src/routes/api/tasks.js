const { Router } = require("express");

const router = Router();

const {
  getTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
} = require("../../controllers/api/tasks");

router.post("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTaskById);
router.delete("/:id", deleteTaskById);

module.exports = router;
