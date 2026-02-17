import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["applied", "interviewing", "rejected", "hired"],
      default: "applied",
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },

    followUpDate: {
      type: Date,
    },

    lastFollowUp: {
      type: Date,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
