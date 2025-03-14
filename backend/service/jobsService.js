import Jobs from "../models/JobsModel.js"

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