import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
    },

    notificationSettings: {
      emailReminder: {
        type: Boolean,
        default: true,
      },

      reminderDaysBefore: {
        type: Number,
        default: 3,
      },
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model("User", userSchema);

export default User;
