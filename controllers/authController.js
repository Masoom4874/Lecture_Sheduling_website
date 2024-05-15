import {
  comparePassword,
  encryptPassword,
  hashPassword,
} from "../Helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(200).send({
        success: false,
        message: "Email and password is required",
      });
    }
    let user = await userModel.findOne({ email });

    if (user) {
      if (comparePassword(password, user.password)) {
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.status(201).send({
          success: true,
          message: "Logged In User",
          user: user,
          token: token,
        });
      } else {
        return res.status(500).send({
          success: false,
          message: "Invalid email and password",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "E-mail is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }

    //check user
    const existinguser = await userModel.findOne({ email });

    //existing user
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "Already Created with this userName",
      });
    }

    // //hashing password her---------------------------------------------------------------
    // -------------------------------------------------------------------------------------
    const encryptedPassword = encryptPassword(password);

    //save
    const user = await new userModel({
      name,
      email,
      password: encryptedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registerd Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const fetchLecturers = async (req, res) => {
  try {
    let lecturers = await userModel.find({
      role: "instructor",
    });

    if (lecturers) {
      return res.status(201).send({
        success: true,
        message: "Instructors",
        lecturers,
      });
    } else {
      return res.status(201).send({
        success: false,
        message: "failed to fetch Instructors",
        lecturers,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
