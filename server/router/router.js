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

router.get("/", (res, req) => {});

export default router;
