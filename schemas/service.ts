import { z } from "zod";

import { baseContentSchema } from "@/schemas/shared";

export const serviceSchema = baseContentSchema.extend({
  icon: z.string().optional().default("Sparkles"),
  outcomes: z.array(z.string()).default([]),
  process: z.array(z.string()).default([]),
  ctaLabel: z.string().optional().default(""),
  ctaHref: z.string().optional().default(""),
  priceFrom: z.string().optional().default("")
});
