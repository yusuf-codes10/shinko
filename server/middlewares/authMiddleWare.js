import jwt from "jsonwebtoken";

const authMw = (req, res, next) => {
  const token = req.cookies.token; // 👈 only change

  if (!token) return res.status(401).json({ msg: "No token provided!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export default authMw;
