import express from "express";
import authMw from "../middlewares/authMiddleWare.js";
import {
  createCategory,
  getCategories,
} from "../controllers/category.controller.js";

const router = express.Router();

// create a category
router.post("/", authMw, createCategory);

// get all categories
router.get("/", authMw, getCategories);

export default router;
