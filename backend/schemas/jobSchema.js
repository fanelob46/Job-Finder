import { z } from "zod";

export const jobSchema = z.object({
  titile: z.string().min(3).optional(),
  type: z.string().min(3).optional(),
  location: z.string().min(3).optional(),
  category: z.string().min(3).optional(),
//   salary: z.coerce(inte)
  desc: z.string().min(3).optional(),
  requirements: z.string().min(3).optional(),
});