import express from "express";
import logger from "./middlewares/logger.js";
import router from "./router/router.js";
import projectsRouter from "./router/projects.js";
import handleError from "./middlewares/errorHandler.js";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(logger);
app.use(express.json()); //for reading the body
app.use("/api/projects", projectsRouter);
app.use("/api", router);

// custom error handler
app.use(handleError);

app.listen(8080, () => {
  console.log(`server's running on 8080`);
});
