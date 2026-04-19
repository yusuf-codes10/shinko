import express from "express";

const router = express.Router();

const data = [
  {
    id: 1,
    name: "Jessica",
  },
  {
    id: 2,
    name: "Alice",
  },
  {
    id: 3,
    name: "Kim",
  },
];

router.get("/", (req, res) => {
  res.status(200).json(data);
});

// get user by id
router.get("/:id", (req, res) => {
  // first grab the id from the url
  const id = parseInt(req.body.id);

  // find that on the data
  const foundData = data.find((item) => item.id === id);
});

export default router;
