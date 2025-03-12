import AsyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Jobs from "../models/JobsModel.js";
import { OK } from "../constants/http.codes.js";

// Get All Users (Admin Only)
export const getAllUsers = AsyncHandler(async (req, res) => {
  const users = await User.find().select("-password"); // Exclude passwords

  res.status(OK).json({
    success: true,
    message: "All users fetched successfully",
    data: users,
  });
});

// Get All Users with Role 'Company Manager' (Admin Only)
export const getCompanyUsers = AsyncHandler(async (req, res) => {
  const companyUsers = await User.find({ role: "company_manager" }).select(
    "-password"
  );

  res.status(200).json({
    success: true,
    message: "Company managers fetched successfully",
    data: companyUsers,
  });
});

// Get All Jobs (Admin Only)
export const getAllJobs = AsyncHandler(async (req, res) => {
  const jobs = await Jobs.find().populate("userId", "firstname lastname email");

  res.status(OK).json({
    success: true,
    message: "All jobs fetched successfully",
    data: jobs,
  });
});
