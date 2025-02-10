import express from "express"
import { addJob, GetallJobs } from "../controllers/jobController.js";
import { protect } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/",protect, addJob);
router.get("/", GetallJobs)

export default router;