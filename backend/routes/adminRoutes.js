import express from "express";
import {
  getAllUsers,
  getCompanyUsers,
  getAllJobs,
} from "../controllers/adminController.js";
import { protect, admin } from "../middlewares/authMiddleWare.js";

const router = express.Router();

// Get all users (Admin only)
router.get("/users", protect, admin, getAllUsers);

// Get all company managers (Admin only)
router.get("/company-users", protect, admin, getCompanyUsers);

// Get all jobs (Admin only)
router.get("/jobs", protect, admin, getAllJobs);

export default router;
