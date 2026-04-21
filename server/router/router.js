import express from "express";
import pool from "../db/pool.js";

const router = express.Router();

// ! the original get request
// router.get("/", (req, res) => {
//   res.status(200).json(data);
// });

// ! the postgres get request
router.get("/", async (req, res) => {
  try {
    const response = await pool.query("SELECT id, title, status FROM task");
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
});

// get a user by id
router.get("/:id", async (req, res) => {
  const response = await pool.query(
    "SELECT id, title FROM task WHERE task.id = $1",
    [req.params.id], // this pervent ssql injection
  );
  if (response.rows.length === 0) {
    return res.status(404).json({ msg: "error: user not found!" });
  }
  res.json(response.rows[0]);
});

// // get user by id
// router.get("/:id", (req, res) => {
//   // first grab the id from the url
//   const id = parseInt(req.params.id);

//   // find that on the data
//   const foundData = data.find((item) => item.id === id);

//   //in case not found
//   if (!foundData) {
//     return res.status(404).json({ msg: "User not found" });
//   }

//   res.status(200).json(foundData);
// });

// post req
router.post("/", async (req, res) => {
  const title = req.body.title;
  const result = await pool.query(
    "INSERT INTO task (title, created_at, status) values ($1, now(), $2) RETURNING *",
    [title, "progress"], // do not know if it is conpatible with js now
  );
  res.status(201).json(result.rows[0]);
});

// delete
router.delete("/:id", async (req, res) => {
  // grab the id
  const result = await pool.query("DELETE FROM task WHERE task.id = $1", [
    req.params.id,
  ]);
  res.status(200).json(result.rows[0]);
});

// put request
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  // First check the car exists
  const existing = await pool.query("SELECT * FROM task WHERE id = $1", [id]);
  if (existing.rows.length === 0) {
    return res.status(404).json({ error: "Item not Found" });
  }

  // Merge new values with existing ones (so partial updates work)
  const current = existing.rows[0];
  const updatedTitle = title ?? current.title;
  const updatedStatus = status ?? current.status;

  const result = await pool.query(
    `UPDATE task
     SET title = $1, status = $2
     WHERE id = $3
     RETURNING *`,
    [updatedTitle, updatedStatus, id],
  );

  res.json(result.rows[0]);
});

export default router;
