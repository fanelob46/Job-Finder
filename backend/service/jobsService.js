import { INTERNAL_SERVER_ERROR } from "../constants/http.codes.js";
import Jobs from "../models/JobsModel.js"
import { HttpError } from "../utils/HttpError.js";

export const addJob = async(jobData) => {
    const {
      title,
      type,
      location,
      category,
      salary,
      desc,
      requirements,
    } = jobData

    const newJob = await Jobs.create({
      title,
      type,
      location,
      category,
      salary,
      desc,
      requirements,
    });

    return newJob;
}

export const getJobApplications = async () => {

    // Find all jobs and populate the "application" field
    const jobs = await Jobs.find().populate(
      "application",
      "firstname lastname email"
    );

    // Map jobs to include job details and applicant information
    const jobApplications = jobs.map((job) => ({
      jobId: job._id,
      title: job.title,
      applicantsCount: job.application.length,
      applicants: job.application,
    }));

    if(jobs) {
return {
  success: true,
  data: jobApplications,
};
    } else {
      throw new HttpError("Server Error", INTERNAL_SERVER_ERROR)
    }

    
  };

