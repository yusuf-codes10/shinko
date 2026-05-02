import supabase from "../db/supabase";

// Get each sub task by user id
export const getTodosById = async (req, res, next) => {
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
};

export const getProgressById = async (req, res, next) => {
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
};

export const getDonesById = async (req, res, next) => {
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
};
