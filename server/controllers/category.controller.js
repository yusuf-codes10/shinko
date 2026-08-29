import pool from "../db/pool.js";

export const createCategory = async (req, res, next) => {
  const { name } = req.body;
  const userId = req.user.id;

  if (!name) {
    const error = new Error("Name and description are required!");
    error.status = 400;
    return next(error);
  }
  try {
    const { rows } = await pool.query(
      "INSERT INTO category (name, userId) VALUES ($1, $2) RETURNING *",
      [name, userId],
    );

    return res.status(201).json(rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async (req, res) => {
  const userId = req.user.id;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM category WHERE category.userId = $1",
      [userId],
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
};
