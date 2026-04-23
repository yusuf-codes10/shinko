// ! this is the cutom error handler
const handleError = (err, req, res, next) => {
  res.status(err.status || 500).json({ msg: err.message });
  // next();
};

export default handleError;
