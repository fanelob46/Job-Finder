import { Router } from "express";
import { authorizeRoles, protect } from "../middlewares/authMiddleWare.js";
import { addJobHandler, deleteJob, getAllJobs, getJob, updateJob } from "../controllers/jobsController.js";

const jobsRouter = Router()

jobsRouter.post("/", protect, authorizeRoles("admin"), addJobHandler);
jobsRouter.get("/:id", protect, authorizeRoles("admin"), getJob);
jobsRouter.get("/", protect, authorizeRoles("admin"), getAllJobs);
jobsRouter.put("/:id", protect, authorizeRoles("admin"), updateJob);
jobsRouter.delete("/:id", protect, authorizeRoles("admin"), deleteJob);

export default jobsRouter;