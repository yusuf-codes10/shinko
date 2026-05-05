import express from "express";
import authMw from "../middlewares/authMiddleWare.js";
import {
  getAllUserProjects,
  createNewProject,
  getCompletedTasksCount,
} from "../controllers/projectsController.js";

const router = express.Router();

// get all projects for the user
router.get("/", authMw, getAllUserProjects);

// create a new project
router.post("/", authMw, createNewProject);

// stats
router.get("/:id/count", authMw, getCompletedTasksCount);

export default router;
