import { z } from "zod";

export const emailSchema = z.string().email("Invalid email");

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters, got it!");

  export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
  });

  export const registerSchema = loginSchema
    .extend({
      firstname: z.string().min(1, "First name is required"),
      lastname: z.string(1, "Last name is required"),
      confirmPassword: passwordSchema,
      role: z.enum(["user", "admin"]).default("user"),
      location: z.string().min(1, "location is required"),
      contact: z.string().min(1, "location is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password do not match",
      path: ["confirmPassword"],
    });