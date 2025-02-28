import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleWare.js";
import JobRouter from "./routes/JobRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/jobs", JobRouter);
app.use("/api/users", adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  ConnectDB();
  console.log(`Server started on http://localhost:${PORT}`);
});
