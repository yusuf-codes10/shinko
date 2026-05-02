import express from "express";
import {
  getTodosById,
  getProgressById,
  getDonesById,
  createNewTask,
  deleteTask,
  updateTask,
  getTaskById,
} from "../controllers/tasksController.js";

const router = express.Router();

router.get("/todo/:id", getTodosById);

router.get("/progress/:id", getProgressById);

router.get("/done/:id", getDonesById);

// ? Forgot the point of this
router.get("/:id", getTaskById);

router.post("/:id", createNewTask);

router.delete("/:id", deleteTask);

router.put("/:id", updateTask);

export default router;
