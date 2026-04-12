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
    title: "UI / UX Design",
    slug: "ui-ux-design",
    summary:
      "User-first interface design for web and mobile products that need clear navigation, higher engagement, and better conversion quality.",
    category: "Design",
    tags: ["UI Design", "UX Research", "Wireframing", "Prototyping"],
    icon: "PenTool",
    outcomes: ["Clearer user journeys", "Better conversion paths", "Consistent design language"],
    process: ["Discovery and UX audit", "Wireframes and IA", "Visual design system", "Prototype and usability testing"],
    ctaLabel: "Start a design audit",
    ctaHref: "/contact",
    priceFrom: "Custom quote",
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-01-12",
    content: `
      <p>Great products fail when users cannot understand what to do next. This service focuses on flow, clarity, and visual consistency from first click to final action.</p>
      <h2>What we deliver</h2>
      <ul>
        <li>Web and mobile UI/UX design tailored to your business goals</li>
        <li>Wireframes, clickable prototypes, and design-system-ready screens</li>
        <li>Usability validation to reduce friction before development</li>
      </ul>
      <p>The result is a cleaner product experience that teams can ship confidently and improve continuously.</p>
    `,
    seoTitle: "UI / UX Design Services",
    seoDescription: "Design digital products with stronger UX, clearer journeys, and conversion-focused interfaces."
  },
  {
    _id: "seed-service-2",
    title: "Web Development",
    slug: "web-development",
    summary:
      "Scalable web engineering across frontend, backend, and full-stack delivery for business-critical products and platforms.",
    category: "Engineering",
    tags: ["Next.js", "Node.js", "Full Stack", "E-commerce"],
    icon: "Code",
    outcomes: ["Fast, reliable builds", "Production-ready architecture", "Improved performance and SEO"],
    process: ["Scope and architecture", "Agile implementation", "Testing and optimization", "Launch and support"],
    ctaLabel: "Build my web platform",
    ctaHref: "/contact",
    priceFrom: "From $4,000",
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-01-18",
    content: `
      <p>From marketing sites to secure dashboards, we build web systems that stay fast under load and easy to evolve as requirements grow.</p>
      <h2>Core capabilities</h2>
      <ul>
        <li>Frontend engineering with modern React and Next.js stacks</li>
        <li>Backend APIs, data models, and integration workflows</li>
        <li>Security, performance tuning, and production hardening</li>
      </ul>
      <p>You get a maintainable codebase, clean deployment pipeline, and measurable delivery milestones.</p>
    `,
    seoTitle: "Web Development Services",
    seoDescription: "End-to-end web development for high-performance, scalable, and secure digital products."
  },
  {
    _id: "seed-service-3",
    title: "Mobile App Development",
    slug: "mobile-app-development",
    summary:
      "Native and cross-platform mobile app development for iOS and Android with production-grade architecture and API integrations.",
    category: "Engineering",
    tags: ["iOS", "Android", "React Native", "Flutter"],
    icon: "Smartphone",
    outcomes: ["Faster mobile launches", "Stable app performance", "Consistent cross-platform UX"],
    process: ["Product scope and flows", "UI and architecture", "Build and QA", "Store launch and support"],
    ctaLabel: "Build a mobile app",
    ctaHref: "/contact",
    priceFrom: "From $5,500",
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-01-22",
    content: `
      <p>Mobile users expect speed, clarity, and reliability. We build mobile applications that feel polished on day one and remain maintainable as your product evolves.</p>
      <h2>What we deliver</h2>
      <ul>
        <li>Native and cross-platform app delivery based on product needs</li>
        <li>Secure API integration, authentication, and offline-aware flows</li>
        <li>App Store and Play Store release support with QA checkpoints</li>
      </ul>
      <p>You get a production-ready mobile app with a clear roadmap for future feature expansion.</p>
    `,
    seoTitle: "Mobile App Development Services",
    seoDescription: "Build scalable iOS and Android applications with robust engineering and user-first design."
  },
  {
    _id: "seed-service-4",
    title: "Platform Development",
    slug: "platform-development",
    summary:
      "Custom platform builds for SaaS, enterprise portals, and multi-tenant products that require scale, resilience, and clean user workflows.",
    category: "Engineering",
    tags: ["SaaS", "Platform Engineering", "API Integration", "Mobile"],
    icon: "Layers",
    outcomes: ["Faster feature cycles", "Stable platform foundations", "Cross-team alignment"],
    process: ["Platform strategy", "Domain modeling", "Iterative build", "Operational handover"],
    ctaLabel: "Plan a platform build",
    ctaHref: "/contact",
    priceFrom: "From $6,500",
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-01-26",
    content: `
      <p>We build platforms that support real-world operations: admin modules, role-based access, integrations, and high-volume workflows.</p>
      <h2>What is included</h2>
      <ul>
        <li>Architecture for web, mobile, and integration layers</li>
        <li>Scalable backend services and data architecture</li>
        <li>Deployment and observability setup for reliability at scale</li>
      </ul>
      <p>Every release is planned around business outcomes, not just feature shipping.</p>
    `,
    seoTitle: "Platform Development Services",
    seoDescription: "Build secure, scalable platforms for SaaS and enterprise workloads."
  },
  {
    _id: "seed-service-5",
    title: "Product Development",
    slug: "product-development",
    summary:
      "Full-cycle product development from concept validation to launch, covering UX, engineering, QA, and growth-ready architecture.",
    category: "Engineering",
    tags: ["MVP", "Startup", "Roadmap", "Product Engineering"],
    icon: "Rocket",
    outcomes: ["Faster MVP launches", "Validated feature roadmap", "Lower rework cost"],
    process: ["Discovery workshop", "Prototype and validation", "Build and QA", "Launch and iteration"],
    ctaLabel: "Build my product",
    ctaHref: "/contact",
    priceFrom: "From $7,500",
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-02-02",
    content: `
      <p>Product success depends on speed and direction. We help teams avoid expensive detours by validating assumptions early and shipping in focused cycles.</p>
      <h2>Delivery model</h2>
      <ul>
        <li>Idea-to-MVP execution with measurable milestones</li>
        <li>Design and engineering in one coordinated workflow</li>
        <li>Post-launch iteration guided by user signals and product analytics</li>
      </ul>
      <p>You get a launchable product and a practical roadmap for the next stage of growth.</p>
    `
  },
  {
    _id: "seed-service-6",
    title: "Cloud Computing",
    slug: "cloud-computing",
    summary:
      "Cloud strategy, migration, and managed operations for teams that need better scalability, security posture, and infrastructure efficiency.",
    category: "Infrastructure",
    tags: ["AWS", "Azure", "GCP", "DevOps", "Cloud Migration"],
    icon: "CloudUpload",
    outcomes: ["Stronger reliability", "Lower infra waste", "Improved deployment velocity"],
    process: ["Cloud readiness audit", "Architecture design", "Migration or modernization", "Monitoring and optimization"],
    ctaLabel: "Modernize our cloud stack",
    ctaHref: "/contact",
    priceFrom: "Custom quote",
    featured: false,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-02-10",
    content: `
      <p>Cloud adoption should reduce friction, not increase complexity. We design and operate cloud environments that fit your workload and budget realities.</p>
      <h2>Service scope</h2>
      <ul>
        <li>Migration planning and execution with risk controls</li>
        <li>Cloud-native architecture, automation, and CI/CD setup</li>
        <li>Security, compliance checks, and proactive cost optimization</li>
      </ul>
      <p>The outcome is a stable cloud foundation teams can trust for long-term delivery.</p>
    `,
    seoTitle: "Cloud Computing Services",
    seoDescription: "Cloud consulting, migration, and managed operations for modern digital platforms."
  },
  {
    _id: "seed-service-7",
    title: "Technology Consultancy",
    slug: "technology-consultancy",
    summary:
      "Strategic technology advisory to align business goals, architecture decisions, and delivery roadmaps across teams.",
    category: "Strategy",
    tags: ["Consulting", "Architecture Review", "Digital Transformation", "CTO Advisory"],
    icon: "Compass",
    outcomes: ["Clearer technical direction", "Prioritized modernization plan", "Reduced delivery risk"],
    process: ["Stakeholder discovery", "System assessment", "Roadmap definition", "Execution support"],
    ctaLabel: "Book a strategy session",
    ctaHref: "/contact",
    priceFrom: "Custom engagement",
    featured: false,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-02-19",
    content: `
      <p>When product teams move fast without aligned technical strategy, delivery quality drops. We provide practical advisory grounded in implementation realities.</p>
      <h2>Consulting areas</h2>
      <ul>
        <li>Technology roadmap and modernization planning</li>
        <li>Architecture and vendor evaluation with tradeoff clarity</li>
        <li>Execution governance for high-impact initiatives</li>
      </ul>
      <p>Each engagement ends with clear priorities and actionable next steps your team can execute.</p>
    `
  },
  {
    _id: "seed-service-8",
    title: "AI and Machine Learning",
    slug: "ai-machine-learning",
    summary:
      "Applied AI and ML solutions for automation, predictive insights, and intelligent workflows integrated into your existing systems.",
    category: "Intelligence",
    tags: ["AI Strategy", "Machine Learning", "NLP", "Generative AI"],
    icon: "Cpu",
    outcomes: ["Smarter automation", "Operational insights", "Faster decision loops"],
    process: ["Use-case discovery", "Data readiness", "Model development", "Deployment and monitoring"],
    ctaLabel: "Design an AI roadmap",
    ctaHref: "/contact",
    priceFrom: "Custom quote",
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-02-27",
    content: `
      <p>AI should serve clear business goals. We identify high-value opportunities, build reliable ML workflows, and integrate intelligence where it matters.</p>
      <h2>Capabilities</h2>
      <ul>
        <li>Custom model development and predictive analytics</li>
        <li>NLP and generative AI integrations for business workflows</li>
        <li>MLOps setup for deployment, monitoring, and continuous improvement</li>
      </ul>
      <p>The focus stays on measurable impact, not experimentation without outcomes.</p>
    `,
    seoTitle: "AI and Machine Learning Services",
    seoDescription: "Deploy AI and ML solutions for automation, analytics, and scalable intelligent systems."
  },
  {
    _id: "seed-service-9",
    title: "Quality Assurance",
    slug: "quality-assurance",
    summary:
      "Comprehensive QA programs combining manual and automated testing to improve reliability, performance, and release confidence.",
    category: "Engineering",
    tags: ["QA", "Automation Testing", "Performance", "Security Testing"],
    icon: "ShieldCheck",
    outcomes: ["Fewer production defects", "Improved release confidence", "Stronger quality visibility"],
    process: ["QA planning", "Test design", "Execution and reporting", "Release sign-off"],
    ctaLabel: "Strengthen product quality",
    ctaHref: "/contact",
    priceFrom: "From $2,500",
    featured: false,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-03-05",
    content: `
      <p>Quality is a delivery multiplier when implemented early. We design QA workflows that uncover issues before they become expensive fixes.</p>
      <h2>QA coverage</h2>
      <ul>
        <li>Functional, regression, API, and cross-device testing</li>
        <li>Performance and security-oriented test scenarios</li>
        <li>Automation suites for faster, repeatable release validation</li>
      </ul>
      <p>Your team gets detailed quality reports with clear pass/fail signals before launch decisions.</p>
    `
  },
  {
    _id: "seed-service-10",
    title: "Digital Marketing",
    slug: "digital-marketing",
    summary:
      "Performance-led digital marketing across SEO, paid media, content, and conversion optimization to grow qualified pipeline.",
    category: "Marketing",
    tags: ["SEO", "PPC", "Content Marketing", "Analytics"],
    icon: "Megaphone",
    outcomes: ["Higher qualified traffic", "Better campaign ROI", "Improved conversion rates"],
    process: ["Channel audit", "Campaign strategy", "Execution and optimization", "Reporting and scale"],
    ctaLabel: "Scale our acquisition",
    ctaHref: "/contact",
    priceFrom: "Custom monthly plan",
    featured: false,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-03-14",
    content: `
      <p>Marketing performance improves when strategy, creative, and analytics move together. We run campaigns with continuous optimization and clear reporting.</p>
      <h2>Growth services</h2>
      <ul>
        <li>SEO and content programs for durable organic growth</li>
        <li>Paid campaigns across search and social channels</li>
        <li>Landing page and funnel optimization for better conversion economics</li>
      </ul>
      <p>Every campaign is tied to measurable outcomes, not vanity metrics.</p>
    `
  },
  {
    _id: "seed-service-11",
    title: "Outsourced Product Development",
    slug: "outsourced-product-development",
    summary:
      "Dedicated outsourced product teams that take ownership from discovery to delivery while integrating with your internal stakeholders.",
    category: "Engineering",
    tags: ["Dedicated Team", "Product Delivery", "Agile", "Outsourcing"],
    icon: "Users",
    outcomes: ["Faster delivery capacity", "Lower hiring pressure", "Predictable execution cadence"],
    process: ["Discovery and planning", "Team onboarding", "Sprint-based delivery", "Ongoing optimization"],
    ctaLabel: "Discuss team extension",
    ctaHref: "/contact",
    priceFrom: "Flexible engagement",
    featured: true,
    status: "published",
    coverImage: logo,
    publishedAt: "2026-03-22",
    content: `
      <p>When in-house teams are overloaded, delivery slows and priorities slip. Our outsourced product squads plug into your workflow and ship with accountability.</p>
      <h2>Engagement model</h2>
      <ul>
        <li>Cross-functional product teams aligned to your roadmap</li>
        <li>Transparent sprint planning, demos, and delivery reporting</li>
        <li>Flexible scaling based on product phase and budget</li>
      </ul>
      <p>You get execution speed without sacrificing product quality or ownership visibility.</p>
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
