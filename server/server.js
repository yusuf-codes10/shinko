import express from "express";
import logger from "./middlewares/logger.js";
import router from "./router/router.js";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(logger);
app.use("/api", router);

app.listen(8080, () => {
  console.log(`server's running on 8080`);
});
