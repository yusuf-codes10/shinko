import express from "express";
import authMw from "../middlewares/authMiddleWare.js";
import { createCategory } from "../controllers/category.controller.js";

const router = express.Router();

// create a category
router.post("/", authMw, createCategory);

export default router;
