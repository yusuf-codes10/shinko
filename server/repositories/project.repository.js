import pool from "../db/pool.js";

export async function countCompletedTasksByProject(userId, projectId) {
  const { rows } = await pool.query(
    `SELECT Count(*) FROM Project
    join task on task.project_id = project.id
    where project.user_id = $1 and project_id = $2
    group by task.status
    having task.status = 'done'; `,
    [userId, projectId],
  );
  return rows;
}
