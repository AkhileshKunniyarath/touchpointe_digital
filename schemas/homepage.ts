import { z } from "zod";

export const homepageSchema = z.object({
  copy: z.record(z.string()).optional(),
  
  capabilities: z.array(z.object({
    title: z.string(),
    desc: z.string(),
    slug: z.string().optional()
  })).optional(),
  
  stats: z.array(z.object({
    label: z.string(),
    value: z.string()
  })).optional(),
  
  productsList: z.array(z.object({
    title: z.string(),
    desc: z.string(),
    tagline: z.string()
  })).optional(),
  
  labMetrics: z.array(z.object({
    label: z.string(),
    value: z.string()
  })).optional(),
  
  labSteps: z.array(z.object({
    title: z.string(),
    desc: z.string(),
    linkText: z.string()
  })).optional(),

  clients: z.array(z.string()).optional(),
  industries: z.array(z.string()).optional(),
  
  workflowSteps: z.array(
    z.object({
      id: z.string().optional(),
      title: z.string().min(1, "Title is required"),
      desc: z.string().min(1, "Description is required"),
    })
  ).optional(),
  
  aiSolutions: z.array(
    z.object({
      title: z.string().min(1, "Title is required"),
      desc: z.string().min(1, "Description is required"),
      color: z.string().optional(),
    })
  ).optional(),
  
  testimonials: z.array(
    z.object({
      quote: z.string().min(1, "Quote is required"),
      author: z.string().min(1, "Author is required"),
      role: z.string().optional(),
      company: z.string().optional(),
    })
  ).optional(),
});
