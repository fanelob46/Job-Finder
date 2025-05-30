import express from "express";
import { ConnectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

import { notFound, errorHandler } from "./middlewares/errorMiddleWare.js";

import cors from "cors";
import { PORT } from "./constants/env.const.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/usersRoutes.js";
import jobsRouter from "./routes/JobsRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,DELETE,PUT",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);

app.use("/api/jobs", jobsRouter);
app.use("/api/v1/user", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  ConnectDB();
  console.log(`Server started on http://localhost:${PORT}`);
});
