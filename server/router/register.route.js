import express from "express";
import { handleUser, logUserIn } from "../controllers/registerController.js";

const router = express.Router();

router.post("/", handleUser);

router.post("/login", logUserIn);

export default router;
