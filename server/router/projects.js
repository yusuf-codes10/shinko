import express from "express";
import pool from "../db/pool.js";
import authMw from "../middlewares/authMiddleWare.js";

const projectsRouter = express.Router();

projectsRouter.get("/", authMw, async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM project");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// TODO: we have to update the project get req too, relative to the user
// TODO: next is sign up and auth

export default projectsRouter;
