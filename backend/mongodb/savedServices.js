import mongoose from "mongoose";

const savedServiceSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    serviceType: {
      type: String,
      enum: [
        "ExamPaper",
        "OnlineQuiz",
        "MCQ",
        "TrueFalse",
        "OneLiner",
        "LongQuestions",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      default: "",
    },

    pdfUrl: {
      type: String,
      required: true,
    },

    generatedContentId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("SavedService", savedServiceSchema);
