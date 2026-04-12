// Authenticated seed script — logs in via admin API then posts services.
// Run: node scripts/seed-services-auth.mjs

const BASE = "http://localhost:3000";

// 1. First login to get session cookie
async function getSession() {
  const res = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      email: "admin@touchpointe.com",
      password: "TouchpointeAdmin@2026",
      csrfToken: "",
      callbackUrl: BASE,
      json: "true"
    }),
    redirect: "manual"
  });

  const cookies = res.headers.get("set-cookie") || "";
  return cookies;
}

// 2. Get CSRF token first (required by NextAuth)
async function getCsrfToken() {
  const res = await fetch(`${BASE}/api/auth/csrf`);
  const data = await res.json();
  const cookies = res.headers.get("set-cookie") || "";
  return { csrfToken: data.csrfToken, cookies };
}

const now = new Date().toISOString().slice(0, 10);

const services = [
  {
    title: "UI / UX Design",
    slug: "ui-ux-design",
    category: "Design",
    summary: "Transforming website visitors into loyal customers through intuitive, user-centered digital experiences.",
    tags: "design, ux, ui, wireframing, prototyping",
    status: "published",
    featured: "true",
    publishedAt: now,
    seoTitle: "UI / UX Design Services | Touchpointe Digital",
    seoDescription: "Expert UI/UX design services that blend creativity and user research to craft compelling digital interfaces.",
    content: `<h2>Crafting Experiences That Convert</h2><p>Our UI/UX process is comprehensive, collaborative, and user-centered at every stage.</p><h3>What We Deliver</h3><ul><li><strong>Web and Mobile UI/UX Design</strong> — Responsive interfaces across all screen sizes.</li><li><strong>App and Website Redesign</strong> — Modernize your interface without touching backend logic.</li><li><strong>UI/UX Audit</strong> — Actionable recommendations that improve your conversion rate.</li></ul><h3>Our Process</h3><ol><li>Discovery &amp; Research</li><li>Planning &amp; Strategy</li><li>Wireframing &amp; Conceptualization</li><li>Design Development</li><li>Interactive Prototyping</li><li>User Testing &amp; Feedback</li><li>Launch &amp; Optimization</li></ol>`
  },
  {
    title: "Web Development",
    slug: "web-development",
    category: "Engineering",
    summary: "Building secure, scalable, and high-performance web solutions for businesses of all sizes.",
    tags: "web, react, nextjs, full-stack, ecommerce",
    status: "published",
    featured: "true",
    publishedAt: now,
    seoTitle: "Web Development Services | Touchpointe Digital",
    seoDescription: "Expert web development covering frontend, backend, full-stack, e-commerce, and CMS platforms.",
    content: `<h2>Building the Web of Tomorrow</h2><p>From simple business websites to complex web applications, our team delivers solutions that perform flawlessly and scale with your business.</p><h3>Services</h3><ul><li><strong>Front-End Development</strong> — React, Next.js, Vue.js interfaces that adapt across all devices.</li><li><strong>Back-End Development</strong> — Node.js, Python, and MongoDB for robust server-side performance.</li><li><strong>Full-Stack Development</strong> — End-to-end feature-rich applications.</li><li><strong>E-Commerce Development</strong> — Complete store solutions with secure payment gateways.</li><li><strong>CMS Solutions</strong> — Empower your team to manage content independently.</li></ul><h3>Process</h3><ol><li>Discovery &amp; Planning</li><li>Design &amp; Prototyping</li><li>Agile Development &amp; QA</li><li>Performance Optimization</li><li>Launch &amp; Ongoing Support</li></ol>`
  },
  {
    title: "Cloud Computing",
    slug: "cloud-computing",
    category: "Infrastructure",
    summary: "Scale your business at lightning speed with dynamic cloud services fueling growth and agility.",
    tags: "cloud, aws, azure, devops, infrastructure",
    status: "published",
    featured: "false",
    publishedAt: now,
    seoTitle: "Cloud Computing Solutions | Touchpointe Digital",
    seoDescription: "Comprehensive cloud strategy, migration, architecture, and managed services.",
    content: `<h2>Unlock the Full Power of the Cloud</h2><p>Our cloud experts deliver cutting-edge technologies and strategies that optimize your operations and drive innovation.</p><h3>Services</h3><ul><li><strong>Cloud Strategy &amp; Consulting</strong> — Readiness assessments and roadmap development.</li><li><strong>Cloud Migration</strong> — Minimal-disruption infrastructure and data migration.</li><li><strong>Managed Cloud Services</strong> — 24/7 monitoring, security, and cost optimization.</li><li><strong>Cloud Architecture</strong> — Cloud-native and multi-cloud designs for resilience and scale.</li><li><strong>DevOps &amp; Automation</strong> — CI/CD pipelines and Infrastructure as Code.</li><li><strong>Cost Optimization</strong> — Rightsizing strategies to maximize your cloud ROI.</li><li><strong>Serverless &amp; Microservices</strong> — Modern architectures that dramatically improve scalability.</li></ul>`
  },
  {
    title: "Platform Development",
    slug: "platform-development",
    category: "Engineering",
    summary: "Custom-built platforms engineered for speed, security, scalability, and peak performance.",
    tags: "platform, mobile, saas, app, flutter, react native",
    status: "published",
    featured: "false",
    publishedAt: now,
    seoTitle: "Platform Development Services | Touchpointe Digital",
    seoDescription: "Custom platform and app development with intuitive UIs and robust backend architectures for enterprise scale.",
    content: `<h2>Platforms Built to Exceed Expectations</h2><p>From greenfield SaaS builds to enterprise system enhancements, our developers prioritize intuitive interfaces and robust backends.</p><h3>What We Build</h3><ul><li><strong>Custom SaaS Platforms</strong> — Multi-tenant architectures with subscription billing.</li><li><strong>Mobile Applications</strong> — Native iOS/Android and cross-platform with Flutter &amp; React Native.</li><li><strong>Enterprise Portals</strong> — Internal tools, HR systems, vendor portals at enterprise scale.</li><li><strong>API &amp; Integration Platforms</strong> — RESTful and GraphQL APIs connecting your entire ecosystem.</li><li><strong>Marketplace Platforms</strong> — Two-sided marketplaces with payments and real-time communication.</li></ul><h3>Stack</h3><p>React, Next.js, Flutter, Node.js, Python, PostgreSQL, MongoDB, AWS, GCP, Docker, Kubernetes.</p>`
  },
  {
    title: "Technology Consultancy",
    slug: "technology-consultancy",
    category: "Strategy",
    summary: "Align your IT and business goals for a seamless, impactful, and future-proof technology strategy.",
    tags: "consulting, strategy, digital transformation, roadmap, cto",
    status: "published",
    featured: "false",
    publishedAt: now,
    seoTitle: "Technology Strategy & Consulting | Touchpointe Digital",
    seoDescription: "Expert technology consulting — digital transformation, roadmap planning, and technology selection aligned to business outcomes.",
    content: `<h2>Strategic Technology Guidance</h2><p>We combine strategic thinking with deep technical expertise to deliver actionable guidance that bridges the gap between your IT capabilities and business goals.</p><h3>Services</h3><ul><li><strong>Digital Transformation Strategy</strong> — Move legacy operations to modern digital workflows.</li><li><strong>Technology Roadmap Planning</strong> — Multi-year plans aligned to business priorities.</li><li><strong>Architecture Reviews</strong> — Modernization recommendations for existing systems.</li><li><strong>Software Selection</strong> — Objective vendor evaluation tailored to your needs.</li><li><strong>CTO-as-a-Service</strong> — Fractional CTO leadership for startups and scaleups.</li><li><strong>Security &amp; Compliance Audits</strong> — Identify and remediate vulnerabilities proactively.</li></ul><h3>Industries</h3><p>Fintech, Healthtech, EdTech, Retail, Logistics, Real Estate, SaaS, Manufacturing.</p>`
  },
  {
    title: "Product Development",
    slug: "product-development",
    category: "Engineering",
    summary: "End-to-end product development from concept validation through engineering, QA, and market launch.",
    tags: "product, mvp, startup, development, launch",
    status: "published",
    featured: "true",
    publishedAt: now,
    seoTitle: "Product Development Services | Touchpointe Digital",
    seoDescription: "Full-cycle product development — idea validation, UX design, engineering, QA, and market launch.",
    content: `<h2>From Idea to Market-Ready Product</h2><p>We handle every aspect of the product development lifecycle — from validating your initial concept to shipping a product users love.</p><h3>Services</h3><ul><li><strong>Concept Validation</strong> — 3-week design sprints to validate product-market fit.</li><li><strong>UX Research &amp; Design</strong> — Deep user research and high-fidelity prototype creation.</li><li><strong>MVP Development</strong> — Get to market fast with core features validated.</li><li><strong>Full Product Engineering</strong> — Frontend, backend, mobile, and API development.</li><li><strong>Quality Assurance</strong> — Comprehensive testing across functional, performance, and security.</li><li><strong>Market Launch</strong> — App store submissions, production deployment, and stabilization.</li><li><strong>Growth Engineering</strong> — Data-driven feature iteration post-launch.</li></ul>`
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    category: "Marketing",
    summary: "Accelerate business growth with data-driven digital marketing that dominates the digital landscape.",
    tags: "marketing, seo, ppc, social media, analytics, content",
    status: "published",
    featured: "false",
    publishedAt: now,
    seoTitle: "Digital Marketing Services | Touchpointe Digital",
    seoDescription: "Comprehensive data-driven digital marketing — SEO, PPC, social media, content marketing, and conversion optimization.",
    content: `<h2>Dominate Your Digital Landscape</h2><p>From targeted traffic acquisition to lead capture and conversion optimization, we deliver measurable growth across all digital channels.</p><h3>Services</h3><ul><li><strong>SEO</strong> — Technical SEO, link building, and content strategy for organic dominance.</li><li><strong>PPC Advertising</strong> — Google Ads and Meta Ads engineered for maximum ROAS.</li><li><strong>Social Media Marketing</strong> — Strategic campaigns across LinkedIn, Instagram, and X.</li><li><strong>Content Marketing</strong> — Long-form content and thought leadership that builds authority.</li><li><strong>Email Automation</strong> — Drip campaigns that convert leads at scale.</li><li><strong>Conversion Rate Optimization</strong> — A/B testing and UX improvements for existing traffic.</li><li><strong>Analytics &amp; Reporting</strong> — Dashboards connecting marketing activity to revenue.</li></ul>`
  },
  {
    title: "Quality Assurance",
    slug: "quality-assurance",
    category: "Engineering",
    summary: "Ensuring software reliability through comprehensive testing and validation at every development stage.",
    tags: "qa, testing, automation, performance, security, accessibility",
    status: "published",
    featured: "false",
    publishedAt: now,
    seoTitle: "Quality Assurance & Software Testing | Touchpointe Digital",
    seoDescription: "Comprehensive QA — functional, performance, security, and test automation to ship bug-free software consistently.",
    content: `<h2>Quality Built Into Every Layer</h2><p>We integrate quality assurance throughout the entire development lifecycle — catching issues early when they are least expensive to fix.</p><h3>QA Services</h3><ul><li><strong>Functional Testing</strong> — End-to-end feature testing against defined requirements.</li><li><strong>Automated Testing</strong> — Scalable automation using Selenium, Playwright, Cypress, and Jest.</li><li><strong>Performance Testing</strong> — Load and stress testing for peak traffic scenarios.</li><li><strong>Security Testing</strong> — Vulnerability assessments and OWASP compliance checks.</li><li><strong>Mobile Testing</strong> — Cross-device and cross-OS coverage for iOS and Android.</li><li><strong>API Testing</strong> — Endpoint validation for correctness, reliability, and security.</li><li><strong>Accessibility Testing</strong> — WCAG 2.1 compliance for all users.</li></ul>`
  },
  {
    title: "AI & Machine Learning",
    slug: "ai-machine-learning",
    category: "Intelligence",
    summary: "Empowering businesses with intelligent automation and data-driven insights through cutting-edge AI and ML.",
    tags: "ai, machine learning, nlp, computer vision, llm, generative ai",
    status: "published",
    featured: "true",
    publishedAt: now,
    seoTitle: "AI & Machine Learning Development | Touchpointe Digital",
    seoDescription: "Custom AI and ML solutions — strategy, data engineering, model development, NLP, computer vision, and generative AI.",
    content: `<h2>Intelligent Systems for the Modern Enterprise</h2><p>From strategy and data engineering to model deployment and ongoing optimization, we deliver AI solutions that create lasting competitive advantage.</p><h3>Services</h3><ul><li><strong>AI Strategy &amp; Consulting</strong> — Readiness assessments and implementation roadmaps.</li><li><strong>Data Engineering</strong> — Pipelines and preprocessing that make your data ML-ready.</li><li><strong>Custom ML Models</strong> — Bespoke predictive and prescriptive models for your business.</li><li><strong>Natural Language Processing</strong> — Sentiment analysis, document intelligence, conversational AI.</li><li><strong>Computer Vision</strong> — Image recognition, object detection, video analytics.</li><li><strong>Generative AI</strong> — LLM integrations, RAG pipelines, and custom GenAI products.</li><li><strong>Predictive Analytics</strong> — Demand forecasting, churn prediction, operational optimization.</li><li><strong>MLOps</strong> — Full model lifecycle — training, deployment, monitoring, and retraining.</li></ul><h3>Stack</h3><p>Python, TensorFlow, PyTorch, Hugging Face, LangChain, OpenAI, MLflow, Apache Spark, Databricks.</p>`
  }
];

async function run() {
  console.log("\n🔐 Getting CSRF token...");
  const { csrfToken, cookies: csrfCookies } = await getCsrfToken();
  console.log(`   CSRF token: ${csrfToken?.slice(0, 16)}...`);

  console.log("🔐 Logging in as admin...");
  const loginRes = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: csrfCookies
    },
    body: new URLSearchParams({
      email: "admin@touchpointe.com",
      password: "TouchpointeAdmin@2026",
      csrfToken,
      callbackUrl: `${BASE}/admin`,
      json: "true"
    }),
    redirect: "manual"
  });

  const allCookies = [csrfCookies, loginRes.headers.get("set-cookie") || ""].join("; ");
  console.log(`   Login status: ${loginRes.status}`);
  console.log(`\n🚀 Seeding ${services.length} services...\n`);

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const service of services) {
    const res = await fetch(`${BASE}/api/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: allCookies
      },
      body: JSON.stringify(service)
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      console.log(`✅ Created: ${service.title}`);
      created++;
    } else if (data.error?.toLowerCase().includes("duplicate") || res.status === 409) {
      console.log(`⚠️  Already exists: ${service.title}`);
      skipped++;
    } else {
      console.error(`❌ Failed (${res.status}): ${service.title} — ${data.error || "Unknown"}`);
      failed++;
    }
  }

  console.log(`\n✨ Done! Created: ${created} | Skipped: ${skipped} | Failed: ${failed}`);
  if (created > 0) {
    console.log("   → Visit http://localhost:3000/services to see them live!\n");
  }
}

run().catch(console.error);
