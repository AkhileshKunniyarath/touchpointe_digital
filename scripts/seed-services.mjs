// Seed script: run with `node scripts/seed-services.mjs`
// Make sure `npm run dev` is running on port 3000 first.

const BASE = "http://localhost:3000";

const services = [
  {
    title: "UI / UX Design",
    slug: "ui-ux-design",
    category: "Design",
    summary: "Transforming website visitors into loyal customers through intuitive, user-centered digital experiences.",
    tags: "design, ux, ui, wireframing, prototyping",
    status: "published",
    featured: "true",
    publishedAt: new Date().toISOString().slice(0, 10),
    seoTitle: "UI / UX Design Services | Touchpointe Digital",
    seoDescription: "Expert UI/UX design services that blend creativity and user research to craft compelling digital interfaces. From wireframes to final handoff.",
    content: `<h2>Crafting Experiences That Convert</h2>
<p>At Touchpointe, we follow a well-defined and comprehensive UI/UX design process to deliver exceptional digital experiences that align with your brand and captivate your audience. Our process is designed to ensure collaboration, creativity, and user-centered design from day one.</p>

<h3>What We Deliver</h3>
<ul>
  <li><strong>Web and Mobile UI/UX Design</strong> — Responsive web design, adaptive mobile design, and user-friendly interfaces that maximize user satisfaction across every screen size.</li>
  <li><strong>App and Website Redesign</strong> — Profoundly change the design and interface for your outdated projects while leaving backend logic completely unaltered.</li>
  <li><strong>UI/UX Audit</strong> — A thorough design audit with actionable recommendations so you know exactly what changes will improve your conversion rate.</li>
</ul>

<h3>Our Process</h3>
<ol>
  <li><strong>Discovery & Research</strong> — We begin by deeply understanding your goals, target audience, and project requirements. We conduct user research, interviews, and competitive analysis.</li>
  <li><strong>Planning & Strategy</strong> — Define project objectives and deliverables. Create user personas, user journeys, and information architecture.</li>
  <li><strong>Conceptualization & Ideation</strong> — Brainstorm creative ideas aligned with your brand identity. Develop low-fidelity wireframes.</li>
  <li><strong>Design Development</strong> — Craft pixel-perfect UI designs with consistent typography, color schemes, icons, and graphics.</li>
  <li><strong>Interactive Prototyping</strong> — Translate wireframes into interactive prototypes to demonstrate user flows and interactions.</li>
  <li><strong>User Testing</strong> — Conduct usability testing with real users. Incorporate feedback to make informed design refinements.</li>
  <li><strong>Iterative Refinement</strong> — Iterate based on testing results, stakeholder feedback, and design best practices.</li>
  <li><strong>Development Collaboration</strong> — Work closely with your development team. Provide detailed design specifications and assets.</li>
  <li><strong>Launch & Post-Launch Optimization</strong> — Monitor user interactions and gather analytics to continuously improve the UI/UX.</li>
</ol>

<h3>Why Touchpointe for UI/UX?</h3>
<ul>
  <li><strong>Expertise &amp; Experience</strong> — Seasoned designers with extensive cross-industry experience.</li>
  <li><strong>User-Centered Approach</strong> — Every design decision is rooted in user research and validated behavior data.</li>
  <li><strong>Business Impact Focus</strong> — Our UI/UX isn't just about aesthetics; it directly drives conversions and engagement metrics.</li>
  <li><strong>Customized Solutions</strong> — Every engagement is tailored to your specific objectives and brand guidelines.</li>
</ul>`
  },
  {
    title: "Web Development",
    slug: "web-development",
    category: "Engineering",
    summary: "Building secure, scalable, and high-performance web solutions for businesses of all sizes.",
    tags: "web, react, nextjs, full-stack, ecommerce",
    status: "published",
    featured: "true",
    publishedAt: new Date().toISOString().slice(0, 10),
    seoTitle: "Web Development Services | Touchpointe Digital",
    seoDescription: "Expert web development services covering frontend, backend, full-stack, e-commerce, and CMS platforms. Responsive, performant, and scalable.",
    content: `<h2>Building the Web of Tomorrow</h2>
<p>Our expert team of developers is dedicated to crafting stunning and functional websites that help businesses thrive in the digital landscape. With a focus on user-centric design and seamless functionality, we bring your vision to life and create online experiences that leave a lasting impression.</p>

<h3>Our Web Development Services</h3>
<ul>
  <li><strong>Front-End Development</strong> — Creative, responsive interfaces using HTML5, CSS3, and modern JavaScript frameworks that adapt seamlessly across all devices.</li>
  <li><strong>Back-End Development</strong> — Robust server-side solutions using Python, Node.js, PHP, and databases like MySQL and MongoDB for flawless performance at scale.</li>
  <li><strong>Full-Stack Development</strong> — End-to-end solutions that bring together the best of frontend and backend, creating feature-rich applications tailored to your needs.</li>
  <li><strong>E-Commerce Development</strong> — Complete online store solutions — from product catalogs to secure payment gateways — that drive real revenue.</li>
  <li><strong>Content Management Systems (CMS)</strong> — Custom CMS solutions that empower your team to update content effortlessly without touching a line of code.</li>
</ul>

<h3>Our Development Process</h3>
<ol>
  <li><strong>Discovery & Planning</strong> — Understanding business goals, audience, and scope before a single line of code is written.</li>
  <li><strong>Design & Prototyping</strong> — Wireframes and prototypes that visualize the complete user journey.</li>
  <li><strong>Development & Testing</strong> — Agile sprints with rigorous QA at every stage to catch issues early.</li>
  <li><strong>Optimization</strong> — Performance tuning, image optimization, and cross-browser compatibility checks.</li>
  <li><strong>Launch & Deployment</strong> — Seamless go-live with monitoring to catch any unexpected issues.</li>
  <li><strong>Post-Launch Support</strong> — Ongoing maintenance, updates, and security patches to keep your site at peak performance.</li>
</ol>

<h3>Key Advantages</h3>
<ul>
  <li><strong>Strategic Business Growth</strong> — Web solutions designed as tools for measurable revenue growth, not just digital presence.</li>
  <li><strong>Enhanced User Experiences</strong> — Intuitive interfaces that result in higher engagement and extended time-on-site.</li>
  <li><strong>Responsive Design</strong> — Pixel-perfect across desktop, tablet, and mobile.</li>
  <li><strong>Scalability</strong> — Built to handle rapid growth and fluctuating demand without performance trade-offs.</li>
  <li><strong>Cutting-Edge Technology</strong> — From AI-powered features to immersive interfaces, we keep you ahead of the curve.</li>
</ul>`
  },
  {
    title: "Cloud Computing",
    slug: "cloud-computing",
    category: "Infrastructure",
    summary: "Scale your business at lightning speed with our dynamic cloud services, fueling growth and agility.",
    tags: "cloud, aws, azure, devops, infrastructure",
    status: "published",
    featured: "false",
    publishedAt: new Date().toISOString().slice(0, 10),
    seoTitle: "Cloud Computing Solutions | Touchpointe Digital",
    seoDescription: "Comprehensive cloud strategy, migration, architecture, and managed services. We make cloud adoption seamless and cost-effective.",
    content: `<h2>Unlock the Full Power of the Cloud</h2>
<p>Touchpointe offers a comprehensive range of cloud computing services designed to empower businesses with scalable, flexible, and efficient solutions. Our cloud experts deliver cutting-edge technologies and strategies that optimize your operations and drive innovation across every vertical.</p>

<h3>Our Cloud Services</h3>
<ul>
  <li><strong>Cloud Strategy & Consulting</strong> — Readiness assessments, roadmap development, and vendor selection tailored to your business objectives.</li>
  <li><strong>Cloud Migration</strong> — Seamless migration of infrastructure, applications, and data to the cloud with minimal disruption.</li>
  <li><strong>Managed Cloud Services</strong> — 24/7 monitoring, security compliance, and automated scaling to keep your environment performant and cost-optimized.</li>
  <li><strong>Cloud Architecture & Design</strong> — Cloud-native and multi-cloud architectures designed for resilience, scalability, and optimal performance.</li>
  <li><strong>DevOps & Automation</strong> — CI/CD pipeline implementation, Infrastructure as Code (IaC), and continuous deployment workflows.</li>
  <li><strong>Cloud Cost Optimization</strong> — Usage analysis and cost reduction strategies that maximize your ROI without compromising performance.</li>
  <li><strong>Serverless & Microservices</strong> — Modern architectures that reduce infrastructure overhead and dramatically improve scalability.</li>
  <li><strong>Big Data & Analytics</strong> — Cloud-powered data warehousing, processing pipelines, and machine learning integrations.</li>
</ul>

<h3>Our Cloud Journey Process</h3>
<ol>
  <li><strong>Assessment & Planning</strong> — Deep discovery of current infrastructure, workloads, and business goals.</li>
  <li><strong>Design & Architecture</strong> — Optimal cloud architecture balancing performance, security, scalability, and compliance.</li>
  <li><strong>Migration or Development</strong> — Phased migration execution or cloud-native application development.</li>
  <li><strong>Data Management & Security</strong> — Secure data transfer with encryption, access controls, and threat detection.</li>
  <li><strong>Optimization</strong> — Continuous cost management and resource rightsizing post-migration.</li>
  <li><strong>DevOps & Automation</strong> — Automated deployment pipelines and configuration management.</li>
  <li><strong>Monitoring & Support</strong> — Proactive 24/7 infrastructure monitoring with rapid incident response.</li>
</ol>`
  },
  {
    title: "Platform Development",
    slug: "platform-development",
    category: "Engineering",
    summary: "Custom-built platforms engineered for speed, security, scalability, and peak performance.",
    tags: "platform, mobile, app, native, scalability",
    status: "published",
    featured: "false",
    publishedAt: new Date().toISOString().slice(0, 10),
    seoTitle: "Platform Development Services | Touchpointe Digital",
    seoDescription: "Custom platform and application development with intuitive UIs, seamless navigation, and robust backend architectures for enterprise scale.",
    content: `<h2>Platforms Built to Exceed Expectations</h2>
<p>Touchpointe empowers businesses with custom-built platforms and enhanced systems that consistently exceed expectations. From greenfield platform builds to enhancing existing systems, our skilled developers prioritize intuitive user interfaces, seamless navigation, and robust backend architectures designed for the enterprise.</p>

<h3>What We Build</h3>
<ul>
  <li><strong>Custom SaaS Platforms</strong> — End-to-end SaaS architectures designed for multi-tenancy, subscription billing, and rapid feature iteration.</li>
  <li><strong>Mobile Applications</strong> — Native iOS and Android applications, and cross-platform solutions using Flutter and React Native.</li>
  <li><strong>Enterprise Portals</strong> — Internal tools, HR systems, vendor portals, and customer dashboards built for scale.</li>
  <li><strong>API & Integration Platforms</strong> — RESTful and GraphQL API platforms that connect your ecosystem of tools and data sources seamlessly.</li>
  <li><strong>Marketplace Platforms</strong> — Two-sided marketplace architectures with payment processing, ratings, and real-time messaging.</li>
</ul>

<h3>Technology Stack</h3>
<p>We select technologies based on your specific performance, scale, and team requirements:</p>
<ul>
  <li><strong>Frontend</strong> — React, Next.js, Vue.js, Angular</li>
  <li><strong>Mobile</strong> — Flutter, React Native, Swift, Kotlin</li>
  <li><strong>Backend</strong> — Node.js, Python (Django/FastAPI), Java Spring, Go</li>
  <li><strong>Database</strong> — PostgreSQL, MongoDB, Redis, Elasticsearch</li>
  <li><strong>Infrastructure</strong> — AWS, GCP, Azure, Docker, Kubernetes</li>
</ul>

<h3>Our Development Approach</h3>
<p>We follow agile methodologies with two-week sprint cycles, continuous integration, and weekly stakeholder demos. This ensures transparency, rapid iteration, and alignment with your evolving business needs throughout the engagement.</p>`
  },
  {
    title: "Technology Consultancy",
    slug: "technology-consultancy",
    category: "Strategy",
    summary: "Align your IT and business goals for a seamless, impactful, and future-proof technology strategy.",
    tags: "consulting, strategy, digital transformation, roadmap",
    status: "published",
    featured: "false",
    publishedAt: new Date().toISOString().slice(0, 10),
    seoTitle: "Technology Strategy & Consulting | Touchpointe Digital",
    seoDescription: "Expert technology consulting to align your IT strategy with business goals. Digital transformation, roadmap planning, and technology selection.",
    content: `<h2>Strategic Technology Guidance for the Digital Age</h2>
<p>Whether you need assistance with digital transformation, technology roadmap planning, or software selection, our tech consultancy services are designed to address your specific challenges and opportunities. Our approach combines strategic thinking with deep technical expertise to deliver actionable guidance.</p>

<h3>Consultancy Services</h3>
<ul>
  <li><strong>Digital Transformation Strategy</strong> — Comprehensive transformation roadmaps that move legacy operations to modern, efficient digital workflows.</li>
  <li><strong>Technology Roadmap Planning</strong> — Structured multi-year technology plans that align engineering priorities with business outcomes.</li>
  <li><strong>Architecture Reviews</strong> — Evaluation of existing systems with actionable recommendations for modernization, scalability, and cost reduction.</li>
  <li><strong>Software Selection & Vendor Assessment</strong> — Objective evaluation of technology vendors and software platforms tailored to your specific requirements.</li>
  <li><strong>CTO-as-a-Service</strong> — Fractional CTO engagement for startups and growth-stage companies that need senior technical leadership without full-time overhead.</li>
  <li><strong>Security & Compliance Audits</strong> — Identify vulnerabilities and compliance gaps before they become costly incidents.</li>
</ul>

<h3>Industries We Advise</h3>
<p>Fintech, Healthtech, EdTech, Retail & E-Commerce, Logistics, Real Estate, SaaS, and Manufacturing.</p>

<h3>Our Consulting Methodology</h3>
<ol>
  <li><strong>Discovery</strong> — Deep-dive workshops with your leadership team to understand business context, technical debt, and strategic goals.</li>
  <li><strong>Assessment</strong> — Ongoing analysis of systems, processes, and organizational capability.</li>
  <li><strong>Recommendations</strong> — A detailed, prioritized roadmap with ROI projections and risk assessments for each initiative.</li>
  <li><strong>Implementation Support</strong> — Hands-on guidance through execution, ensuring recommendations translate into tangible results.</li>
  <li><strong>Review & Iteration</strong> — Quarterly reviews to adapt the roadmap as your business evolves.</li>
</ol>`
  },
  {
    title: "Product Development",
    slug: "product-development",
    category: "Engineering",
    summary: "Comprehensive product development from concept validation all the way through design, development, and market deployment.",
    tags: "product, mvp, startup, development, launch",
    status: "published",
    featured: "true",
    publishedAt: new Date().toISOString().slice(0, 10),
    seoTitle: "Product Development Services | Touchpointe Digital",
    seoDescription: "End-to-end product development — from idea validation and UX design to engineering, QA, and market launch. We build products that users love.",
    content: `<h2>From Idea to Market-Ready Product</h2>
<p>Take your product from concept to market success with our tailored product development services. From validating your initial concept to designing, developing, and testing, we handle every aspect of the process. Our goal is to create a product that not only meets your vision but exceeds user expectations and drives commercial success.</p>

<h3>Our Product Development Services</h3>
<ul>
  <li><strong>Concept Validation</strong> — 3-week design sprints to rapidly validate product-market fit before significant investment.</li>
  <li><strong>UX Research & Design</strong> — Deep user research, persona development, and high-fidelity prototype creation.</li>
  <li><strong>MVP Development</strong> — Lean minimum viable product builds that get you to market fast with core features validated.</li>
  <li><strong>Full Product Engineering</strong> — Complete frontend, backend, mobile, and API development using modern tech stacks.</li>
  <li><strong>Quality Assurance</strong> — Comprehensive testing covering functional, performance, security, and accessibility requirements.</li>
  <li><strong>Market Launch</strong> — App store submissions, production deployment, monitoring setup, and post-launch stabilization.</li>
  <li><strong>Growth Engineering</strong> — Feature iteration cycles driven by user analytics and retention data post-launch.</li>
</ul>

<h3>Product Development Process</h3>
<ol>
  <li><strong>Discover & Define</strong> — Stakeholder workshops, market analysis, and user research to define the product vision.</li>
  <li><strong>Design Sprint</strong> — Rapid prototyping and user validation to confirm core assumptions before building.</li>
  <li><strong>Build</strong> — Agile development in two-week sprints with continuous client visibility and input.</li>
  <li><strong>Test & Iterate</strong> — Structured QA cycles with real user feedback loops baked into the process.</li>
  <li><strong>Launch</strong> — Go-live preparation including performance testing, SEO, analytics, and monitoring configuration.</li>
  <li><strong>Scale</strong> — Roadmap-driven feature development with data-informed prioritization post-launch.</li>
</ol>

<h3>Why Touchpointe for Product Development?</h3>
<p>We partner with startups, scaleups, and enterprise teams alike. Our cross-functional teams — designers, engineers, QA specialists, and strategists — operate as an extension of your team, not just a vendor.</p>`
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    category: "Marketing",
    summary: "Accelerate business growth with data-driven digital marketing that fuels success in the dynamic digital landscape.",
    tags: "marketing, seo, social media, ppc, analytics",
    status: "published",
    featured: "false",
    publishedAt: new Date().toISOString().slice(0, 10),
    seoTitle: "Digital Marketing Services | Touchpointe Digital",
    seoDescription: "Comprehensive data-driven digital marketing — SEO, PPC, social media, content marketing, and conversion optimization to maximize your digital ROI.",
    content: `<h2>Dominate Your Digital Landscape</h2>
<p>Maximize your digital presence and outpace the competition with our comprehensive suite of data-driven digital marketing services. From driving targeted traffic to capturing leads and skyrocketing conversions, we strategically amplify your online visibility and deliver measurable business growth.</p>

<h3>Our Digital Marketing Services</h3>
<ul>
  <li><strong>Search Engine Optimization (SEO)</strong> — Technical SEO, on-page optimization, link building, and content strategy to dominate organic search rankings.</li>
  <li><strong>Pay-Per-Click Advertising (PPC)</strong> — Precision-targeted Google Ads and Meta Ads campaigns engineered for maximum return on ad spend.</li>
  <li><strong>Social Media Marketing</strong> — Strategic content creation, community management, and paid social campaigns across LinkedIn, Instagram, X, and more.</li>
  <li><strong>Content Marketing</strong> — Long-form content, thought leadership articles, case studies, and video content that build brand authority.</li>
  <li><strong>Email Marketing & Automation</strong> — Nurture campaigns, drip sequences, and marketing automation flows that convert leads into paying customers.</li>
  <li><strong>Conversion Rate Optimization (CRO)</strong> — A/B testing, heatmap analysis, and UX improvements to maximize the value of your existing traffic.</li>
  <li><strong>Analytics & Reporting</strong> — Comprehensive dashboards and monthly strategic reports that connect marketing activity to business outcomes.</li>
</ul>

<h3>Our Marketing Approach</h3>
<ol>
  <li><strong>Audit & Strategy</strong> — Full-funnel audit of your current digital presence and competitive landscape analysis.</li>
  <li><strong>Goal Setting</strong> — Define specific, measurable KPIs aligned with revenue goals.</li>
  <li><strong>Campaign Execution</strong> — Multi-channel campaign launch with coordinated creative, copy, and targeting.</li>
  <li><strong>Optimization</strong> — Continuous real-time optimization based on performance data.</li>
  <li><strong>Reporting & Growth Planning</strong> — Monthly performance reviews with forward-looking strategy adjustments.</li>
</ol>`
  },
  {
    title: "Quality Assurance",
    slug: "quality-assurance",
    category: "Engineering",
    summary: "Ensuring the reliability and performance of software through comprehensive testing and validation at every stage of development.",
    tags: "qa, testing, automation, performance, security",
    status: "published",
    featured: "false",
    publishedAt: new Date().toISOString().slice(0, 10),
    seoTitle: "Quality Assurance & Software Testing | Touchpointe Digital",
    seoDescription: "Comprehensive QA and software testing services — functional, performance, security, and automation testing to deliver bug-free, high-quality software.",
    content: `<h2>Quality is Not an Afterthought</h2>
<p>Our dedicated QA team rigorously tests and validates each aspect of your software to deliver bug-free, high-quality results. We integrate quality assurance throughout the entire development lifecycle — not just at the end — ensuring issues are caught early when they're least expensive to fix.</p>

<h3>QA Services We Provide</h3>
<ul>
  <li><strong>Functional Testing</strong> — Comprehensive end-to-end testing of all application features against defined business requirements.</li>
  <li><strong>Automated Testing</strong> — Scalable test automation frameworks using Selenium, Playwright, Cypress, and Jest for rapid regression coverage.</li>
  <li><strong>Performance Testing</strong> — Load testing, stress testing, and scalability validation to ensure your application handles peak traffic gracefully.</li>
  <li><strong>Security Testing</strong> — Vulnerability assessments, penetration testing, and OWASP compliance checks to protect your users and data.</li>
  <li><strong>Mobile Testing</strong> — Comprehensive cross-device and cross-OS testing for iOS and Android applications.</li>
  <li><strong>API Testing</strong> — Validation of all API endpoints for correctness, reliability, and security.</li>
  <li><strong>Accessibility Testing</strong> — WCAG 2.1 compliance testing to ensure your product is usable by all users.</li>
  <li><strong>UAT Support</strong> — Structured User Acceptance Testing facilitation with your stakeholders and real end-users.</li>
</ul>

<h3>Our QA Process</h3>
<ol>
  <li><strong>Test Planning</strong> — Define test strategy, scope, resources, and test cases aligned with requirements.</li>
  <li><strong>Test Design</strong> — Create detailed test cases covering all critical paths, edge cases, and failure scenarios.</li>
  <li><strong>Test Execution</strong> — Manual and automated test execution with detailed defect reporting and severity classification.</li>
  <li><strong>Defect Management</strong> — Structured defect tracking, retesting, and resolution verification cycles.</li>
  <li><strong>Reporting</strong> — Clear, actionable quality reports with coverage metrics and release readiness recommendations.</li>
</ol>`
  },
  {
    title: "AI & Machine Learning",
    slug: "ai-machine-learning",
    category: "Intelligence",
    summary: "Empowering businesses with intelligent automation and data-driven insights through cutting-edge AI and ML solutions.",
    tags: "ai, machine learning, nlp, computer vision, automation, llm",
    status: "published",
    featured: "true",
    publishedAt: new Date().toISOString().slice(0, 10),
    seoTitle: "AI & Machine Learning Development | Touchpointe Digital",
    seoDescription: "Custom AI and ML solutions — from strategy and data engineering to model development, NLP, computer vision, and intelligent automation.",
    content: `<h2>Intelligent Systems for the Modern Enterprise</h2>
<p>Touchpointe delivers cutting-edge Artificial Intelligence and Machine Learning services designed to harness the power of data-driven insights and intelligent automation. Our AI/ML experts deliver innovative solutions that transform business operations and drive competitive advantage across every industry vertical.</p>

<h3>Our AI & ML Services</h3>
<ul>
  <li><strong>AI Strategy & Consulting</strong> — AI readiness assessments and strategic roadmaps that identify the highest-value AI use cases for your business.</li>
  <li><strong>Data Engineering</strong> — Data collection, integration, cleaning, and preprocessing pipelines that make your data ready for AI at scale.</li>
  <li><strong>Custom Machine Learning Models</strong> — Bespoke ML models built to address your unique business challenges with predictive and prescriptive precision.</li>
  <li><strong>Deep Learning & Neural Networks</strong> — Advanced deep learning solutions for image recognition, NLP, speech processing, and complex pattern detection.</li>
  <li><strong>Natural Language Processing (NLP)</strong> — Sentiment analysis, language translation, document intelligence, and conversational AI systems.</li>
  <li><strong>Computer Vision</strong> — Image recognition, object detection, video analytics, and visual quality inspection systems.</li>
  <li><strong>Intelligent Chatbots & Virtual Agents</strong> — AI-driven conversational interfaces that deliver personalized experiences at scale.</li>
  <li><strong>Predictive Analytics</strong> — Demand forecasting, customer churn prediction, and operational optimization using predictive models.</li>
  <li><strong>Generative AI Solutions</strong> — LLM integrations, RAG pipelines, and custom generative AI products built on GPT, Claude, and open-source models.</li>
  <li><strong>MLOps & Model Management</strong> — End-to-end model lifecycle management covering training, deployment, monitoring, and continuous retraining.</li>
</ul>

<h3>Technologies & Frameworks</h3>
<ul>
  <li><strong>Languages</strong> — Python, R, Julia, Scala</li>
  <li><strong>ML Frameworks</strong> — TensorFlow, PyTorch, scikit-learn, XGBoost</li>
  <li><strong>NLP</strong> — Hugging Face, LangChain, OpenAI API, spaCy</li>
  <li><strong>MLOps</strong> — MLflow, Kubeflow, Weights & Biases, SageMaker</li>
  <li><strong>Data</strong> — Apache Spark, Databricks, dbt, Airflow</li>
</ul>

<h3>Key Business Outcomes</h3>
<ul>
  <li>Automate repetitive processes, freeing teams for higher-value work.</li>
  <li>Gain real-time predictive insights that improve decision-making velocity.</li>
  <li>Personalize customer experiences at a scale impossible with manual approaches.</li>
  <li>Detect anomalies, fraud, and risk in real-time across operational data streams.</li>
</ul>`
  }
];

async function seedService(service) {
  try {
    const res = await fetch(`${BASE}/api/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service)
    });

    const data = await res.json();

    if (res.ok) {
      console.log(`✅ Created: ${service.title}`);
    } else {
      // If 409 duplicate slug, try updating
      if (res.status === 409 || data.error?.includes("duplicate")) {
        console.log(`⚠️  Skipped (already exists): ${service.title}`);
      } else {
        console.error(`❌ Failed: ${service.title} — ${data.error || res.status}`);
      }
    }
  } catch (err) {
    console.error(`❌ Network error for ${service.title}:`, err.message);
  }
}

(async () => {
  console.log(`\n🚀 Seeding ${services.length} services into Touchpointe DB...\n`);
  for (const service of services) {
    await seedService(service);
  }
  console.log("\n✨ Done! Visit /services on your site to see them.\n");
})();
