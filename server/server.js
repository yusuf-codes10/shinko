import express from "express";
import logger from "./middlewares/logger.js";

const app = express();
app.use(logger);

app.listen(8080, () => {
  console.log(`server's running on 8080`);
});
