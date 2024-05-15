import express from "express";
import { createLecture } from "../controllers/lectureController.js";
import { fetchLectures } from "../controllers/lectureController.js";

//router obj
const router = express.Router();

//routing
router.post("/createLecture", createLecture);

router.get("/fetchLectures", fetchLectures);

export default router;
