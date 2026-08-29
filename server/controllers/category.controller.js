import pool from "../db/pool.js";

export const createCategory = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    const error = new Error("Name and description are required!");
    error.status = 400;
    return next(error);
  }
  try {
    const { rows } = await pool.query(
      "INSERT INTO category VALUE ($1) RETURNING *",
      [name],
    );

    return res.status(201).json(rows[0]);
  } catch (error) {
    console.log(error);
  }
};
