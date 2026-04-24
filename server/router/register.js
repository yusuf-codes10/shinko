import express from "express";
import { handleUser, logUserIn } from "../controllers/registerController.js";

const registerRouter = express.Router();

registerRouter.post("/", handleUser);

registerRouter.post("/login", logUserIn);

export default registerRouter;
