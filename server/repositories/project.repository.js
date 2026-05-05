export const countCompletedTasksByProject = async (userId, projectId) => {
  const { rows } = await pool.query(
    `SELECT COUNT(*) FROM project
     JOIN task ON task.project_id = project.id
     WHERE project.user_id = $1 AND project_id = $2
     GROUP BY task.status
     HAVING task.status = 'done'`,
    [userId, projectId],
  );

  return { count: rows[0]?.count ?? 0 }; // returning 0 in case no result
};
