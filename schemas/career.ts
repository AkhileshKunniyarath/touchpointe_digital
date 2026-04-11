import { z } from "zod";
import { baseContentSchema } from "./shared";

export const careerSchema = baseContentSchema.extend({
  location: z.string().min(1, "Location is required"),
  department: z.string().min(1, "Department is required"),
  employmentType: z.string().min(1, "Employment Type is required"),
  salaryRange: z.string().optional()
});
