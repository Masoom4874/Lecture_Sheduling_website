import { decryptString } from "../Helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const fetchInstructors = async (req, res) => {
  try {
    let InstructorsList = await userModel.find({ role: "instructor" });

    // Decrypt the password before sending the response
    const decryptedInstructorsList = InstructorsList.map((ins) => ({
      ...ins.toObject(),
      password: decryptString(ins.password),
    }));

    return res.status(200).send({
      success: true,
      message: "Instructors List Fetched Successfully",
      decryptedInstructorsList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Instructor List",
      error,
    });
  }
};
