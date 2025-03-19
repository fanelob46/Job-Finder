import { Router } from "express";
import { authorizeRoles, protect } from "../middlewares/authMiddleWare.js";
import { addJobHandler, deleteJob, getAllJobs, getJob, getJobApplicationsHandler, updateJob } from "../controllers/jobsController.js";
import validateJob from "../validators/validateJob.js";
import { get } from "mongoose";

const jobsRouter = Router()

jobsRouter.post("/", protect,validateJob , authorizeRoles("admin"), addJobHandler);
jobsRouter.get("/:id", protect, authorizeRoles("admin"), getJob);
jobsRouter.get("/", protect, authorizeRoles("admin"), getAllJobs);
jobsRouter.put("/:id", protect,validateJob, authorizeRoles("admin"), updateJob);
jobsRouter.delete("/:id", protect, authorizeRoles("admin"), deleteJob);
jobsRouter,get("/applications",protect,authorizeRoles("admin", "user"), getJobApplicationsHandler)


export default jobsRouter;