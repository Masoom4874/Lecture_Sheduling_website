import express from "express";
import {
  fetchCourse,
  productPhotoController,
  createCourse,
  assignLectureToLecturer,
  fetchLecturesTimeTable,
} from "../controllers/courseController.js";

//router obj
const router = express.Router();

//routing

router.get("/fetchCourse", fetchCourse);
router.get("/fetchCoursePhoto/:pid", productPhotoController);
router.post("/createCourse", createCourse);
router.post("/assignLectureToLecturer", assignLectureToLecturer);
router.post("/fetchLecturesTimeTable", fetchLecturesTimeTable);

export default router;
