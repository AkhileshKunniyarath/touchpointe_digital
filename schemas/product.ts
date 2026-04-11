import { z } from "zod";

import { baseContentSchema } from "@/schemas/shared";

export const productSchema = baseContentSchema.extend({
  launchStage: z.string().default("Discovery"),
  benefits: z.array(z.string()).default([]),
  stack: z.array(z.string()).default([]),
  ctaLabel: z.string().optional().default(""),
  ctaHref: z.string().optional().default("")
});

