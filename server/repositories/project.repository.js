export const countCompletedTasksByProject = async (req, res) => {
  const { id } = req.params; // project id from URL
  const userId = req.user.id; // user from session

  const { rows } = await pool.query(
    `SELECT COUNT(*) FROM project
     JOIN task ON task.project_id = project.id
     WHERE project.user_id = $1 AND project_id = $2
     GROUP BY task.status
     HAVING task.status = 'done'`,
    [userId, id],
  );

  res.json({ count: rows[0]?.count ?? 0 }); // returning 0 in case no result
};
