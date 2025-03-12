import { z } from "zod";

const updateUserSchema = z
  .object({
    firstname: z.string().min(1).optional(),
    lastname: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(["user", "admin"]).optional(),
  })
  .strict();

export default updateUserSchema;