const logger = (res, req, next) => {
  console.log(`${req.method} ${req.protocol}//:${req.get("host")}`);
  next();
};

export default logger;
