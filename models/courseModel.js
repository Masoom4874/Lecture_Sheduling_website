import mongoose from "mongoose";
import lectureModel from "./lecturesModel.js";

const courseModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("courses", courseModel);
