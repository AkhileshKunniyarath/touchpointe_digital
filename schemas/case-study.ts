import { z } from "zod";

import { baseContentSchema } from "@/schemas/shared";

export const caseStudySchema = baseContentSchema.extend({
  client: z.string().min(2, "Client is required."),
  sector: z.string().min(2, "Sector is required."),
  duration: z.string().min(2, "Duration is required."),
  challenge: z.string().min(10, "Challenge is required."),
  solution: z.string().min(10, "Solution is required."),
  results: z.array(z.string()).default([]),
  stack: z.array(z.string()).default([])
});

