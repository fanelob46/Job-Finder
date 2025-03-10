import AsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Jobs from "../models/JobsModel.js";
import User from "../models/UserModel.js";


export const addJob = AsyncHandler(async (req, res) => {
  const {
    title,
    type,
    location,
    category,
    salary,
    vacancies,
    exprience,
    desc,
    requirements,
  } = req.body;
  const userId = req.user._id;

  // Find the logged-in user
  const loginUser = await User.findById(userId);
  if (!loginUser || !["admin", "company_manager"].includes(loginUser.role)) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Only admin and company managers can add jobs.",
    });
  }

  try {
    const newJob = new Jobs({
      title,
      type,
      location,
      category,
      salary,
      vacancies,
      exprience,
      desc,
      requirements,
      userId,
    });

    const savedJob = await newJob.save();
    res.status(201).json({ success: true, data: savedJob });
  } catch (error) {
    console.error("Error in creating job:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


export const GetallJobs = AsyncHandler(async (req, res) => {

  
  const userId = req.user._id;
  

  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });
  }

  try {
    const jobs = await Jobs.find({ userId });
    res.status(200).json({
      success: true,
      message: "Successfully fetched jobs",
      data: jobs,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


export const updateJob = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const jobData = req.body;
  const userId = req.user._id;

  // Check if the user is authorized to update the job
  const loginUser = await User.findById(userId);
  if (!loginUser || !["admin", "company_manager"].includes(loginUser.role)) {
    return res.status(403).json({
      success: false,
      message:
        "Access denied. Only admin and company managers can update jobs.",
    });
  }

  try {
    const updatedJob = await Jobs.findByIdAndUpdate(id, jobData, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, data: updatedJob });
  } catch (error) {
    console.error("Error updating job:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


export const deleteJob = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Jobs.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


export const getJobApplications = AsyncHandler(async (req, res) => {
  try {
    const jobs = await Jobs.find().populate(
      "application",
      "firstname lastname email"
    );

    const jobApplications = jobs.map((job) => ({
      jobId: job._id,
      title: job.title,
      applicantsCount: job.application.length,
      applicants: job.application,
    }));

    res.status(200).json({ success: true, data: jobApplications });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export const liveFeedJobs = AsyncHandler(async(req, res) => {
  try {
    const jobs = await Jobs.find({  });
    res.status(200).json({
      success: true,
      message: "Successfully fetched jobs",
      data: jobs,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
})
