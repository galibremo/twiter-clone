import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { errorHandler } from "../utils/ErrorHandler.js";
import { v2 as cloudinary } from "cloudinary";
import catchAsyncErrors from "../middleware/catchAsynsError.js";
import Notification from "../models/notification.model.js";

export const createPost = catchAsyncErrors(async (req, res, next) => {
  try {
    const { text } = req.body;
    let { img } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return next(errorHandler(404, "User not found!"));

    if (!text && !img)
      return next(errorHandler(404, "Post must have text or image!"));

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const newPost = new Post({
      user: req.user.id,
      text,
      img,
    });
    await newPost.save();
    res.status(201).json({
      success: true,
      newPost,
    });
  } catch (error) {
    next(error);
  }
});
export const deletePost = catchAsyncErrors(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(errorHandler(404, "Post not found!"));
    if (post.user !== req.user.id) {
      return next(
        errorHandler(404, "Your are not authorize to delete this post!")
      );
    }
    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
});

export const getAllPosts = catchAsyncErrors(async (req, res, next) => {});
export const getFollowingPosts = catchAsyncErrors(async (req, res, next) => {});
export const getLikedPosts = catchAsyncErrors(async (req, res, next) => {});
export const getUserPosts = catchAsyncErrors(async (req, res, next) => {});
export const likeUnlikePost = catchAsyncErrors(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postid);
    if (!post) return next(errorHandler(404, "Post not found!"));
    const likeStatus = post.likes.includes(req.user.id);
    if (likeStatus) {
      await Post.updateOne(
        { _id: req.params.postid },
        { $pull: { likes: req.user.id } }
      );
      res.status(200).json({
        message: "Post unliked successfully!",
      });
    } else {
      post.likes.push(req.user.id);
      await post.save();

      const notification = new Notification({
        from: req.user.id,
        to: post.user,
        type: "like",
      });
      await notification.save();
      res.status(200).json({ message: "Post liked successfully!" });
    }
  } catch (error) {
    next(error);
  }
});
export const commentOnPost = catchAsyncErrors(async (req, res, next) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postid);
    if (!post) return next(errorHandler(404, "Post not found!"));

    if (!text) return next(errorHandler(404, "Text field is required!"));

    const comment = { user: req.user.id, text };

    post.comments.push(comment);
    await post.save();
    res.status(200).json({ success: true, post });
  } catch (error) {
    next(error);
  }
});
