import { Router } from "express";
import { authorizeRoles, protect } from "../middlewares/authMiddleWare.js";
import { applyForHandler, getAllUser, getUser, getUserApplicationsHandler, updateUser } from "../controllers/usersControllers.js";

const userRouter = Router();

userRouter.get("/:id", protect, authorizeRoles("admin"), getUser);
userRouter.get("/",protect,authorizeRoles("admin"), getAllUser);
userRouter.put("/update", protect,authorizeRoles("user","admin"), updateUser )
userRouter.post("/apply",protect,authorizeRoles("user"), applyForHandler)
userRouter.get("/job-applications",protect, authorizeRoles("admin", "user"), getUserApplicationsHandler)


export default userRouter;