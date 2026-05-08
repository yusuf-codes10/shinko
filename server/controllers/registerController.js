import supabase from "../db/supabase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const handleUser = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email)
    return res.status(400).json({ msg: "username and password are required!" });

  try {
    // check for duplicate username
    const { data: duplicateUser } = await supabase
      .from("users")
      .select("username")
      .eq("username", username)
      .single();

    if (duplicateUser)
      // return res.status(400).json({ msg: "username already exists" });
      throw createError(409, "Username already exists!", "USERNAME_TAKEN");

    // check for duplicate email
    const { data: duplicateEmail } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (duplicateEmail)
      // return res.status(400).json({ msg: "email already exists" });
      throw createError(409, "Email already exists!", "EMAIL_TAKEN");

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert the new user
    const { error } = await supabase.from("users").insert({
      username,
      email,
      password_hash: hashedPassword,
      created_at: new Date(),
    });

    if (error) throw error;

    res.status(201).json({ msg: `${username} has been created` });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export const logUserIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    // check if user exists
    const { data: user, error } = await supabase
      .from("users")
      .select("id, username, password_hash")
      .eq("username", username)
      .single();

    if (error || !user)
      return res.status(400).json({ msg: `${username} does not exist!` });

    // check the password
    const validPwd = await bcrypt.compare(password, user.password_hash);
    if (!validPwd) return res.status(401).json({ msg: "Wrong password!" });

    // sign the token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true, // JS can't access it (safer)
      secure: false, // set true in production (HTTPS only)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });

    res.status(200).json({ msg: "logged in successfully" }); // ← no token in body
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
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
