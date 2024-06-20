import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  getNotifications,
  deleteNotifications,
  deleteNotification,
} from "../controllers/notifications.controller.js";

const router = express.Router();

router.get("/", isAuthenticated, getNotifications);
router.delete("/", isAuthenticated, deleteNotifications);
router.delete("/:notifiId", isAuthenticated, deleteNotification);

export default router;
