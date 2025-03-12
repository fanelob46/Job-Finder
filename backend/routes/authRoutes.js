import { Router } from "express";
import { loginHandler, logoutHandler, registHandler, updateProfileHandler } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleWare.js";
import validateRegister from "../validators/validateRegister.js";
import validateLogin from "../validators/validateLogin.js";

const authRouter = Router();

authRouter.post("/register",validateRegister, registHandler);
authRouter.post("/login",validateLogin, loginHandler)
authRouter.post("/logout", protect, logoutHandler)
authRouter.put("/update",protect, updateProfileHandler)

export default authRouter;