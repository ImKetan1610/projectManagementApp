const express = require("express");
const {
  getUserTask,
  createTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../config/authMiddleware");
const router = express.Router();

router.get("/", protect, getUserTask);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTaskStatus);
router.delete("/:id", protect, deleteTask);

module.exports = router;
