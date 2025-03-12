import { BAD_REQUEST } from "../constants/http.codes";
import updateUserSchema from "../schemas/updateUserSchema";
import { HttpError } from "../utils/HttpError";


// Middleware to validate request body
const validateUpdate = (req, res, next) => {
  const result = updateUserSchema.safeParse(req.body);

  if (!result.success) {
    return next(new HttpError(result.error.errors[0].message, BAD_REQUEST)); // Bad Request
  }

  next();
};
export default validateUpdate;

