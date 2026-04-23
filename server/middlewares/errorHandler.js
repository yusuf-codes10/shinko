// ! this is the cutom error handler
const handleError = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ msg: "Oops! it is over man, just give it up" });
  // next();
};

export default handleError;
