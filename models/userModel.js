import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum : ['admin','instructor'],
      default: 'instructor'
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
