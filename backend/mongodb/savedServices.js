import mongoose from "mongoose";

const savedPdfSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["maxquestion", "exampaper", "quiz"],
      required: true,
    },
    title: {
      type: String,
      required: true, // e.g. subject name or "Physics - Chapter 3"
    },
    cloudinaryUrl: {
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      required: true, // needed to delete from Cloudinary later
    },
  },
  { timestamps: true },
);

export default mongoose.model("SavedPdf", savedPdfSchema);