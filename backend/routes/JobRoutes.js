import express from "express"
import { addJob, deleteJob, GetallJobs, getJobApplications, liveFeedJobs, updateJob } from "../controllers/jobController.js";
import { protect } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/",protect, addJob);
router.get("/",protect, GetallJobs);
router.get("/live",liveFeedJobs)
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);
router.get("/applications", protect, getJobApplications);

export default router;