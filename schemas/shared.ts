import { z } from "zod";

export const publishStatusSchema = z.enum(["draft", "published"]);

export const baseContentSchema = z.object({
  title: z.string().min(2, "Title is required."),
  slug: z.string().min(2, "Slug is required."),
  summary: z.string().min(10, "Summary is required."),
  content: z.string().min(10, "Content is required."),
  category: z.string().min(2, "Category is required."),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().optional().default(""),
  featured: z.boolean().default(false),
  status: publishStatusSchema.default("draft"),
  seoTitle: z.string().optional().default(""),
  seoDescription: z.string().optional().default(""),
  publishedAt: z.string().optional().default("")
});

