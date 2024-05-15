import mongoose, { Schema } from "mongoose";

const lectureDateMapModel = new mongoose.Schema(
  {
    lectureId: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
      trim: true,
    },

    instructor: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("lecturesDateMap", lectureDateMapModel);
