import jwt from "jsonwebtoken";

const authMw = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "No token provided!" });
};

export default authMw;
