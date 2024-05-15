import mongoose, { Schema } from "mongoose";

const lectureModel = new mongoose.Schema(
  {
    batchName: {
      type: String,
      required: true,
      trim: true,
    },
    lectureDate: {
      type: String,
      required: true,
      trim: true,
    },
    lectureTime: {
      type: String,
      required: true,
      trim: true,
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("lectures", lectureModel);
