// ! catch all routes that does not exit
const catchAllError = (req, res, next) => {
  const error = new Error("Page does not exit!");
  error.status = 404;
  next(error);
};

export default catchAllError;
