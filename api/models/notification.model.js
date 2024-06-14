import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    from: {
      type: Object,
      required: true,
    },
    to: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["follow", "like"],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
