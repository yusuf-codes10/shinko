import supabase from "../db/supabase.js";
import { countCompletedTasksByProject } from "../repositories/project.repository.js";

export const getAllUserProjects = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const { data, error } = await supabase
      .from("project")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createNewProject = async (req, res, next) => {
  const { name } = req.body;
  const userId = req.user.id;

  try {
    const { data, error } = await supabase
      .from("project")
      .insert([
        {
          name,
          user_id: userId,
          created_at: new Date(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
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
