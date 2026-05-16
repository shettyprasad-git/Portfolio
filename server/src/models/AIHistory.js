import mongoose from "mongoose";

const aiHistorySchema = new mongoose.Schema(
  {
    feature: { type: String, required: true },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model("AIHistory", aiHistorySchema);
