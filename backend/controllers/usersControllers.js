import { INTERNAL_SERVER_ERROR, OK } from "../constants/http.codes.js";
import User from "../models/UserModel.js";
import { applyForJob, getUserApplications } from "../service/authService.js";
import { deleteOneDoc, getAllDocs, getOneDoc, updateOneDoc } from "../service/crudHandlerFactor.js";
import { HttpError } from "../utils/HttpError.js";

export const getUser = getOneDoc(User);
export const deleteUser = deleteOneDoc(User);
export const updateUser = updateOneDoc(User);
export const getAllUser = getAllDocs(User);


export const applyForHandler = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.user._id;

  const result = await applyForJob(jobId, userId);
    res.status(OK).json({
      message: "Succesfully applied for a job",
      
    });
};

export const getUserApplicationsHandler = async (req, res) => {
  const userId = req.user._id;

  
    const result = await getUserApplications(userId);
     res.status(OK).json({
       message: "Jobs applied For",
       data: result,
     });
  
};
