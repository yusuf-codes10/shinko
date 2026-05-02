import express from "express";
import {
  handleUser,
  logUserIn,
  logUserOut,
} from "../controllers/registerController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", handleUser);

router.post("/login", logUserIn);

router.get("/me", verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

// logout
router.post("/logout", logUserOut);
export default router;
