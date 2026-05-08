const createError = (statusCode, message, code = "SERVER_ERROR") => {
  // the code param is for the fronted ux, SERVER_ERROR is the default
  const error = new Error(message);
  error.status = statusCode;
  error.code = code;
  return error;
};

export default createError;
