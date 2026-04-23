import express from "express";
import handleUser from "../controllers/registerController.js";

const router = express.Router();

router.post("/register", handleUser);
