import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./Routes/authRoute.js";
import instructorsRoutes from "./Routes/instructorRoute.js";
import courseRoutes from "./routes/courseRoute.js";
import lectureRoutes from "./Routes/lectureRoutes.js";

import fileUpload from "express-fileupload";

import cors from "cors";
//configuring env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors("*"));
app.use(fileUpload());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/instructor", instructorsRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/lecture", lectureRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welocome to admin pannel</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
