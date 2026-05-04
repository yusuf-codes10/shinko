import express from "express";
import authMw from "../middlewares/authMiddleWare.js";
import {
  getAllUserProjects,
  createNewProject,
} from "../controllers/projectsController.js";
import { countCompletedTasksByProject } from "../repositories/project.repository.js";

const router = express.Router();

// get all projects for the user
router.get("/", authMw, getAllUserProjects);

// create a new project
router.post("/", authMw, createNewProject);

// stats
router.get("/count", authMw, countCompletedTasksByProject);

export default router;
