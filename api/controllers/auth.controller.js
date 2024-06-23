import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsynsError.js";
import sendToken from "../utils/jwtToken.js";

export const signup = async (req, res, next) => {
  const { fullname, username, email, password } = req.body;

  if (
    !fullname ||
    !username ||
    !email ||
    !password ||
    fullname === "" ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }
  const userEmail = await User.findOne({ email });
  if (userEmail) return next(errorHandler(404, "User already exists"));

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    fullname,
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Signup Successfull!",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email }).select("+password");
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    sendToken(validUser, 200, res);
  } catch (error) {
    next(error);
  }
};

export const getuser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(errorHandler(404, "User doesn't exists"));
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error.message);
  }
});
