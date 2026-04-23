import express from "express";
import handleUser from "../controllers/registerController.js";

const registerRouter = express.Router();

registerRouter.post("/", handleUser);

export default registerRouter;
