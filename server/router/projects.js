import express from "express";
import supabase from "../db/supabase.js";
import authMw from "../middlewares/authMiddleWare.js";

const projectsRouter = express.Router();

// get all projects for the user
projectsRouter.get("/", authMw, async (req, res, next) => {
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
});

// create a new project
projectsRouter.post("/", authMw, async (req, res, next) => {
  const { name } = req.body;
  const userId = req.user.id;

  try {
    const { error } = await supabase
      .from("project")
      .insert({ name, user_id: userId, created_at: new Date() });

    if (error) throw error;

    res.status(201).json({ msg: "project has been created successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default projectsRouter;
