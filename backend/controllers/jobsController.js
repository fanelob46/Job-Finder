import asyncHandler from "express-async-handler";
import Jobs from "../models/JobsModel.js";
import { deleteOneDoc, getAllDocs, getOneDoc, updateOneDoc } from "../service/crudHandlerFactor.js";
import { addJob } from "../service/jobsService.js";
import { CREATED } from "../constants/http.codes.js";

export const getJob = getOneDoc(Jobs);
export const deleteJob = deleteOneDoc(Jobs);
export const updateJob = updateOneDoc(Jobs);
export const getAllJobs = getAllDocs(Jobs);

export const addJobHandler = asyncHandler( async(req,res,next) => {
    const job = addJob(req.body);

    const data = new Jobs(job)

    res.status(CREATED).json({
        message: "Job Created Successfully",
        data: data
    })

})
