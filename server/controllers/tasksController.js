import pool from "../db/pool.js";
import createError from "../utils/createError.js";

// Get each sub task by user id
export const getTodosById = async (req, res, next) => {
  const projectId = req.params.id;
  try {
    const todos = await pool.query(
      "SELECT id, title, status, category FROM task WHERE status = $1 AND project_id = $2 ",
      ["todo", projectId],
    );
    res.status(200).json(todos);
  } catch (error) {
    console.log("error getting todos", error);
    next(error);
  }
};

export const getProgressById = async (req, res, next) => {
  const projectId = req.params.id;
  try {
    const progresses = await pool.query(
      "SELECT id, title, status, category FROM task WHERE status = $1 AND project_id = $2",
      ["progress", projectId],
    );
    res.status(200).json(progresses);
  } catch (error) {
    next(error);
  }
};

export const getDonesById = async (req, res, next) => {
  const projectId = req.params.id;
  try {
    const dones = await pool.query(
      "SELECT id, title, status, category FROM task WHERE status = $1 AND project_id = $2",
      ["done", projectId],
    );

    res.status(200).json(dones);
  } catch (error) {
    next(error);
  }
};

export const createNewTask = async (req, res, next) => {
  const projectId = req.params.id;
  const { title, category } = req.body;
  const status = req.body.status ?? "todo";

  try {
    await pool.query(
      "INSERT INTO task (title, status, project_id, created_at, category) VALUES ($1, $2, $3, now(), $4)",
      [title, status, projectId, category],
    );

    res.status(201).json({ msg: "Inserted" });
  } catch (err) {
    console.log("error inserting data", err);
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  const id = req.params.id;
  try {
    await pool.query("DELETE FROM task WHERE id = $1", [id]);
    res.status(200).json({ msg: "task deleted successfully" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, status } = req.body;

  try {
    const foundTask = await pool.query(
      "SELECT DISTINCT * FROM task WHERE task.id = $1",
      [id],
    );

    if (foundTask.rows.length === 0)
      return next(createError(404, "Task does not exist!", "NOT_FOUND"));

    await pool.query(
      `
  UPDATE task
  SET
    title = $1,
    status = $2
  WHERE id = $3
  RETURNING *
  `,
      [title ?? current.title, status ?? current.status, id],
    );

    res.status(201).json({ msg: "task updated" });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

// export const getTaskById = async (req, res) => {
//   const { data, error } = await supabase
//     .from("task")
//     .select("id, title")
//     .eq("id", req.params.id)
//     .single();

//   if (error || !data) {
//     return res.status(404).json({ msg: "error: task not found!" });
//   }
//   res.json(data);
// };
