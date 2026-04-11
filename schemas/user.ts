import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Valid email is required."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.enum(["admin"]).default("admin")
});

