import User from "../models/UserModel.js";
import { deleteOneDoc, getAllDocs, getOneDoc, updateOneDoc } from "../service/crudHandlerFactor.js";

export const getUser = getOneDoc(User);
export const deleteUser = deleteOneDoc(User);
export const updateUser = updateOneDoc(User);
export const getAllUser = getAllDocs(User);