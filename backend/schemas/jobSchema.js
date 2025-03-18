import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(3).optional(),
  type: z.string().min(3).optional(),
  location: z.string().min(3).optional(),
  category: z.string().min(3).optional(),
  salary: z.coerce.number().transform((val) => val.toString()),
  desc: z.string().min(3).optional(),
  requirements: z.string().min(3).optional(),
});