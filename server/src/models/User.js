import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    preferences: {
      goals: { type: String, default: "" },
      workStyle: { type: String, default: "Focused" },
      tone: { type: String, default: "Professional" },
      focusArea: { type: String, default: "General" },
      activeHours: { type: String, default: "9 AM - 5 PM" }
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
