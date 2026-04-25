import express from "express";
import logger from "./middlewares/logger.js";
import router from "./router/router.js";
import projectsRouter from "./router/projects.js";
import registerRouter from "./router/register.js";
import handleError from "./middlewares/errorHandler.js";
import catchAllError from "./middlewares/catchAll.js";
import supabase from "./db/supabase.js";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
const { data, error } = await supabase.from("users").select("*").limit(1);

if (error) {
  console.log("❌ Supabase connection failed:", error.message);
} else {
  console.log("✅ Supabase connected successfully!", data);
}
app.use(cors(corsOptions));
app.use(logger);
app.use(express.json()); //for reading the body
app.use("/register", registerRouter);
app.use("/api/projects", projectsRouter);
app.use("/api", router);

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
