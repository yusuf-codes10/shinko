import express from "express";
import supabase from "../db/supabase.js";

const router = express.Router();

router.get("/todo/:id", async (req, res, next) => {
  const projectId = req.params.id;
  try {
    const { data, error } = await supabase
      .from("task")
      .select("id, title, status")
      .eq("status", "todo")
      .eq("project_id", projectId);

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/progress/:id", async (req, res, next) => {
  const projectId = req.params.id;
  try {
    const { data, error } = await supabase
      .from("task")
      .select("id, title, status")
      .eq("status", "progress")
      .eq("project_id", projectId);

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/done/:id", async (req, res, next) => {
  const projectId = req.params.id;
  try {
    const { data, error } = await supabase
      .from("task")
      .select("id, title, status")
      .eq("status", "done")
      .eq("project_id", projectId);

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("task")
    .select("id, title")
    .eq("id", req.params.id)
    .single();

  if (error || !data) {
    return res.status(404).json({ msg: "error: task not found!" });
  }
  res.json(data);
});

router.post("/:id", async (req, res) => {
  const projectId = req.params.id;
  const { title } = req.body;
  const status = req.body.status ?? "todo";

  const { data, error } = await supabase
    .from("task")
    .insert({ title, status, project_id: projectId, created_at: new Date() })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.delete("/:id", async (req, res) => {
  const { error } = await supabase
    .from("task")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ msg: "task deleted successfully" });
});

router.put("/:id", async (req, res) => {
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
});

export default router;
