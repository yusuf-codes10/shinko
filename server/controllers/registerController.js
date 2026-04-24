// this is the register controller
import pool from "../db/pool.js";
import bcrypt from "bcrypt";

const handleUser = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email)
    return res.status(400).json({ msg: "username and password are required!" });

  //   we have the username and password
  // check for duplicates
  const duplicate = await pool.query(
    "SELECT username FROM users WHERE username = $1",
    [username],
  );

  const duplicate_email = await pool.query(
    "SELECT email FROM users WHERE email = $1",
    [email],
  );

  if (duplicate.rows.length > 0)
    return res.status(400).json({ msg: "username already exists" });

  if (duplicate_email.rows.length > 0)
    return res.status(400).json({ msg: "email already exists" });
};
// handling the user regestering here
try {
  // create the new user and hash the psw with bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // store a new user
  // const newUser = {
  //   username: username,
  //   password: hashedPassword,
  // };

  // add that user to the database
  await pool.query(
    "INSERT INTO users (username, password_hash, created_at) VALUES  ($1, $2, now())",
    [username, hashedPassword],
  );
  res.status(201).json({ msg: `${username} has been created` });
} catch (error) {
  console.log(error.message);
  res.status(500).json({ msg: "Internal Server Error!" });
}

export default handleUser;
