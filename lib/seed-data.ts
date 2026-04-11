import type {
  Blog,
  CaseStudy,
  Insight,
  Product,
  ResourceCollectionMap,
  ResourceKey,
  Service
} from "@/lib/content-types";

const logo = "/brand/logo.jpeg";

export const seedServices: Service[] = [
  {
    _id: "seed-service-1",
    title: "Conversion Website Systems",
    slug: "conversion-website-systems",
    summary:
      "Full-funnel websites designed to clarify offers, shorten decision time, and give marketing teams room to scale.",
    category: "Web Experience",
    tags: ["Next.js", "UX Strategy", "SEO"],
    icon: "Rocket",
    outcomes: ["Sharper positioning", "Faster launch cycles", "Higher conversion quality"],
    process: ["Discovery sprint", "Narrative architecture", "Design and development", "Optimization loop"],
    ctaLabel: "Launch a website sprint",
    ctaHref: "/contact",
    priceFrom: "$4,500",
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-01-20",
    content: `
      <p>Touchpointe builds websites that are more than polished marketing shells. We design the journey from the first headline to the final CTA so the whole experience supports trust, clarity, and action.</p>
      <h2>What is included</h2>
      <ul>
        <li>Offer positioning and messaging hierarchy</li>
        <li>Component-driven UI design and responsive implementation</li>
        <li>CMS-ready publishing workflows for internal teams</li>
      </ul>
      <p>The result is a fast, flexible website system your team can keep improving after launch.</p>
    `,
    seoTitle: "Conversion Website Systems",
    seoDescription: "Launch high-performance websites built for positioning, conversion, and scale."
  },
  {
    _id: "seed-service-2",
    title: "Content Operations Design",
    slug: "content-operations-design",
    summary:
      "Editorial systems, page templates, and publishing workflows that help small teams ship content without chaos.",
    category: "Content Engine",
    tags: ["Content Strategy", "CMS", "Editorial Ops"],
    icon: "PenTool",
    outcomes: ["Consistent publishing", "Fewer content bottlenecks", "Clear reuse across channels"],
    process: ["Audit and map", "Template design", "Authoring workflow", "Team enablement"],
    ctaLabel: "Build a content engine",
    ctaHref: "/contact",
    priceFrom: "$3,200",
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-02-14",
    content: `
      <p>Publishing momentum usually breaks where structure is missing. This service rebuilds the content pipeline so strategy, design, and writing support one another instead of competing for time.</p>
      <p>We define reusable blocks, optimize authoring paths, and create a system that makes quality content easier to repeat.</p>
    `,
    seoTitle: "Content Operations Design",
    seoDescription: "Build a content system that keeps publishing quality high and effort manageable."
  },
  {
    _id: "seed-service-3",
    title: "Launch Readiness Audits",
    slug: "launch-readiness-audits",
    summary:
      "A focused review of your site, product messaging, and conversion pathways before a campaign or product launch.",
    category: "Advisory",
    tags: ["Audit", "Performance", "Launch"],
    icon: "Radar",
    outcomes: ["Cleaner launch checklist", "Clearer onboarding path", "Lower post-launch scramble"],
    process: ["Signal review", "Gap analysis", "Prioritization", "Fix-forward roadmap"],
    ctaLabel: "Book an audit",
    ctaHref: "/contact",
    priceFrom: "$1,800",
    featured: false,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-03-08",
    content: `
      <p>When launches miss, it is rarely because one big thing broke. More often it is a stack of small gaps: weak narrative, fuzzy calls to action, inconsistent proof, or fragile production setup.</p>
      <p>Touchpointe audits the full experience and gives your team a ranked roadmap of what to tighten before launch.</p>
    `
  }
];

export const seedProducts: Product[] = [
  {
    _id: "seed-product-1",
    title: "Leadflow OS",
    slug: "leadflow-os",
    summary:
      "A conversion-focused website starter and CRM-ready content framework for service businesses that need momentum fast.",
    category: "Acquisition",
    tags: ["Lead Gen", "CRM", "Automation"],
    launchStage: "Live",
    benefits: ["Ready-made conversion sections", "Clear lead qualification path", "Flexible content blocks"],
    stack: ["Next.js", "MongoDB", "Analytics"],
    ctaLabel: "Request a walkthrough",
    ctaHref: "/contact",
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-01-09",
    content: `
      <p>Leadflow OS packages the essentials for a strong first digital system: conversion pages, editorial framework, analytics hooks, and CRM-friendly capture points.</p>
      <p>It is ideal for businesses that need to stand up something substantial quickly without reinventing the wheel.</p>
    `,
    seoTitle: "Leadflow OS",
    seoDescription: "A lead generation website starter system built for service businesses."
  },
  {
    _id: "seed-product-2",
    title: "Signalboard",
    slug: "signalboard",
    summary:
      "A lightweight internal dashboard concept for surfacing content performance, campaign signals, and priority fixes.",
    category: "Reporting",
    tags: ["Dashboard", "Analytics", "Ops"],
    launchStage: "Pilot",
    benefits: ["Shared reporting language", "Quicker decision loops", "Prioritized optimization"],
    stack: ["Next.js", "MongoDB", "Charting"],
    ctaLabel: "Join the pilot",
    ctaHref: "/contact",
    featured: false,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-02-03",
    content: `
      <p>Signalboard helps teams stop guessing which updates matter. It pulls the most useful signals into one view so momentum stays focused.</p>
      <p>The product is designed for lean teams who want visibility without enterprise complexity.</p>
    `
  },
  {
    _id: "seed-product-3",
    title: "Editorial Pipeline Kit",
    slug: "editorial-pipeline-kit",
    summary:
      "A repeatable structure for planning, producing, and publishing articles, insights, and case studies across a growing site.",
    category: "Content",
    tags: ["CMS", "Workflow", "Publishing"],
    launchStage: "Scale",
    benefits: ["Reusable templates", "Clear approval flow", "Stronger SEO structure"],
    stack: ["TipTap", "Zod", "Next.js"],
    ctaLabel: "See the workflow",
    ctaHref: "/tech-stack",
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-03-12",
    content: `
      <p>This kit turns ad hoc publishing into a process the whole team can understand. It is especially useful when a brand wants to expand output without multiplying confusion.</p>
    `
  }
];

export const seedBlogs: Blog[] = [
  {
    _id: "seed-blog-1",
    title: "What High-Converting Service Websites Do in the First 20 Seconds",
    slug: "high-converting-service-websites-first-20-seconds",
    summary:
      "A breakdown of the trust signals, structure, and message sequencing that help visitors understand value almost instantly.",
    category: "Conversion",
    tags: ["Messaging", "UX", "Website"],
    author: "Touchpointe Team",
    readTime: 6,
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-02-28",
    content: `
      <p>Most visitors are not looking for every detail right away. They are looking for enough clarity to decide whether your site deserves deeper attention.</p>
      <h2>The first layer of confidence</h2>
      <p>That confidence usually comes from positioning, social proof, and a path that feels specific to the visitor's need.</p>
      <p>When those pieces are missing, even a beautiful site can feel expensive but uncertain.</p>
    `
  },
  {
    _id: "seed-blog-2",
    title: "How to Turn a Case Study Into Three High-Value Marketing Assets",
    slug: "turn-a-case-study-into-three-high-value-marketing-assets",
    summary:
      "A practical workflow for extending the value of delivery work into blog, sales, and social-ready content.",
    category: "Content Repurposing",
    tags: ["Case Study", "Content", "Marketing"],
    author: "Touchpointe Team",
    readTime: 5,
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-03-17",
    content: `
      <p>Case studies are often underused because teams publish them once and move on. The better move is to treat each one as source material for multiple touchpoints.</p>
      <ul>
        <li>Turn the narrative into an educational article</li>
        <li>Extract proof points for sales or proposal decks</li>
        <li>Convert standout metrics into short-form content</li>
      </ul>
    `
  },
  {
    _id: "seed-blog-3",
    title: "Draft vs Published Workflows: Why Small Teams Need the Toggle",
    slug: "draft-vs-published-workflows-why-small-teams-need-the-toggle",
    summary:
      "Publishing states are a small product decision that makes large content systems feel much safer to operate.",
    category: "Operations",
    tags: ["CMS", "Workflow", "Publishing"],
    author: "Touchpointe Team",
    readTime: 4,
    featured: false,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-04-02",
    content: `
      <p>When everything is either live or non-existent, teams hesitate. Draft states create room for review, experimentation, and editorial confidence.</p>
      <p>That small toggle often becomes the difference between a usable CMS and one people avoid.</p>
    `
  }
];

export const seedInsights: Insight[] = [
  {
    _id: "seed-insight-1",
    title: "The Best Website Teams Think in Systems, Not Pages",
    slug: "best-website-teams-think-in-systems-not-pages",
    summary:
      "Why page-by-page execution eventually creates friction, and how systems thinking keeps design, content, and engineering aligned.",
    category: "Strategy",
    tags: ["Systems", "Teamwork", "Design Ops"],
    author: "Touchpointe Strategy Desk",
    readTime: 4,
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-03-04",
    content: `
      <p>When teams focus only on individual pages, they usually end up relearning the same decisions over and over. Systems thinking reduces that waste.</p>
      <p>It also creates a healthier environment for growth because new pages inherit stronger structure from the start.</p>
    `
  },
  {
    _id: "seed-insight-2",
    title: "Why Content Velocity Falls Apart Without Design Involvement",
    slug: "why-content-velocity-falls-apart-without-design-involvement",
    summary:
      "A strategic look at the hidden role design systems play in keeping publishing operations fast, repeatable, and high quality.",
    category: "Operations",
    tags: ["Design Systems", "Content Ops", "Velocity"],
    author: "Touchpointe Strategy Desk",
    readTime: 5,
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-03-26",
    content: `
      <p>Content velocity is often framed as a writing problem. In reality it is usually a structure problem. Design gives the structure that writing can move through efficiently.</p>
    `
  },
  {
    _id: "seed-insight-3",
    title: "The Quiet Advantage of an Internal Media Library",
    slug: "quiet-advantage-of-an-internal-media-library",
    summary:
      "How simple asset governance improves consistency, team speed, and campaign quality across a growing digital presence.",
    category: "Infrastructure",
    tags: ["Media", "Brand Ops", "Assets"],
    author: "Touchpointe Strategy Desk",
    readTime: 3,
    featured: false,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-04-05",
    content: `
      <p>Teams do not notice the drag of scattered assets until they are under pressure. A reliable media library removes friction and helps brand execution stay steady.</p>
    `
  }
];

export const seedCaseStudies: CaseStudy[] = [
  {
    _id: "seed-case-study-1",
    title: "Rebuilding a B2B Pipeline Around Clearer Product Positioning",
    slug: "rebuilding-a-b2b-pipeline-around-clearer-product-positioning",
    summary:
      "Touchpointe redesigned a fragmented marketing site into a focused demand-generation system for a B2B software team.",
    category: "B2B SaaS",
    tags: ["Positioning", "Website", "Pipeline"],
    client: "Northstar Systems",
    sector: "B2B SaaS",
    duration: "10 weeks",
    challenge:
      "The client had traffic but weak conversion quality. Messaging was broad, proof was buried, and campaign landing pages felt disconnected from the main brand experience.",
    solution:
      "We rebuilt the narrative hierarchy, introduced reusable landing page modules, and tied product proof more directly to buyer concerns.",
    results: ["42% increase in qualified leads", "31% faster campaign page delivery", "Clearer handoff to sales"],
    stack: ["Next.js", "MongoDB", "GA4", "MinIO"],
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-02-10",
    content: `
      <p>This engagement focused on one core question: how do we help the right buyers understand value sooner?</p>
      <h2>Approach</h2>
      <p>Touchpointe aligned positioning, navigation, proof, and CTA pathways into a tighter system that marketing could scale.</p>
      <h2>Outcome</h2>
      <p>The team left with a more credible digital story and a website that made campaign work easier instead of harder.</p>
    `
  },
  {
    _id: "seed-case-study-2",
    title: "Building a Publishing Engine for a Small Expert-Led Brand",
    slug: "building-a-publishing-engine-for-a-small-expert-led-brand",
    summary:
      "A content and CMS redesign that helped a lean advisory business publish more consistently without adding headcount.",
    category: "Professional Services",
    tags: ["CMS", "Editorial", "Workflow"],
    client: "Harbor Advisory",
    sector: "Professional Services",
    duration: "6 weeks",
    challenge:
      "The founder had valuable ideas but no repeatable way to turn them into blogs, insights, and proof-backed content on the website.",
    solution:
      "Touchpointe introduced structured content types, author-friendly publishing flows, and reusable templates for educational articles and case studies.",
    results: ["3x publishing frequency", "Shorter edit cycles", "Stronger search visibility"],
    stack: ["Next.js", "TipTap", "Zod", "MongoDB"],
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-03-01",
    content: `
      <p>The project was less about adding complexity and more about removing uncertainty from the publishing process.</p>
      <p>By the end of the build, the client had a cleaner path from idea to publish-ready page.</p>
    `
  }
];

export const seedData: ResourceCollectionMap = {
  services: seedServices,
  products: seedProducts,
  blogs: seedBlogs,
  insights: seedInsights,
  "case-studies": seedCaseStudies,
  careers: []
};

export function getSeedCollection<T extends ResourceKey>(resource: T): ResourceCollectionMap[T] {
  return seedData[resource];
}

export const siteStats = [
  { value: "5", label: "core content systems" },
  { value: "10w", label: "typical flagship launch" },
  { value: "42%", label: "lead quality lift in recent case study" }
];

export const workflowSteps = [
  {
    title: "Diagnose the signal",
    description:
      "We start by understanding where clarity, conversion, or content throughput is breaking down."
  },
  {
    title: "Design the system",
    description:
      "Offer structure, UX, data shape, and editorial workflows are designed together so the build stays coherent."
  },
  {
    title: "Ship the experience",
    description:
      "Pages, APIs, admin tools, and asset handling are built as one operating layer instead of isolated parts."
  },
  {
    title: "Scale with confidence",
    description:
      "After launch, the site stays easy to grow through reusable content types, filters, and measurable content performance."
  }
];

export const techStackGroups = [
  {
    label: "Frontend",
    items: ["Next.js 14", "App Router", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    label: "CMS & Validation",
    items: ["MongoDB", "Mongoose", "Zod", "TipTap", "NextAuth"]
  },
  {
    label: "Infrastructure",
    items: ["MinIO", "Route Handlers", "ISR", "GA4", "SEO Metadata"]
  }
];
