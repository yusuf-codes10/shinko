import createError from "../utils/createError.js";

const catchAllError = (req, res, next) => {
  next(createError(404, "Page not found", "NOT_FOUND"));
};

export default catchAllError;
