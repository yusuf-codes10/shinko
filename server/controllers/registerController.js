// import supabase from "../db/supabase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import pool from "../db/pool.js";

export const handleUser = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email)
    // return res.status(400).json({ msg: "username and password are required!" });
    throw createError(
      400,
      "username and password must be provided!",
      "BAD_REQUEST",
    );

  try {
    // check for duplicate username
    const { rows: duplicateUser } = await pool.query(
      "SELECT username FROM users WHERE username = $1 LIMIT 1",
      [username],
    );

    if (duplicateUser.length > 0)
      // return res.status(400).json({ msg: "username already exists" });
      throw createError(409, "Username already exists!", "USERNAME_TAKEN");

    // check for duplicate email
    const { rows: duplicateEmail } = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email],
    );

    if (duplicateEmail.length > 0)
      // return res.status(400).json({ msg: "email already exists" });
      throw createError(409, "Email already exists!", "EMAIL_TAKEN");

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert the new user
    await pool.query(
      "INSERT INTO users (username, email, password_hash, created_at) VALUES ($1, $2, $3, $4)",
      [username, email, hashedPassword, new Date()],
    );

    // if (error) throw createError(error.statusCode, error.message);

    res.status(201).json({ msg: `${username} has been created` });
  } catch (error) {
    console.log(error.message);
    // res.status(500).json({ msg: "Internal Server Error!" });
    next(error);
  }
};

export const logUserIn = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // check if user exists
    const { rows: user } = await pool.query(
      "SELECT id, username, password_hash FROM users WHERE username = $1 LIMIT 1",
      [username],
    );

    if (user.length === 0)
      throw createError(400, `${username} does not exist!`, "NO_USER");

    // check the password
    const validPwd = await bcrypt.compare(password, user[0].password_hash);
    if (!validPwd) throw createError(401, "Wrong Password!", "WRONG_PASSWORD");

    // sign the token
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email, username: user[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // res.cookie("token", token, {
    //   httpOnly: true, // JS can't access it (safer)
    //   secure: false, // set true in production (HTTPS only)
    //   sameSite: "lax",
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    // });

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ msg: "logged in successfully" }); // ← no token in body
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logUserOut = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(200).json({ msg: "Logged out successfully" });
};
