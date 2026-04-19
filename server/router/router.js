import express from "express";

const router = express.Router();

let data = [
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
  {
    id: 4,
    name: "Anna",
  },
  {
    id: 5,
    name: "Elena",
  },
];

router.get("/", (req, res) => {
  res.status(200).json(data);
});

// get user by id
router.get("/:id", (req, res) => {
  // first grab the id from the url
  const id = parseInt(req.params.id);

  // find that on the data
  const foundData = data.find((item) => item.id === id);

  //in case not found
  if (!foundData) {
    return res.status(404).json({ msg: "User not found" });
  }

  res.status(200).json(foundData);
});

// post req
router.post("/", (req, res) => {
  const bodyContent = req.body.name;
  if (!bodyContent) {
    return res.status(400).json({ msg: "You have to enter the title" });
  }

  // create the new thing
  const newData = {
    id: data.length + 1,
    name: bodyContent,
  };
  data.push(newData);
  res.status(201).json(data);
});

// delete
router.delete("/:id", (req, res) => {
  // grab the id
  const id = parseInt(req.params.id);
  const foundData = data.find((item) => item.id === id);

  if (!foundData) {
    return res.status(404).json("nothing found to delete!");
  }

  data = data.filter((item) => item.id !== id);
  res.status(204).json(data);
});

export default router;
