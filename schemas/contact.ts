import { z } from "zod";

export const contactSubmissionSchema = z.object({
  name: z.string().optional().default(""),
  email: z.string().email("Enter a valid email."),
  phone: z.string().regex(/^[+\d\s\-().]{7,20}$/, "Enter a valid phone number.").optional().or(z.literal("")).default(""),
  company: z.string().optional().default(""),
  serviceInterest: z.string().optional().default(""),
  message: z.string().optional().default(""),
});
