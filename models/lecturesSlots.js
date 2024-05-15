import mongoose from "mongoose";

const lecSlotModel = new mongoose.Schema(
  {
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
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("lecturesSlot", lecSlotModel);
