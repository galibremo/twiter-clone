import catchAsynsError from "../middleware/catchAsynsError.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/ErrorHandler.js";
import Notification from "../models/notification.model.js";

export const getUserProfile = catchAsynsError(async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) return next(errorHandler(404, "User not found"));
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error.message);
  }
});

export const followUnfollowUser = catchAsynsError(async (req, res, next) => {
  const { id } = req.params;
  if (req.params.id === req.user._id.toString())
    return next(errorHandler(400, "You can't follow or unfllow your self!"));
  try {
    const userToModify = await User.findById(id);
    if (!userToModify) return next(errorHandler(404, "User not found"));

    const currentUser = await User.findById(req.user._id);

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // Unfollow the user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      const newNotification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });
      await newNotification.save();
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    next(error);
  }
});

export const getSuggestedusers = catchAsynsError(async (req, res, next) => {
  try {
    const userId = req.user._id;

    const usersFollowedByMe = await User.findById(userId).select("following");

    const users = await User.find({ _id: { $ne: userId } });

    const filteredUsers = users.filter(
      (user) => !usersFollowedByMe.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 4);

    res.status(200).json({
      success: true,
      suggestedUsers,
    });
  } catch (error) {
    next(error.message);
  }
});

export const updateUser = catchAsynsError(async (req, res, next) => {
  let { profileImg, coverImg } = req.body;

  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    const user = await User.findById(req.params.id);
    if (profileImg) {
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedResponse.secure_url;
    }

    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadedResponse.secure_url;
    }
    delete req.body.email;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          fullName: req.body.fullName,
          profileImg: profileImg,
          coverImg: coverImg,
          bio: req.body.bio,
          link: req.body.link,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token").status(200).json("User has been signed out!");
  } catch (error) {
    next(error);
  }
};
