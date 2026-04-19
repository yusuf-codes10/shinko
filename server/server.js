import express from "express";
import logger from "./middlewares/logger.js";
import router from "./router/router.js";

const app = express();
app.use(logger);
app.use("/api", router);

app.listen(8080, () => {
  console.log(`server's running on 8080`);
});
