import express from "express";
import pool from "../db/pool.js";

const projectsRouter = express.Router();

const projectList = [
  {
    id: 1,
    name: "pro 1",
  },
  {
    id: 2,
    name: "pro 2",
  },
];

projectsRouter.get("/", (req, res) => {
  res.status(200).json(projectList);
});

export default projectsRouter;
