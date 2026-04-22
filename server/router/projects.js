import express from "express";
import pool from "../db/pool.js";

const projectsRouter = express.Router();

projectsRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM project");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "not found" });
  }
});

// TODO: we have to update the project get req too, relative to the user
// TODO: next is sign up and auth

export default projectsRouter;
