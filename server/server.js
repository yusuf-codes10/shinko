import express from "express";
import logger from "./middlewares/logger.js";
import taskRouter from "./router/tasks.route.js";
import projectsRouter from "./router/projects.route.js";
import registerRouter from "./router/register.route.js";
import categoryRouter from "./router/category.route.js";
import handleError from "./middlewares/errorHandler.js";
import catchAllError from "./middlewares/catchAll.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import pool from "./db/pool.js";

const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
console.log(process.env.CLIENT_URL);
try {
  await pool.query("SELECT 1");
  console.log("✓ Neon (Postgres) connected successfully!");
} catch (err) {
  console.log("✗ Neon connection failed:", err.message);
}

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(logger);
app.use(express.json()); //for reading the body
app.use("/register", registerRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/task", taskRouter);
app.use("/api/category", categoryRouter);

// custom error handler
app.use(catchAllError);
app.use(handleError);

app.listen(8080, () => {
  console.log(`server's running on 8080`);
});

// TODO: write the login route, and use jwt
// TODO: build the vue side requests to send to the apu
// TODO: update the project router, to fetch relative to users

// TODO: next we have to clean up the entire app
