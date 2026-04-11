import { Schema, model, models } from "mongoose";

const homepageSchema = new Schema({
  copy: {
    heroTitle1: { type: String, default: "We empower Businesses" },
    heroTitleGradient: { type: String, default: "with Intelligent Digital" },
    heroTitle3: { type: String, default: "Solutions" },
    heroBtnText: { type: String, default: "Get in touch" },
    
    credibilityHeadline: { type: String, default: "Think Touchpointe and we think bigger than technology." },
    credibilitySub: { type: String, default: "At Touchpointe, we're not just builders; we're innovators, problem-solvers..." },
    
    capabilitiesHeadline: { type: String, default: "Our Capabilities" },
    capabilitiesSub: { type: String, default: "End-to-end digital engineering pushing the boundaries of web and mobile limitations." },
    
    intelligenceEyebrow: { type: String, default: "Intelligence Tier" },
    intelligenceHeadline: { type: String, default: "AI & Analytics integration layered natively." },
    intelligenceSub: { type: String, default: "We don't just build UI; we hook into proprietary datasets..." },
    
    exploreHeadline: { type: String, default: "Explore by Objective" },
    
    processEyebrow: { type: String, default: "Our Process" },
    processHeadline: { type: String, default: "How We Execute" },
    
    labBadge: { type: String, default: "Touchpointe LAB" },
    labHeadline: { type: String, default: "Startup incubation & scaleup support" },
    labSub: { type: String, default: "Got a SaaS idea? We don't just build code; we co-incubate startups from Idea to Launch." },
    
    productsHeadline: { type: String, default: "Internal Products" },
    productsSub: { type: String, default: "Deployable SaaS architectures standing ready." },
    
    industriesHeadline: { type: String, default: "Industries We Serve" },
    
    whyHeadline: { type: String, default: "Why Touchpointe" },
    whyText1: { type: String, default: "We don't just build digital experiences, we engineer intelligent growth systems." },
    whyText2: { type: String, default: "A strong frontend is useless without a scalable backend." },
    
    clientHeadline: { type: String, default: "Client Success" },
    ctaHeadline: { type: String, default: "Have a project to collaborate with us?" },
    ctaBtn: { type: String, default: "Let's talk" }
  },

  capabilities: { type: [{ title: String, desc: String }], default: [] },
  stats: { type: [{ label: String, value: String }], default: [] },
  productsList: { type: [{ title: String, desc: String, tagline: String }], default: [] },
  labMetrics: { type: [{ label: String, value: String }], default: [] },
  labSteps: { type: [{ title: String, desc: String, linkText: String }], default: [] },
  
  clients: { type: [String], default: [] },
  industries: { type: [String], default: [] },
  workflowSteps: {
    type: [{ id: String, title: String, desc: String }],
    default: []
  },
  aiSolutions: {
    type: [{ title: String, desc: String, color: String }],
    default: []
  },
  testimonials: {
    type: [{ quote: String, author: String, role: String, company: String }],
    default: []
  }
}, {
  timestamps: true
});

const Homepage = models.Homepage || model("Homepage", homepageSchema);
export default Homepage;
