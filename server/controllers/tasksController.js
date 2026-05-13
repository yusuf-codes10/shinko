import supabase from "../db/supabase.js";
import pool from "../db/pool.js";

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

export const deleteTask = async (req, res) => {
  const { error } = await supabase
    .from("task")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ msg: "task deleted successfully" });
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  try {
    const { data: current, error: fetchError } = await supabase
      .from("task")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !current) {
      return res.status(404).json({ error: "Item not found" });
    }

    const { data, error } = await supabase
      .from("task")
      .update({
        title: title ?? current.title,
        status: status ?? current.status,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "server error" });
  }
};

export const getTaskById = async (req, res) => {
  const { data, error } = await supabase
    .from("task")
    .select("id, title")
    .eq("id", req.params.id)
    .single();

  if (error || !data) {
    return res.status(404).json({ msg: "error: task not found!" });
  }
  res.json(data);
};
