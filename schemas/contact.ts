import { z } from "zod";

export const contactSubmissionSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Enter a valid email."),
  company: z.string().optional().default(""),
  serviceInterest: z.string().min(2, "Please choose a service area."),
  message: z.string().min(20, "Tell us a bit more about your project.")
});

