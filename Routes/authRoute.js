import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

//router obj
const router = express.Router();

//routing

router.post("/login", loginController);
router.post("/register", registerController);

export default router;
