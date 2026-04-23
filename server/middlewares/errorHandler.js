// ! this is the cutom error handler
const handleError = (err, req, res, next) => {
  console.error(err);
  console.log(next);
  const statusCode = err.status || 500;
  const message = statusCode === 500 ? "Internal Server Error" : err.message;
  res.status(statusCode).json({ msg: message });
  // next();
};

export default handleError;
