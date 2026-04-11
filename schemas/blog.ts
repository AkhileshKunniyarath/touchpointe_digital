import { z } from "zod";

import { baseContentSchema } from "@/schemas/shared";

export const blogSchema = baseContentSchema.extend({
  author: z.string().min(2, "Author is required."),
  readTime: z.number().int().min(1).max(60).default(4)
});

