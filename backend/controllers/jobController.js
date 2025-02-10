import AsyncHandler from "express-async-handler";
import Jobs from "../models/JobsModel.js";
import User from "../models/UserModel.js";
import Jobs from "../models/JobsModel.js";

export const addJob = AsyncHandler(async (req, res) => {
  const {
    title,
    type,
    location,
    salary,
    vacancies,
    experience,
    desc,
    requirements,
  } = req.body;

  const userId = req.user._id;

  // Find the logged-in user
  const loginUser = await User.findById(req.user._id);

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
      salary,
      vacancies,
      experience,
      desc,
      requirements,
      userId
    });
    const savedJob = await newJob.save();
    res.status(201).json({ success: true, data: savedJob });
  } catch (error) {
    console.error("Error in creating job:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export const GetallJobs = AsyncHandler( async (req,res) => {
    
   const id = req.user._id;
   const stringId = id instanceof Buffer ? id.toString() : id;

   // Check if the ID exists in the database
   if (!mongoose.Types.ObjectId.isValid(stringId)) {
     return res.status(404).json({
       success: false,
       message: "Invalid user ID",
     });
   }

    try {
        const jobs = await Jobs.find({ userId: id });
        res.status(200).json({
          success: true,
          message: "Succesfully fetched Jobs",
            data: jobs
        })
    } catch (error) {
         console.error(`Error: ${error.message}`);
         res.status(500).json({ success: false, message: "Server Error" });
    }

})

export const updateJob = AsyncHandler( async() => {
  
  const { id } = req.params;

  const jobs = req.body;

   try {
     const updatedJob = await Jobs.findByIdAndUpdate(id, jobs, { new: true });
     res.status(200).json({ success: true, data: updatedJob });
   } catch (error) {
     res.status(500).json({ success: false, message: "server error" });
   }
})

export const deleteJob = async(req, res) => {

  const {id} = req.params;
  try {
    const Jobs = await Jobs.findByIdAndDelete(id);

    if(!Jobs) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found" });
    }

     res
       .status(200)
       .json({ success: true, message: "Job deleted succesfully" });
  } catch (error) {
       res.status(500).json({ success: false, message: "internal server error" }); 
  }
  
}