import express from "express";
import { getuser, signin, signup } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/getuser", isAuthenticated, getuser);

export default router;
