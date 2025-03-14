import express from "express"
import { applyForJob, getUserApplications, getUserProfile, Login, logoutUser, RegisterUser, updateProfile } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleWare.js";

const router = express.Router();


router.put("/profile", protect,updateProfile)
router.get("/profile", protect, getUserProfile)
router.post("/logout", logoutUser)
router.post("/jobs/apply", protect, applyForJob);
router.get("/jobs/applications", protect, getUserApplications);

export default router;