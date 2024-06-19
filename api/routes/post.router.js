import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getLikedPosts,
  getUserPosts,
  likeUnlikePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, createPost);
router.delete("/delete/:id", isAuthenticated, deletePost);
router.get("/getposts", isAuthenticated, getAllPosts);
router.get("/following", isAuthenticated, getFollowingPosts);
router.get("/likes/:userid", isAuthenticated, getLikedPosts);
router.get("/user/:username", isAuthenticated, getUserPosts);
router.post("/like/:postid", isAuthenticated, likeUnlikePost);
router.post("/comment/:postid", isAuthenticated, commentOnPost);

export default router;
