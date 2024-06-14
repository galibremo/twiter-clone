import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  followUnfollowUser,
  getSuggestedusers,
  getUserProfile,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", isAuthenticated, getUserProfile);
router.post("/follow/:id", isAuthenticated, followUnfollowUser);
router.get("/suggested", isAuthenticated, getSuggestedusers);
router.post("/update/:id", isAuthenticated, updateUser);

export default router;
