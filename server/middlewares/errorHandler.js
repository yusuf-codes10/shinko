// ! this is the cutom error handler
const handleError = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ msg: "Internal server error" });
  // next();
};

export default handleError;
