import type { ResourceKey } from "@/lib/content-types";

export type AdminFieldType =
  | "text"
  | "textarea"
  | "richText"
  | "tags"
  | "image"
  | "date"
  | "number"
  | "select";

export type AdminFieldConfig = {
  name: string;
  label: string;
  type: AdminFieldType;
  placeholder?: string;
  helperText?: string;
  options?: Array<{ label: string; value: string }>;
};

type ResourceConfig = {
  key: ResourceKey;
  label: string;
  singular: string;
  headline: string;
  description: string;
  emptyState: string;
  accent: string;
  extraFields: AdminFieldConfig[];
};

export const resourceConfigs: Record<ResourceKey, ResourceConfig> = {
  services: {
    key: "services",
    label: "Services",
    singular: "Service",
    headline: "Growth systems that move fast and stay coherent.",
    description:
      "Touchpointe services blend brand, UX, engineering, and measurement so launches feel polished and teams stay unblocked.",
    emptyState: "Create your first service to highlight what Touchpointe delivers best.",
    accent: "from-sky-400/40 to-blue-500/20",
    extraFields: [
      { name: "icon", label: "Icon Name", type: "text", placeholder: "Sparkles" },
      { name: "priceFrom", label: "Price From", type: "text", placeholder: "$4,500" },
      {
        name: "outcomes",
        label: "Outcomes",
        type: "tags",
        helperText: "Comma-separated measurable outcomes or deliverables."
      },
      {
        name: "process",
        label: "Process Steps",
        type: "tags",
        helperText: "Comma-separated phases shown on the service detail page."
      },
      { name: "ctaLabel", label: "CTA Label", type: "text", placeholder: "Book a strategy call" },
      { name: "ctaHref", label: "CTA Link", type: "text", placeholder: "/contact" }
    ]
  },
  products: {
    key: "products",
    label: "Products",
    singular: "Product",
    headline: "Productized offers built for repeatable growth.",
    description:
      "From lead funnels to content engines, Touchpointe products package proven workflows into faster deploys and cleaner handoffs.",
    emptyState: "Create your first product to showcase packaged offers and digital products.",
    accent: "from-violet-400/40 to-blue-500/20",
    extraFields: [
      {
        name: "launchStage",
        label: "Launch Stage",
        type: "select",
        options: [
          { label: "Discovery", value: "Discovery" },
          { label: "Pilot", value: "Pilot" },
          { label: "Live", value: "Live" },
          { label: "Scale", value: "Scale" }
        ]
      },
      { name: "benefits", label: "Benefits", type: "tags", helperText: "Comma-separated product benefits." },
      { name: "stack", label: "Tech Stack", type: "tags", helperText: "Comma-separated technologies." },
      { name: "ctaLabel", label: "CTA Label", type: "text", placeholder: "Request a walkthrough" },
      { name: "ctaHref", label: "CTA Link", type: "text", placeholder: "/contact" }
    ]
  },
  blogs: {
    key: "blogs",
    label: "Blogs",
    singular: "Blog",
    headline: "Articles that turn implementation lessons into clear next steps.",
    description:
      "Blog content is structured for discovery, education, and trust building across inbound and retention journeys.",
    emptyState: "Create your first blog post to start the editorial library.",
    accent: "from-cyan-400/40 to-sky-500/20",
    extraFields: [
      { name: "author", label: "Author", type: "text", placeholder: "Touchpointe Team" },
      { name: "readTime", label: "Read Time", type: "number", placeholder: "6" }
    ]
  },
  insights: {
    key: "insights",
    label: "Insights",
    singular: "Insight",
    headline: "Sharper POV pieces for operators, founders, and marketing teams.",
    description:
      "Insights lean more strategic than blogs and help position Touchpointe as a systems-thinking partner.",
    emptyState: "Create your first insight to publish analysis or market perspective.",
    accent: "from-blue-500/40 to-indigo-500/20",
    extraFields: [
      { name: "author", label: "Author", type: "text", placeholder: "Touchpointe Strategy Desk" },
      { name: "readTime", label: "Read Time", type: "number", placeholder: "4" }
    ]
  },
  "case-studies": {
    key: "case-studies",
    label: "Case Studies",
    singular: "Case Study",
    headline: "Proof of what happens when systems, design, and delivery align.",
    description:
      "Case studies spotlight the before, the build, and the measurable outcome in a story format clients can trust.",
    emptyState: "Create your first case study to show outcomes, workflow, and business impact.",
    accent: "from-fuchsia-400/40 to-blue-500/20",
    extraFields: [
      { name: "client", label: "Client", type: "text", placeholder: "Northstar Labs" },
      { name: "sector", label: "Sector", type: "text", placeholder: "Healthcare" },
      { name: "duration", label: "Duration", type: "text", placeholder: "8 weeks" },
      { name: "challenge", label: "Challenge", type: "textarea", placeholder: "What problem needed solving?" },
      { name: "solution", label: "Solution", type: "textarea", placeholder: "How did Touchpointe solve it?" },
      { name: "results", label: "Results", type: "tags", helperText: "Comma-separated measurable results." },
      { name: "stack", label: "Tech Stack", type: "tags", helperText: "Comma-separated technologies." }
    ]
  },
  careers: {
    key: "careers",
    label: "Careers",
    singular: "Career",
    headline: "Recruit global talent directly.",
    description: "Publish open opportunities, roles, and hiring specifications actively available globally.",
    emptyState: "Create your first active job opening.",
    accent: "from-green-400/40 to-emerald-500/20",
    extraFields: [
      { name: "location", label: "Location", type: "text", placeholder: "San Francisco, CA or Remote" },
      { name: "department", label: "Department", type: "text", placeholder: "Engineering" },
      { name: "employmentType", label: "Employment Type", type: "select", options: [{label: "Full-Time", value: "Full-Time"}, {label: "Contract", value: "Contract"}] },
      { name: "salaryRange", label: "Salary Range", type: "text", placeholder: "$120,000 - $160,000" },
    ]
  }
};

export const resourceKeys = Object.keys(resourceConfigs) as ResourceKey[];

