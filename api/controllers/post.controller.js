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
    const post = await Post.findById(req.params.postid);
    if (!post) return next(errorHandler(404, "Post not found!"));
    if (post.user.toString() !== req.user.id) {
      return next(
        errorHandler(404, "Your are not authorize to delete this post!")
      );
    }
    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }
    await Post.findByIdAndDelete(req.params.postid);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
});

export const getAllPosts = catchAsyncErrors(async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
      })
      .populate({
        path: "comments.user",
      });
    if (!posts.length) return next(errorHandler(404, "No post found!"));

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
});
export const getSinglePost = catchAsyncErrors(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postid)
      .populate({
        path: "user",
      })
      .populate({
        path: "comments.user",
      });
    if (!post) return next(errorHandler(404, "Post not found!"));

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
});
export const getLikedPosts = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userid);
    if (!user) return next(errorHandler(404, "user not found!"));

    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
      .populate({
        path: "user",
      })
      .populate({
        path: "comments.user",
      });

    res.status(200).json({ success: true, likedPosts });
  } catch (error) {
    next(error);
  }
});
export const getFollowingPosts = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(errorHandler(404, "user not found!"));

    const feedPosts = await Post.find({ user: { $in: user.following } })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
      })
      .populate({
        path: "comments.user",
      });

    res.status(200).json({ success: true, feedPosts });
  } catch (error) {
    next(error);
  }
});
export const getUserPosts = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return next(errorHandler(404, "user not found!"));
    const posts = await Post.find({ user: user._id })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "user",
      })
      .populate({
        path: "comments.user",
      });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    next(error);
  }
});
// export const likeUnlikePost = catchAsyncErrors(async (req, res, next) => {
//   try {
//     const post = await Post.findById(req.params.postid);
//     if (!post) return next(errorHandler(404, "Post not found!"));
//     const likeStatus = post.likes.includes(req.user.id);
//     if (likeStatus) {
//       await Post.updateOne(
//         { _id: req.params.postid },
//         { $pull: { likes: req.user.id } }
//       );
//       await User.updateOne(
//         { _id: req.user.id },
//         { $pull: { likedPosts: req.params.postid } }
//       );

//       res.status(200).json({
//         success: true,
//         message: "Post unliked successfully!",
//       });
//     } else {
//       post.likes.push(req.user.id);
//       await User.updateOne(
//         { _id: req.user.id },
//         { $push: { likedPosts: req.params.postid } }
//       );
//       await post.save();

//       // const notification = new Notification({
//       //   from: req.user.id,
//       //   to: post.user,
//       //   type: "like",
//       // });
//       // await notification.save();
//       res.status(200).json({
//         success: true,
//         message: "Post liked successfully!",
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

export const likeUnlikePost = catchAsyncErrors(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postid);
    if (!post) return next(errorHandler(404, "Post not found!"));

    const likeStatus = post.likes.includes(req.user.id);
    let updatedPost;

    if (likeStatus) {
      updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.postid },
        { $pull: { likes: req.user.id } },
        { new: true } // Return the modified document
      );

      await User.updateOne(
        { _id: req.user.id },
        { $pull: { likedPosts: req.params.postid } }
      );

      res.status(200).json({
        success: true,
        message: "Post unliked successfully!",
        likes: updatedPost.likes,
      });
    } else {
      updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.postid },
        { $push: { likes: req.user.id } },
        { new: true } // Return the modified document
      );

      await User.updateOne(
        { _id: req.user.id },
        { $push: { likedPosts: req.params.postid } }
      );

      res.status(200).json({
        success: true,
        message: "Post liked successfully!",
        likes: updatedPost.likes,
      });
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
    const updatedPost = await Post.findById(req.params.postid).populate({
      path: "comments.user",
    });
    res.status(200).json({ success: true, comments: updatedPost.comments });
  } catch (error) {
    next(error);
  }
});
