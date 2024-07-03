import catchAsyncErrors from "../middleware/catchAsynsError.js";
import Notification from "../models/notification.model.js";
import { errorHandler } from "../utils/ErrorHandler.js";

export const getNotifications = catchAsyncErrors(async (req, res, next) => {
  try {
    const { limit } = req.query;
    const notifications = await Notification.find({ to: req.user.id })
      .populate({
        path: "from",
        select: "username profileImg",
      })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    await Notification.updateMany({ to: req.user.id }, { read: true });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    next(error);
  }
});

export const deleteNotifications = catchAsyncErrors(async (req, res, next) => {
  try {
    await Notification.deleteMany({ to: req.user.id });

    res
      .status(200)
      .json({ success: true, message: "Notifications deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export const deleteNotification = catchAsyncErrors(async (req, res, next) => {
  try {
    const notifi = await Notification.findById(req.params.notifiId);
    if (!notifi) return next(errorHandler(404, "Notification not found!"));

    if (notifi.to.toString() !== req.user.id)
      return next(
        errorHandler(404, "You are not allowed to delete this notification!")
      );

    await Notification.findByIdAndDelete(req.params.notifiId);
    res
      .status(200)
      .json({ success: true, message: "Notification deleted successfully!" });
  } catch (error) {
    next(error);
  }
});
