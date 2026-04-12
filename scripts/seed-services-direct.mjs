// Direct MongoDB seed — bypasses API auth.
// Run: node scripts/seed-services-direct.mjs

import { MongoClient } from "mongodb";

const MONGO_URI = "mongodb://root:PPNF1ExSZUzYCUAekhjyZEj0o81mPTzJrHx5Ne4noLD5ZCY64YyQf0fyk8EK99NY@103.108.220.202:5434/?authSource=admin&directConnection=true";
const DB_NAME = "touchpointe";

const now = new Date();

const services = [
  {
    title: "UI / UX Design",
    slug: "ui-ux-design",
    category: "Design",
    summary: "Transforming website visitors into loyal customers through intuitive, user-centered digital experiences.",
    tags: ["design", "ux", "ui", "wireframing", "prototyping"],
    status: "published",
    featured: true,
    publishedAt: now,
    seoTitle: "UI / UX Design Services | Touchpointe Digital",
    seoDescription: "Expert UI/UX design services that blend creativity and user research to craft compelling digital interfaces.",
    content: `<h2>Crafting Experiences That Convert</h2>
<p>At Touchpointe, we follow a well-defined and comprehensive UI/UX design process to deliver exceptional digital experiences that align with your brand and captivate your audience.</p>
<h3>What We Deliver</h3>
<ul>
  <li><strong>Web and Mobile UI/UX Design</strong> — Responsive design and user-friendly interfaces that maximize satisfaction across every screen size.</li>
  <li><strong>App and Website Redesign</strong> — Profoundly change the design and interface for outdated projects while leaving backend logic unaltered.</li>
  <li><strong>UI/UX Audit</strong> — A thorough design audit with actionable recommendations to improve your conversion rate.</li>
</ul>
<h3>Our Process</h3>
<ol>
  <li><strong>Discovery &amp; Research</strong> — User research, interviews, and competitive analysis.</li>
  <li><strong>Planning &amp; Strategy</strong> — User personas, journeys, and information architecture.</li>
  <li><strong>Conceptualization</strong> — Low-fidelity wireframes and ideation aligned with your brand.</li>
  <li><strong>Design Development</strong> — Pixel-perfect UI with consistent typography, color, and iconography.</li>
  <li><strong>Interactive Prototyping</strong> — Test and refine user flows before development begins.</li>
  <li><strong>User Testing</strong> — Real usability testing with actionable feedback loops.</li>
  <li><strong>Launch &amp; Optimization</strong> — Post-launch monitoring and data-driven improvements.</li>
</ol>
<h3>Why Touchpointe for UI/UX?</h3>
<ul>
  <li><strong>User-Centered Approach</strong> — Every decision is rooted in user research and validated behavior data.</li>
  <li><strong>Business Impact Focus</strong> — Our UI/UX drives conversions and measurable engagement metrics.</li>
  <li><strong>Customized Solutions</strong> — Tailored to your specific objectives and brand identity.</li>
</ul>`,
    createdAt: now,
    updatedAt: now
  },
  {
    title: "Web Development",
    slug: "web-development",
    category: "Engineering",
    summary: "Building secure, scalable, and high-performance web solutions for businesses of all sizes.",
    tags: ["web", "react", "nextjs", "full-stack", "ecommerce"],
    status: "published",
    featured: true,
    publishedAt: now,
    seoTitle: "Web Development Services | Touchpointe Digital",
    seoDescription: "Expert web development covering frontend, backend, full-stack, e-commerce, and CMS platforms. Responsive, performant, and built to scale.",
    content: `<h2>Building the Web of Tomorrow</h2>
<p>Our expert team crafts stunning, functional websites that help businesses thrive in the digital landscape. With a focus on user-centric design and seamless functionality, we bring your vision to life.</p>
<h3>Services</h3>
<ul>
  <li><strong>Front-End Development</strong> — Responsive interfaces using HTML5, CSS3, React, and Next.js.</li>
  <li><strong>Back-End Development</strong> — Scalable server-side solutions with Node.js, Python, and MongoDB.</li>
  <li><strong>Full-Stack Development</strong> — End-to-end feature-rich applications from a single cohesive team.</li>
  <li><strong>E-Commerce Development</strong> — Complete online stores with secure payment gateways and optimized checkout flows.</li>
  <li><strong>Content Management Systems</strong> — Custom CMS solutions so your team can manage content independently.</li>
</ul>
<h3>Development Process</h3>
<ol>
  <li><strong>Discovery &amp; Planning</strong> — Define scope, features, and technical architecture.</li>
  <li><strong>Design &amp; Prototyping</strong> — Wireframes to visualize the user journey before a single line is written.</li>
  <li><strong>Agile Development</strong> — Sprint-based builds with continuous QA integration.</li>
  <li><strong>Optimization</strong> — Performance tuning and cross-browser compatibility verification.</li>
  <li><strong>Launch &amp; Support</strong> — Seamless deployment with ongoing maintenance and security patches.</li>
</ol>
<h3>Why Choose Us</h3>
<ul>
  <li><strong>Responsive Design</strong> — Pixel-perfect across all devices and screen sizes.</li>
  <li><strong>Scalability</strong> — Built to handle rapid growth without performance trade-offs.</li>
  <li><strong>Cutting-Edge Technology</strong> — We keep you consistently ahead of the technology curve.</li>
</ul>`,
    createdAt: now,
    updatedAt: now
  },
  {
    title: "Cloud Computing",
    slug: "cloud-computing",
    category: "Infrastructure",
    summary: "Scale your business at lightning speed with dynamic cloud services that fuel growth and agility.",
    tags: ["cloud", "aws", "azure", "devops", "infrastructure", "migration"],
    status: "published",
    featured: false,
    publishedAt: now,
    seoTitle: "Cloud Computing Solutions | Touchpointe Digital",
    seoDescription: "Comprehensive cloud strategy, migration, architecture, and managed services. We make cloud adoption seamless and cost-effective.",
    content: `<h2>Unlock the Full Power of the Cloud</h2>
<p>Touchpointe delivers comprehensive cloud computing services designed to empower businesses with scalable, flexible, and efficient solutions tailored to your specific workloads and growth trajectory.</p>
<h3>Cloud Services</h3>
<ul>
  <li><strong>Cloud Strategy &amp; Consulting</strong> — Readiness assessments, roadmap development, and vendor selection.</li>
  <li><strong>Cloud Migration</strong> — Seamless infrastructure, application, and data migration with minimal disruption.</li>
  <li><strong>Managed Cloud Services</strong> — 24/7 monitoring, security compliance, and automated cost optimization.</li>
  <li><strong>Cloud Architecture &amp; Design</strong> — Cloud-native and multi-cloud architectures for resilience and scale.</li>
  <li><strong>DevOps &amp; Automation</strong> — CI/CD pipelines, Infrastructure as Code, and automated deployment workflows.</li>
  <li><strong>Cloud Cost Optimization</strong> — Usage analysis and rightsizing strategies to maximize ROI.</li>
  <li><strong>Serverless &amp; Microservices</strong> — Modern architectures that reduce overhead and dramatically improve scalability.</li>
  <li><strong>Big Data &amp; Analytics</strong> — Cloud-powered data warehousing, processing pipelines, and ML integrations.</li>
</ul>
<h3>Our Cloud Process</h3>
<ol>
  <li>Assessment &amp; Planning</li>
  <li>Architecture Design</li>
  <li>Migration or Development</li>
  <li>Security &amp; Compliance Implementation</li>
  <li>Performance Optimization</li>
  <li>DevOps Automation</li>
  <li>24/7 Monitoring &amp; Support</li>
</ol>`,
    createdAt: now,
    updatedAt: now
  },
  {
    title: "Platform Development",
    slug: "platform-development",
    category: "Engineering",
    summary: "Custom-built platforms engineered for speed, security, scalability, and peak operational performance.",
    tags: ["platform", "mobile", "app", "saas", "native", "flutter"],
    status: "published",
    featured: false,
    publishedAt: now,
    seoTitle: "Platform Development Services | Touchpointe Digital",
    seoDescription: "Custom platform and application development with intuitive UIs, seamless navigation, and robust backend architectures built for enterprise scale.",
    content: `<h2>Platforms Built to Exceed Expectations</h2>
<p>From greenfield SaaS builds to enhancing existing enterprise systems, our skilled developers prioritize intuitive user interfaces, seamless navigation, and backend architectures designed to handle the most demanding workloads.</p>
<h3>What We Build</h3>
<ul>
  <li><strong>Custom SaaS Platforms</strong> — Multi-tenant architectures with subscription billing and rapid iteration pipelines.</li>
  <li><strong>Mobile Applications</strong> — Native iOS and Android apps, and cross-platform solutions using Flutter and React Native.</li>
  <li><strong>Enterprise Portals</strong> — Internal tools, HR systems, vendor portals, and customer dashboards at scale.</li>
  <li><strong>API &amp; Integration Platforms</strong> — RESTful and GraphQL APIs that connect your entire technology ecosystem.</li>
  <li><strong>Marketplace Platforms</strong> — Two-sided marketplaces with payments, ratings, and real-time messaging.</li>
</ul>
<h3>Technology Stack</h3>
<ul>
  <li><strong>Frontend</strong> — React, Next.js, Vue.js, Angular</li>
  <li><strong>Mobile</strong> — Flutter, React Native, Swift, Kotlin</li>
  <li><strong>Backend</strong> — Node.js, Python, Java Spring, Go</li>
  <li><strong>Database</strong> — PostgreSQL, MongoDB, Redis, Elasticsearch</li>
  <li><strong>Infrastructure</strong> — AWS, GCP, Azure, Docker, Kubernetes</li>
</ul>`,
    createdAt: now,
    updatedAt: now
  },
  {
    title: "Technology Consultancy",
    slug: "technology-consultancy",
    category: "Strategy",
    summary: "Align your IT and business goals for a seamless, impactful, and future-proof technology strategy.",
    tags: ["consulting", "strategy", "digital transformation", "roadmap", "cto"],
    status: "published",
    featured: false,
    publishedAt: now,
    seoTitle: "Technology Strategy & Consulting | Touchpointe Digital",
    seoDescription: "Expert technology consulting to align IT strategy with business goals — digital transformation, roadmap planning, and honest technology selection.",
    content: `<h2>Strategic Technology Guidance</h2>
<p>Whether you need digital transformation guidance, technology roadmap planning, or honest software vendor selection, our consultancy services are designed to address your specific challenges with clarity and strategic depth.</p>
<h3>Consultancy Services</h3>
<ul>
  <li><strong>Digital Transformation Strategy</strong> — Move legacy operations to modern, efficient digital workflows.</li>
  <li><strong>Technology Roadmap Planning</strong> — Structured multi-year plans that align engineering priorities with business outcomes.</li>
  <li><strong>Architecture Reviews</strong> — Evaluation of existing systems with actionable modernization recommendations.</li>
  <li><strong>Software Selection &amp; Vendor Assessment</strong> — Objective evaluation of technology platforms tailored to your needs.</li>
  <li><strong>CTO-as-a-Service</strong> — Fractional CTO engagement for startups that need senior technical leadership.</li>
  <li><strong>Security &amp; Compliance Audits</strong> — Identify vulnerabilities before they become costly incidents.</li>
</ul>
<h3>Consulting Methodology</h3>
<ol>
  <li><strong>Discovery</strong> — Deep-dive workshops to understand business context and technical debt.</li>
  <li><strong>Assessment</strong> — Analysis of systems, processes, and organizational capability gaps.</li>
  <li><strong>Recommendations</strong> — A prioritized roadmap with ROI projections and risk assessments.</li>
  <li><strong>Implementation Support</strong> — Hands-on guidance ensuring recommendations translate into results.</li>
  <li><strong>Quarterly Reviews</strong> — Continuous roadmap adaptation as your business evolves.</li>
</ol>`,
    createdAt: now,
    updatedAt: now
  },
  {
    title: "Product Development",
    slug: "product-development",
    category: "Engineering",
    summary: "End-to-end product development from concept validation through design, engineering, QA, and market launch.",
    tags: ["product", "mvp", "startup", "development", "launch", "validation"],
    status: "published",
    featured: true,
    publishedAt: now,
    seoTitle: "Product Development Services | Touchpointe Digital",
    seoDescription: "Full-cycle product development — idea validation, UX design, engineering, QA, and market launch. We build products that users love and businesses scale.",
    content: `<h2>From Idea to Market-Ready Product</h2>
<p>We handle every aspect of the product development lifecycle — from validating your initial concept to designing, engineering, testing, and launching a product that users love and businesses scale on.</p>
<h3>Our Product Services</h3>
<ul>
  <li><strong>Concept Validation</strong> — 3-week design sprints to determine product-market fit before committing significant resources.</li>
  <li><strong>UX Research &amp; Design</strong> — Deep user research, persona development, and high-fidelity prototype creation.</li>
  <li><strong>MVP Development</strong> — Lean builds that get you to market fast with core features validated.</li>
  <li><strong>Full Product Engineering</strong> — Complete frontend, backend, mobile, and API development.</li>
  <li><strong>Quality Assurance</strong> — Functional, performance, security, and accessibility testing coverage.</li>
  <li><strong>Market Launch</strong> — App store submissions, production deployment, and post-launch stabilization.</li>
  <li><strong>Growth Engineering</strong> — Feature iteration cycles driven by user analytics post-launch.</li>
</ul>
<h3>Development Process</h3>
<ol>
  <li>Discover &amp; Define</li>
  <li>Design Sprint &amp; Validation</li>
  <li>Agile Engineering Build</li>
  <li>Test &amp; Iterate</li>
  <li>Launch &amp; Scale</li>
</ol>`,
    createdAt: now,
    updatedAt: now
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    category: "Marketing",
    summary: "Accelerate business growth with data-driven digital marketing that dominates the digital landscape.",
    tags: ["marketing", "seo", "social media", "ppc", "analytics", "content"],
    status: "published",
    featured: false,
    publishedAt: now,
    seoTitle: "Digital Marketing Services | Touchpointe Digital",
    seoDescription: "Comprehensive data-driven digital marketing — SEO, PPC, social media, content marketing, and conversion optimization to maximize digital ROI.",
    content: `<h2>Dominate Your Digital Landscape</h2>
<p>Maximize your digital presence and outpace competition with our comprehensive suite of data-driven digital marketing services. From targeted traffic acquisition to lead capture and conversion optimization, we deliver measurable growth.</p>
<h3>Marketing Services</h3>
<ul>
  <li><strong>Search Engine Optimization (SEO)</strong> — Technical SEO, on-page optimization, link building, and content strategy for organic dominance.</li>
  <li><strong>Pay-Per-Click Advertising (PPC)</strong> — Precision-targeted Google Ads and Meta Ads campaigns engineered for maximum ROAS.</li>
  <li><strong>Social Media Marketing</strong> — Strategic content creation and paid social campaigns across LinkedIn, Instagram, and X.</li>
  <li><strong>Content Marketing</strong> — Long-form content, thought leadership, case studies, and video that builds lasting brand authority.</li>
  <li><strong>Email Marketing &amp; Automation</strong> — Drip sequences and nurture campaigns that convert leads at scale.</li>
  <li><strong>Conversion Rate Optimization (CRO)</strong> — A/B testing and UX improvements to maximize value from existing traffic.</li>
  <li><strong>Analytics &amp; Reporting</strong> — Comprehensive dashboards connecting marketing activity directly to revenue outcomes.</li>
</ul>
<h3>Our Approach</h3>
<ol>
  <li>Full-funnel audit and competitive landscape analysis</li>
  <li>KPI definition aligned with business revenue targets</li>
  <li>Multi-channel campaign launch with coordinated creative</li>
  <li>Real-time optimization based on performance signals</li>
  <li>Monthly strategic reviews with forward-looking adjustments</li>
</ol>`,
    createdAt: now,
    updatedAt: now
  },
  {
    title: "Quality Assurance",
    slug: "quality-assurance",
    category: "Engineering",
    summary: "Ensuring software reliability and performance through comprehensive testing and validation at every development stage.",
    tags: ["qa", "testing", "automation", "performance", "security", "accessibility"],
    status: "published",
    featured: false,
    publishedAt: now,
    seoTitle: "Quality Assurance & Software Testing | Touchpointe Digital",
    seoDescription: "Comprehensive QA services — functional, performance, security, and test automation to ship bug-free, high-quality software consistently.",
    content: `<h2>Quality Built Into Every Layer</h2>
<p>Our dedicated QA team rigorously tests and validates each aspect of your software to deliver bug-free, high-quality results. We integrate quality assurance throughout the entire development lifecycle — catching issues early when they are cheapest to fix.</p>
<h3>QA Services</h3>
<ul>
  <li><strong>Functional Testing</strong> — End-to-end testing of all application features against defined business requirements.</li>
  <li><strong>Automated Testing</strong> — Scalable automation frameworks using Selenium, Playwright, Cypress, and Jest.</li>
  <li><strong>Performance Testing</strong> — Load and stress testing to validate behavior under peak traffic conditions.</li>
  <li><strong>Security Testing</strong> — Vulnerability assessments, penetration testing, and OWASP compliance checks.</li>
  <li><strong>Mobile Testing</strong> — Cross-device and cross-OS testing for iOS and Android applications.</li>
  <li><strong>API Testing</strong> — Validation of all API endpoints for correctness, reliability, and security.</li>
  <li><strong>Accessibility Testing</strong> — WCAG 2.1 compliance testing ensuring inclusivity for all users.</li>
  <li><strong>UAT Support</strong> — Structured User Acceptance Testing coordination with stakeholders.</li>
</ul>
<h3>QA Process</h3>
<ol>
  <li>Test Planning &amp; Strategy</li>
  <li>Test Case Design &amp; Review</li>
  <li>Execution — Manual &amp; Automated</li>
  <li>Defect Management &amp; Resolution</li>
  <li>Release Readiness Reporting</li>
</ol>`,
    createdAt: now,
    updatedAt: now
  },
  {
    title: "AI & Machine Learning",
    slug: "ai-machine-learning",
    category: "Intelligence",
    summary: "Empowering businesses with intelligent automation and data-driven insights through cutting-edge AI and ML solutions.",
    tags: ["ai", "machine learning", "nlp", "computer vision", "llm", "generative ai", "automation"],
    status: "published",
    featured: true,
    publishedAt: now,
    seoTitle: "AI & Machine Learning Development | Touchpointe Digital",
    seoDescription: "Custom AI and ML solutions — strategy, data engineering, model development, NLP, computer vision, generative AI, and MLOps.",
    content: `<h2>Intelligent Systems for the Modern Enterprise</h2>
<p>Touchpointe delivers cutting-edge AI and Machine Learning services that transform business operations and drive competitive advantage across every vertical. From strategy and data engineering to model deployment and ongoing optimization.</p>
<h3>AI &amp; ML Services</h3>
<ul>
  <li><strong>AI Strategy &amp; Consulting</strong> — AI readiness assessments and strategic roadmaps identifying the highest-value use cases.</li>
  <li><strong>Data Engineering</strong> — Data pipelines, preprocessing, and feature engineering that make your data ML-ready.</li>
  <li><strong>Custom Machine Learning Models</strong> — Bespoke models built for your specific business challenges.</li>
  <li><strong>Natural Language Processing (NLP)</strong> — Sentiment analysis, document intelligence, and conversational AI.</li>
  <li><strong>Computer Vision</strong> — Image recognition, object detection, video analytics, and visual inspection systems.</li>
  <li><strong>Generative AI Solutions</strong> — LLM integrations, RAG pipelines, and custom generative AI products.</li>
  <li><strong>Predictive Analytics</strong> — Demand forecasting, churn prediction, and operational optimization models.</li>
  <li><strong>MLOps &amp; Model Management</strong> — End-to-end model lifecycle — training, deployment, monitoring, and retraining.</li>
</ul>
<h3>Technology Stack</h3>
<ul>
  <li><strong>Languages</strong> — Python, R, Julia, Scala</li>
  <li><strong>Frameworks</strong> — TensorFlow, PyTorch, scikit-learn, XGBoost</li>
  <li><strong>NLP &amp; GenAI</strong> — Hugging Face, LangChain, OpenAI, spaCy</li>
  <li><strong>MLOps</strong> — MLflow, Kubeflow, SageMaker, Weights &amp; Biases</li>
  <li><strong>Data</strong> — Apache Spark, Databricks, dbt, Airflow</li>
</ul>
<h3>Business Outcomes</h3>
<ul>
  <li>Automate repetitive processes to free human capacity for high-value work.</li>
  <li>Gain real-time predictive insights that accelerate decision-making velocity.</li>
  <li>Personalize customer experiences at a scale impossible with manual approaches.</li>
  <li>Detect fraud, anomalies, and risk in real-time across operational data streams.</li>
</ul>`,
    createdAt: now,
    updatedAt: now
  }
];

async function run() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");
    const db = client.db(DB_NAME);
    const collection = db.collection("services");

    let created = 0;
    let skipped = 0;

    for (const service of services) {
      const existing = await collection.findOne({ slug: service.slug });
      if (existing) {
        console.log(`⚠️  Skipped (already exists): ${service.title}`);
        skipped++;
        continue;
      }
      await collection.insertOne(service);
      console.log(`✅ Created: ${service.title}`);
      created++;
    }

    console.log(`\n✨ Done! Created: ${created}, Skipped: ${skipped}`);
    console.log("   Visit http://localhost:3000/services to see them live.\n");
  } finally {
    await client.close();
  }
}

run().catch(console.error);
