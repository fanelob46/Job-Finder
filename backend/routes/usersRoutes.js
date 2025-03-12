import { Router } from "express";
import { authorizeRoles, protect } from "../middlewares/authMiddleWare.js";
import { getAllUser, getUser, updateUser } from "../controllers/usersControllers.js";

const userRouter = Router();

userRouter.get("/:id", protect, authorizeRoles("admin"), getUser);
userRouter.get("/",protect,authorizeRoles("admin"), getAllUser);
userRouter.put("/update", protect,authorizeRoles("user"), updateUser )

export default userRouter;