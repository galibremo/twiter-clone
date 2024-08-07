import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  followUnfollowUser,
  getSuggestedusers,
  getUserProfile,
  signOut,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", isAuthenticated, getUserProfile);
router.post("/signout", signOut);
router.post("/follow/:id", isAuthenticated, followUnfollowUser);
router.get("/suggested", isAuthenticated, getSuggestedusers);
router.put("/update/:id", isAuthenticated, updateUser);

export default router;
