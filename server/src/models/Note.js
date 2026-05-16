import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    summary: { type: String, default: "" },
    keyPoints: [{ type: String }],
    actionItems: [{ type: String }],
    flashcards: [
      {
        question: String,
        answer: String
      }
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
