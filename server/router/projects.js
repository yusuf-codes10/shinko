import express from "express";
import pool from "../db/pool.js";

const projectsRouter = express.Router();

projectsRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM project");
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "not found" });
  }
});

export default projectsRouter;
