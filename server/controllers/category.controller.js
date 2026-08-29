import pool from "../db/pool.js";

export const createCategory = async (req, res, next) => {
  const { name } = req.body;
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
