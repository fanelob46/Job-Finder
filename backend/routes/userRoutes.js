import express from "express"
import { getUserApplications, getUserProfile, Login, logoutUser, RegisterUser, updateProfile } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/", RegisterUser);
router.post("/login", Login);
router.put("/profile", protect,updateProfile)
router.get("/profile", protect, getUserProfile)
router.post("/logout", logoutUser)
router.get("/applications", protect, getUserApplications)

export default router;