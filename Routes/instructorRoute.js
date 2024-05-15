import express from "express";
import { fetchInstructors } from "../controllers/InstructorController.js";

//router obj
const router = express.Router();

//routing

router.get("/fetchInstructors", fetchInstructors);

export default router;
