import pool from "../db/pool.js";
import { countCompletedTasksByProject } from "../repositories/project.repository.js";

export const getAllUserProjects = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const { rows } = await pool.query(
      `SELECT p.*,
        COUNT(t.id) FILTER (WHERE t.status = 'done') AS completed_count,
        COUNT(t.id) AS total_count
       FROM project p
       LEFT JOIN task t ON t.project_id = p.id
       WHERE p.user_id = $1
       GROUP BY p.id`,
      [userId],
    );

    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createNewProject = async (req, res, next) => {
  const { name } = req.body;
  const userId = req.user.id;

  try {
    const { rows } = await pool.query(
      `INSERT INTO project (name, user_id, created_at)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, userId, new Date()],
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// controllers/projectsController.js
export const getCompletedTasksCount = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  console.log("projectId:", id, "userId:", userId); // 👈 add this to verify values
  const count = await countCompletedTasksByProject(userId, id);
  res.json({ count });
};
