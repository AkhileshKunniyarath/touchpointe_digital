import { AdminShell } from "@/components/admin/admin-shell";
import { HomepageEditor } from "@/components/admin/homepage-editor";
import { connectToDatabase } from "@/lib/mongodb";
import Homepage from "@/models/Homepage";

export const revalidate = 0;

export default async function HomepageAdminRoute() {
  let doc: any = null;
  try {
    await connectToDatabase();
    doc = await Homepage.findOne({}).lean();
  } catch(e) {
    console.error("Database connection failed. Loading empty structural arrays.");
  }
  
  const defaultCopy = {
    heroTitle1: "We empower Businesses",
    heroTitleGradient: "with Intelligent Digital",
    heroTitle3: "Solutions",
    heroBtnText: "Get in touch",
    credibilityHeadline: "Think Touchpointe and we think bigger than technology.",
    credibilitySub: "At Touchpointe, we're not just builders; we're innovators, problem-solvers, and your dedicated partners in technological transformation.",
    capabilitiesHeadline: "Our Capabilities",
    capabilitiesSub: "End-to-end digital engineering pushing the boundaries of web and mobile limitations.",
    intelligenceEyebrow: "Intelligence Tier",
    intelligenceHeadline: "AI & Analytics integration layered natively.",
    intelligenceSub: "We don't just build UI; we hook into proprietary datasets creating extremely reactive experiences utilizing internal LLM frameworks.",
    exploreHeadline: "Explore by Objective",
    processEyebrow: "Our Process",
    processHeadline: "How We Execute",
    labBadge: "Touchpointe LAB",
    labHeadline: "Startup incubation & scaleup support",
    labSub: "Got a SaaS idea? We don't just build code; we co-incubate startups from Idea to Launch.",
    productsHeadline: "Internal Products",
    productsSub: "Deployable SaaS architectures standing ready.",
    industriesHeadline: "Industries We Serve",
    whyHeadline: "Why Touchpointe",
    whyText1: "We don't just build digital experiences, we engineer intelligent growth systems. Quality and strategy must be intimately intertwined to produce compounding results.",
    whyText2: "A strong frontend is useless without a scalable backend. Architectures span the complete vertical ensuring pixel-perfect fidelity marries uncompromised performance.",
    clientHeadline: "Client Success",
    ctaHeadline: "Have a project to collaborate with us?",
    ctaBtn: "Let's talk"
  };

  const initialData = doc ? JSON.parse(JSON.stringify(doc)) : {
    copy: defaultCopy,
    clients: [],
    industries: [],
    workflowSteps: [],
    aiSolutions: [],
    testimonials: [],
    capabilities: [
      { title: "Web Development", desc: "Enterprise grade runtimes." },
      { title: "Mobile App Development", desc: "Native iOS and Android." },
      { title: "Saas Products", desc: "MVP to scalable platforms." },
      { title: "Data Intelligence", desc: "Predictive BI insights." },
      { title: "Automation", desc: "Agent loops and workflows." },
      { title: "Enterprise Platforms", desc: "Secure vast operations." }
    ],
    stats: [
      { label: "DEPLOYMENTS", value: "500+" },
      { label: "SYSTEM UPTIME", value: "99.9%" },
      { label: "GLOBAL SUPPORT", value: "24/7" },
      { label: "INDUSTRIES", value: "12" }
    ],
    productsList: [
      { title: "JARVIS OS", desc: "Centralized internal command terminal for enterprise HR and Payroll.", tagline: "Platform" },
      { title: "NEXUS ANALYTICS", desc: "Realtime data visualization streaming natively to WebGL dashboards.", tagline: "Data Analytics" }
    ],
    labMetrics: [
      { label: "Funding Raised", value: "$15mn+" },
      { label: "Businesses Accelerated", value: "20+" },
      { label: "Jobs Fostered", value: "35+" }
    ],
    labSteps: [
      { title: "1. Start & Validate", desc: "Helping visionary people with great ideas get their start. We run 3-week design sprints to establish product-market fit...", linkText: "Apply for validation" },
      { title: "2. Building a Product", desc: "Acting as your direct equity-partner Technical team. We construct highly distributed microservices...", linkText: "Review Engineering Stack" },
      { title: "3. Launch and Scale", desc: "Specifically engineered for scaling up your product pipeline globally. Handing over 99.9% uptime architectures...", linkText: "Coordinate Handover" }
    ]
  };

  // Merge default copy if any fields are missing from legacy DB hooks
  if (!initialData.copy || Object.keys(initialData.copy).length < Object.keys(defaultCopy).length) {
    initialData.copy = { ...defaultCopy, ...(initialData.copy || {}) };
  }

  return (
    <AdminShell
      title="Global CMS Engine"
      description="Centrally manage every single string of text, array, and layout element actively deployed to the application homepage."
    >
       <HomepageEditor initialData={initialData} />
    </AdminShell>
  );
}
