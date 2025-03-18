import AsyncHandler from "express-async-handler"
import {  jobSchema } from "../schemas/jobSchema.js"

const validateJob = AsyncHandler(async (req,res,next) => {
    const result = jobSchema.safeParse(req.body);

    if (!result.success) {
      return next(result.error); // Pass error to the error handler
    }

    // If validation passes, attach validated data to req.body
    req.body = result.data;

    next(); 

})

export default validateJob;