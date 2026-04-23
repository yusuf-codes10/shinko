// this is the register controller

const handleUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ msg: "username and password are required!" });

  //   we have the username and password
  // check for duplicates
  const duplicate = "something in the db";

  if (duplicate)
    return res.status(400).json({ msg: "username already exists" });
};

export default handleUser;
