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
    title: "Custom Software Development",
    slug: "custom-software-development",
    summary:
      "Scalable web applications, enterprise ERPs, and custom internal tools built for Indian businesses.",
    category: "Software",
    tags: [".NET", "React", "Next.js", "Node"],
    icon: "Code2",
    outcomes: ["Automated paper workflows", "Centralised business data", "Custom features off-the-shelf software lacks", "Real-time metrics tracking"],
    process: ["Requirement mapping", "System architecture", "Agile coding", "Deployment & Staff Training", "Ongoing Retainer Support"],
    ctaLabel: "Discuss custom software",
    ctaHref: "/contact",
    priceFrom: "₹65,000",
    featured: true,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    publishedAt: "2026-01-20",
    content: `
      <h2>Software Built for How You Actually Work</h2>
      <p>Stop forcing your employees and customers to use clunky spreadsheets or generic software that doesn't fit your exact business processes. We build custom software solutions engineered specifically for the nuances of your daily operations, ensuring a 100% fit for your unique requirements.</p>
      
      <h3>What We Deliver</h3>
      <ul>
        <li><strong>Enterprise Web Applications:</strong> Fast, cloud-based applications that run in any browser. Built on scalable architectures to handle thousands of concurrent users.</li>
        <li><strong>ERP & CRM Systems:</strong> Don't pay insane licensing fees to Salesforce or SAP. We build bespoke systems to manage your inventory, sales pipeline, and human resources from one custom dashboard.</li>
        <li><strong>Internal Dashboards:</strong> Give your management team a bird's eye view of all business metrics instantly with real-time data visualization.</li>
        <li><strong>Legacy System Modernization:</strong> We take your ancient, slow, desktop-bound software and rebuild it for the modern cloud era without losing your historical data.</li>
      </ul>
      
      <blockquote>"Touchpointe's custom ERP completely transformed how we handle logistics. What used to take 14 spreadsheets now happens automatically in one beautiful portal."</blockquote>
      
      <h3>The Technical Advantage</h3>
      <p>We do not use messy drag-and-drop builders for enterprise software. We write clean, proprietary code using modern stacks like Next.js, Node.js, and PostgreSQL. This guarantees that your software is incredibly fast, secure, and most importantly, scalable. You hold the intellectual property, free from vendor lock-in.</p>
      
      <p>Whether you need a specialized B2B portal for your dealers or an operational app for your remote fulfillment team, we deliver enterprise-grade software accessible at highly competitive local market rates.</p>
    `,
    seoTitle: "Custom Software Development | Enterprise Web Apps & CRM",
    seoDescription: "Custom software development including web applications, enterprise systems, and internal tools."
  },
  {
    _id: "seed-service-2",
    title: "Web Development",
    slug: "web-development",
    summary:
      "Lightning-fast business websites, local E-commerce platforms, and lead generation landing pages.",
    category: "Web Experience",
    tags: ["Next.js", "Tailwind", "SEO"],
    icon: "Globe",
    outcomes: ["Rank higher on Google", "Convert visitors into WhatsApp leads", "Load instantly on 3G connections", "Build brand authority"],
    process: ["Wireframing", "UI/UX Design", "Frontend Coding", "Speed & SEO Optimisation", "Analytics Integration"],
    ctaLabel: "Launch a website",
    ctaHref: "/contact",
    priceFrom: "₹25,000",
    featured: true,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1000&auto=format&fit=crop",
    publishedAt: "2026-02-14",
    content: `
      <h2>Websites That Work as Your 24/7 Sales Executive</h2>
      <p>In today's highly competitive digital landscape, a slow, confusing, or outdated website is actively losing you customers to competitors. A website shouldn't just be a digital brochure; it should be a relentlessly optimizing sales engine. We build incredibly fast, mobile-first websites that look premium and are engineered specifically to generate leads and sales.</p>
      
      <h3>Our Web Solutions:</h3>
      <ul>
        <li><strong>Business Portfolios:</strong> Establish instant, undeniable credibility for your agency, clinic, law firm, or corporate enterprise with stunning visual aesthetics.</li>
        <li><strong>E-commerce Stores:</strong> Custom payment gateways (Razorpay, PayTM, Stripe), deep inventory sync, and seamless frictionless checkout to sell your products online scaleably.</li>
        <li><strong>Progressive Web Apps (PWAs):</strong> Websites that behave exactly like native apps, capable of sending push notifications and being saved to a customer's home screen.</li>
        <li><strong>Lead Gen Landing Pages:</strong> Highly optimized, A/B tested pages designed solely to collect customer details and scale parallel Google/Facebook ad campaigns.</li>
      </ul>
      
      <h3>Why Speed Matters</h3>
      <p>Did you know that 53% of mobile users abandon sites that take longer than 3 seconds to load? We don't settle for bloated WordPress templates that load sluggishly. We build exclusively using modern React and Next.js technology for unmatched, near-instant performance, ensuring maximum conversion rates.</p>
    `,
    seoTitle: "Modern Web Development & E-commerce",
    seoDescription: "High-performance business websites, e-commerce platforms, and PWAs."
  },
  {
    _id: "seed-service-3",
    title: "Mobile App Development",
    slug: "mobile-app-development",
    summary:
      "Native and cross-platform mobile applications for Android and iOS devices.",
    category: "Mobile",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    icon: "Smartphone",
    outcomes: ["Live on Google Play & App Store", "Smooth 60fps animations", "Offline sync capabilities", "Push notifications"],
    process: ["App UX Design", "Prototyping", "Full-stack engineering", "Beta Testing", "Store Publishing"],
    ctaLabel: "Build your app",
    ctaHref: "/contact",
    priceFrom: "₹45,000",
    featured: true,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
    publishedAt: "2026-03-08",
    content: `
      <h2>Put Your Business In Your Customers' Pockets</h2>
      <p>Building a robust mobile app is the ultimate way to retain users, build brand loyalty, and establish a direct line of communication with your audience. We engineer sleek, blazing-fast, and crash-free mobile applications that users genuinely enjoy interacting with daily.</p>
      
      <h3>App Development Expertise:</h3>
      <ul>
        <li><strong>Cross-Platform Mastery (Flutter & React Native):</strong> We write the code once and deploy it beautifully to both Android and iOS simultaneously. This saves you roughly 40% in initial development costs and drastically speeds up your time-to-market.</li>
        <li><strong>Native iOS & Android Performance:</strong> For highly complex applications requiring heavy device hardware access (like Bluetooth, AR, machine learning, or complex threading), we build directly in Kotlin and Swift.</li>
        <li><strong>Immaculate UI/UX Design:</strong> An app is only as good as its interface. We follow Apple's Human Interface Guidelines and Google's Material Design to ensure the app feels intuitive from the first tap.</li>
      </ul>

      <h3>End-to-End Store Publishing</h3>
      <p>Getting rejected by the App Store for arbitrary technical reasons is a nightmare. Our team handles the entirety of the frustrating App Store and Google Play approval processes, server-side API setups, and privacy policy compliance so you don't have to worry about the technical details.</p>
    `
  },
  {
    _id: "seed-service-4",
    title: "SaaS Product Development",
    slug: "saas-product-development",
    summary:
      "End-to-end building for scalable Software-as-a-Service businesses with recurring billing.",
    category: "Software",
    tags: ["SaaS", "Multi-tenant", "Razorpay Subscriptions"],
    icon: "Rocket",
    outcomes: ["Scalable multi-tenant databases", "Secure user role management", "Automated recurring revenue", "SAML/SSO Integration"],
    process: ["MVP Scoping", "Database Architecture", "Core Feature Development", "Stripe/Razorpay Integrations", "Beta Launch"],
    ctaLabel: "Start your SaaS",
    ctaHref: "/contact",
    priceFrom: "₹1,20,000",
    featured: true,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    publishedAt: "2026-03-10",
    content: `
      <h2>Turning Your Idea Into a Global Subscription Business</h2>
      <p>Building a SaaS (Software as a Service) platform is vastly different from building a simple website or an internal tool. It demands rigorous database structuring, secure multi-tenant architecture, and flawless subscription logic to handle global users reliably.</p>
      
      <h3>Our Specialized SaaS Blueprint:</h3>
      <ul>
        <li><strong>Rapid MVP Development:</strong> We help you cut the fat and launch a Minimum Viable Product quickly (often in 6-8 weeks) so you can start validating the market with real paying users without wasting capital on assumptions.</li>
        <li><strong>Subscription & Billing Integration:</strong> Complex recurring billing logic using Razorpay, Stripe, or LemonSqueezy. We handle monthly tiers, annual discounts, prorated upgrades/downgrades, dunning management, and automated invoice generation.</li>
        <li><strong>Multi-tenant Architecture Security:</strong> Ensuring that Client A can never accidentally (or maliciously) access Client B's data is paramount. We build absolute data isolation security into the foundation of the app.</li>
        <li><strong>Growth-Ready Infrastructure:</strong> Your app needs to remain fast regardless of whether you have 100 or 100,000 active users logged in. We architect serverless environments that auto-scale effortlessly to meet demand.</li>
      </ul>
      
      <p>Partner with us, a highly technical co-founding development force, to stop worrying about code and start focusing on customer acquisition.</p>
    `
  },
  {
    _id: "seed-service-5",
    title: "AI & Automation Solutions",
    slug: "ai-and-automation-solutions",
    summary:
      "Custom AI chatbots, LLM integrations, and Zapier/Make workflow automations to slash manual effort.",
    category: "AI",
    tags: ["OpenAI", "Chatbots", "Workflow Automation"],
    icon: "Bot",
    outcomes: ["24/7 intelligent customer support", "Zero manual data entry", "Deep actionable reports", "Exponential productivity increase"],
    process: ["Workflow Audit", "AI Model Tuning (RAG)", "API Integration", "Testing Edge Cases", "Go-Live"],
    ctaLabel: "Automate your business",
    ctaHref: "/contact",
    priceFrom: "₹35,000",
    featured: true,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    publishedAt: "2026-03-15",
    content: `
      <h2>Work Smarter, Not Harder With Exponential Intelligence</h2>
      <p>Artificial Intelligence isn't just a futuristic buzzword; it is a practical, brutal force-multiplier that can immediately save your business hundreds of hours in manual, repetitive labour. We integrate powerful Large Language Models (like OpenAI's ChatGPT, Gemini, and Anthropic's Claude) directly into your custom business processes.</p>
      
      <h3>What AI Can Do For Your Bottom Line:</h3>
      <ul>
        <li><strong>Custom Trained AI Chatbots (RAG):</strong> We feed an AI your company's entire PDF knowledge base, past emails, and training manuals. The result is an elite virtual employee that can answer complex customer queries on WhatsApp, Instagram, or your website with 100% accuracy, 24/7, without requiring a salary.</li>
        <li><strong>No-Code Workflow Automation:</strong> Stop paying employees to copy data from emails to spreadsheets, or from your CRM to your accounting software. We use high-tier integration tools like Make and Zapier to connect your disjointed apps so they silently talk to each other in the background automatically.</li>
        <li><strong>Intelligent Data Analysis:</strong> Custom Python scripts that instantly process massive spreadsheets—saving financial personnel hours—and generate narrative insights on exactly where your operational bottlenecks are.</li>
      </ul>
      
      <p>By leveraging intelligent automation, you can scale operations 10x without needing to proportionally hire 10x the staff.</p>
    `
  },
  {
    _id: "seed-service-6",
    title: "Cloud & DevOps",
    slug: "cloud-and-devops",
    summary:
      "AWS, DigitalOcean, and Hostinger deployments, server optimisation, and secure data backups.",
    category: "Infrastructure",
    tags: ["AWS", "Docker", "VPS", "CI/CD"],
    icon: "CloudCog",
    outcomes: ["99.9% guaranteed uptime", "Lower monthly server costs", "Automated code deployments", "Nightly automated backups"],
    process: ["Architecture Review", "Containerisation", "Load Balancing", "Pipeline Setup", "Active Monitoring"],
    ctaLabel: "Optimise infrastructure",
    ctaHref: "/contact",
    priceFrom: "₹15,000",
    featured: false,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    publishedAt: "2026-03-20",
    content: `
      <h2>Rock-Solid Hosting Infrastructure & DevOps</h2>
      <p>Is your web app crashing during high traffic spikes? Are your AWS bills shockingly high for no apparent reason? Are your developers terrified of deploying updates on a Friday? We clean up messy legacy infrastructure, eliminate technical debt, and migrate you to robust, private server setups.</p>
      
      <h3>Our Deep DevOps Specializations:</h3>
      <ul>
        <li><strong>VPS Setups & Docker Containerization:</strong> We neatly containerize your applications ensuring they run perfectly anywhere—be it on a developer's laptop or a production server. This avoids heavy vendor lock-in and drastically speeds up onboarding new devs.</li>
        <li><strong>Cloud Optimization Deployments:</strong> Expert configuration and handling of AWS, DigitalOcean, Linux VPS environments, and high-performance Coolify. We tune architecture to balance blistering speed with extreme cost efficiency.</li>
        <li><strong>CI/CD Pipelines:</strong> Continuous Integration and Continuous Deployment. We setup automated testing and deployment pipelines via GitHub actions, so your dev team can push updates seamlessly live to users with zero downtime.</li>
        <li><strong>Disaster Recovery:</strong> Because hardware fails, we configure automated, encrypted nightly off-site backups with rapid restoration protocols.</li>
      </ul>
    `
  },
  {
    _id: "seed-service-7",
    title: "Cybersecurity & Maintenance",
    slug: "cybersecurity-and-maintenance",
    summary:
      "Intensive security audits, bug fixing, penetration testing, and ongoing retained tech support.",
    category: "Security",
    tags: ["Audits", "Bug Fixing", "Retainers"],
    icon: "ShieldCheck",
    outcomes: ["Protection against data leaks", "Eliminated tech debt", "Total peace of mind", "Compliance ready"],
    process: ["Penetration Testing", "Vulnerability Patching", "Code Refactoring", "Retainer Support", "24/7 Alerts"],
    ctaLabel: "Secure your systems",
    ctaHref: "/contact",
    priceFrom: "₹12,000/mo",
    featured: false,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
    publishedAt: "2026-03-25",
    content: `
      <h2>Protecting Your Mission-Critical Digital Assets</h2>
      <p>Launching the code is only step one. Software decays over time, dependency packages become outdated, and malicious hackers constantly discover new loopholes. Leaving enterprise software unmaintained is a massive legal and operational liability. We provide continuous security analysis and active maintenance retainers to keep your systems bulletproof.</p>
      
      <h3>Comprehensive Maintenance Protocols:</h3>
      <ul>
        <li><strong>Security Audits & Pen Testing:</strong> We aggressively, ethically hack and test your application endpoints and APIs to find database injection vulnerabilities before malicious actors do.</li>
        <li><strong>Deep Code Refactoring & Bug Fixing:</strong> Rapid turnaround times on critical failure points. We rewrite "spaghetti code" into highly readable, manageable architecture.</li>
        <li><strong>Ongoing Tech Retainers:</strong> Treat us like your elite, on-call CTO. We handle routine framework upgrades, intense 24/7 server monitoring, and emergency patching for a flat, predictable monthly rate.</li>
        <li><strong>Data Compliance:</strong> Ensuring your user data handlers are fully compliant with modern data protection regulations to avoid catastrophic legal issues.</li>
      </ul>
      
      <p>An attack is inevitable. The difference between a minor blip and a company-ending disaster is preparation and retained engineering support.</p>
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
