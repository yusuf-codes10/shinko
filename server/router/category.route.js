import express from "express";
import authMw from "../middlewares/authMiddleWare.js";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

// create a category
router.post("/", authMw, createCategory);

// get all categories
router.get("/", authMw, getCategories);

// deelte a category
router.delete("/:id", authMw, deleteCategory);

export default router;
