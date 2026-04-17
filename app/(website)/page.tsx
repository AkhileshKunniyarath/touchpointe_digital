import type React from "react";
import Link from "next/link";
import {
  ArrowRight, Code, Smartphone, Briefcase, Database,
  CloudUpload, Cpu, Shield, Globe, Award, Settings, Layers,
  Zap, CheckCircle2, Users, TrendingUp, Clock,
  ShoppingBag, Package, BookOpen, Building2, Car,
  Cloud, Heart, Banknote
} from "lucide-react";

import { SectionWrapper } from "@/components/site/section-wrapper";
import { TestimonialSlider } from "@/components/site/testimonial-slider";
import { ServicePicker } from "@/components/site/service-picker";
import { ContactForm } from "@/components/site/contact-form";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/site/scroll-reveal";
import { AnimatedHeroWord } from "@/components/site/animated-hero-word";

import { connectToDatabase } from "@/lib/mongodb";
import Homepage from "@/models/Homepage";

export const revalidate = 60;

const defaultCopy = {
  heroTitle1: "Empowering your",
  heroTitleGradient: "Business",
  heroTitle3: "with Custom Software Solutions",
  heroBtnText: "Get Free Consultation",
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

const capabilitiesFallback = [
  { title: "Web Development", desc: "Enterprise grade runtimes built to scale under heavy traffic." },
  { title: "Mobile App Development", desc: "Native iOS and Android apps with seamless UX." },
  { title: "SaaS Products", desc: "From MVP to full-scale multi-tenant platforms." },
  { title: "Data Intelligence", desc: "Predictive BI insights from raw operational data." },
  { title: "Automation", desc: "AI agent loops and workflow automation pipelines." },
  { title: "Enterprise Platforms", desc: "Secure, vast operations with zero-downtime delivery." }
];

const statsFallback = [
  { label: "Clients\nServed", value: "200+", icon: "users" },
  { label: "Talented\nTeam", value: "200+", icon: "cloud" },
  { label: "Start-ups\nsupported", value: "25+", icon: "trending" },
  { label: "Value creation established\nwith start-ups", value: "75mn+", icon: "clock" }
];

const workflowStepsFallback = [
  { id: "01", title: "Planning", desc: "Goal setting and resource allocation." },
  { id: "02", title: "Research", desc: "User behavior mapping." },
  { id: "03", title: "Design", desc: "Visual and UX architecture validation." },
  { id: "04", title: "Development", desc: "Code translation and iteration." },
  { id: "05", title: "Quality Assurance", desc: "Performance & security testing." },
  { id: "06", title: "Product Launch", desc: "Final deployment payload." }
];

const clientsFallback = ["TECH ENTERPRISE", "GLOBEX CORPORATION", "STELLAR AI", "VISIONARY LABS", "NEXUS SYSTEMS", "OMEGA CLOUD", "QUANTUM DATA"];

const aiSolutionsFallback = [
  { title: "Computer Vision Models", desc: "Detect, analyze, and process visual data securely at scale." },
  { title: "Generative LLM Wrappers", desc: "Proprietary conversational agents trained on your documentation." },
  { title: "Predictive Analytics", desc: "Forecasting operational loads and automated inventory scaling." }
];

const productsListFallback = [
  { title: "JARVIS OS", desc: "Centralized internal command terminal for enterprise HR and Payroll.", tagline: "Platform" },
  { title: "NEXUS ANALYTICS", desc: "Realtime data visualization streaming natively to WebGL dashboards.", tagline: "Data Analytics" }
];

const labMetricsFallback = [
  { label: "Funding Raised", value: "$15mn+" },
  { label: "Businesses Accelerated", value: "20+" },
  { label: "Jobs Fostered", value: "35+" }
];

const labStepsFallback = [
  { title: "1. Start & Validate", desc: "Helping visionary people with great ideas get their start. We run 3-week design sprints to establish product-market fit...", linkText: "Apply for validation", image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2938&auto=format&fit=crop" },
  { title: "2. Building a Product", desc: "Acting as your direct equity-partner Technical team. We construct highly distributed microservices...", linkText: "Review Engineering Stack", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop" },
  { title: "3. Launch and Scale", desc: "Specifically engineered for scaling up your product pipeline globally. Handing over 99.9% uptime architectures...", linkText: "Coordinate Handover", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop" }
];

const industriesFallback = ["Healthcare", "FinTech", "Retail & E-Commerce", "Logistics", "EdTech", "Real Estate", "Automotive", "SaaS"];

const testimonialsFallback = [
  { quote: "Touchpointe re-engineered our entire cloud infrastructure within 8 weeks. Unmatched fidelity.", author: "Sarah Jenkins", role: "CTO", company: "Stellar AI" },
  { quote: "The conversion lift we saw just from their frontend layout was roughly 43%.", author: "David Vance", role: "VP Growth", company: "Nexus Systems" }
];

const whyFeatures = [
  { icon: Zap, label: "Strategy-led builds", desc: "Tech decisions aligned directly to business outcomes" },
  { icon: Layers, label: "Full-stack delivery", desc: "End-to-end from design systems to production ops" },
  { icon: Cpu, label: "AI-native engineering", desc: "Intelligence woven into every system layer" },
  { icon: Shield, label: "Zero-downtime deploys", desc: "Blue-green deployments with 99.9% uptime guarantee" },
];

const industryIconMap: Record<string, React.ElementType> = {
  "Healthcare": Heart,
  "FinTech": TrendingUp,
  "Retail & E-Commerce": ShoppingBag,
  "Logistics": Package,
  "EdTech": BookOpen,
  "Real Estate": Building2,
  "Automotive": Car,
  "SaaS": Cloud,
};

function getCapabilityIcon(index: number) {
  const icons = [Code, Smartphone, Briefcase, Database, Cpu, CloudUpload, Shield, Globe, Award, Settings, Layers, Zap];
  return icons[index % icons.length];
}

function getStatIcon(icon: string) {
  switch (icon) {
    case "users": return Users;
    case "cloud": return CloudUpload;
    case "trending": return TrendingUp;
    case "clock": return Clock;
    default: return Award;
  }
}

function getLabIcon(index: number) {
  const icons = [Globe, Code, Zap, Layers, Briefcase];
  return icons[index % icons.length];
}

export default async function HomePage() {
  let dbData: any = null;
  try {
    await connectToDatabase();
    dbData = await Homepage.findOne({}).lean() as any;
  } catch {
    console.warn("Database Connection Unstable. Falling back to local native structures.");
  }

  const copy = { ...defaultCopy, ...(dbData?.copy || {}) };
  const dbClients = dbData?.clients?.length ? dbData.clients : clientsFallback;
  const dbWorkflowSteps = dbData?.workflowSteps?.length ? dbData.workflowSteps : workflowStepsFallback;
  const dbAiSolutions = dbData?.aiSolutions?.length ? dbData.aiSolutions : aiSolutionsFallback;
  const dbIndustries = dbData?.industries?.length ? dbData.industries : industriesFallback;
  const dbTestimonials = dbData?.testimonials?.length ? dbData.testimonials : testimonialsFallback;
  const dbCapabilities = dbData?.capabilities?.length ? dbData.capabilities : capabilitiesFallback;
  const dbStats = dbData?.stats?.length ? dbData.stats : statsFallback;
  const dbProducts = dbData?.productsList?.length ? dbData.productsList : productsListFallback;
  const dbLabMetrics = dbData?.labMetrics?.length ? dbData.labMetrics : labMetricsFallback;
  const dbLabSteps = dbData?.labSteps?.length ? dbData.labSteps : labStepsFallback;

  return (
    <>
      {/* ── REAL IMAGE HERO ── */}
      <div 
        className="relative w-full min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-slate-900 border-b border-slate-200"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        
        {/* Semi-transparent Overlay for contrast */}
        <div className="absolute inset-0 bg-black/60 z-0" />

        <SectionWrapper className="relative z-10 pt-16">
          <div className="max-w-5xl mx-auto flex flex-col items-center">

            <ScrollReveal variant="up" delay={80}>
              <h1 className="text-4xl sm:text-5xl md:text-[4rem] font-bold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-lg">
                Empowering your <AnimatedHeroWord /> <br className="hidden sm:block" />
                with custom software solutions.
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={160}>
              <p className="text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed mb-0 drop-shadow-md font-medium">
                Unlock the Power of Innovative Software Development
              </p>
            </ScrollReveal>

          </div>
        </SectionWrapper>
      </div>

      {/* ── STATS BAR ── */}
      <div className="relative z-20 -mt-24 pb-12 w-full px-4 lg:px-0 max-w-[1200px] mx-auto">
        <ScrollReveal variant="up" delay={0} amount={0.2}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 rounded-2xl bg-white shadow-xl overflow-hidden divide-x divide-y lg:divide-y-0 divide-slate-100">
            {dbStats.map((st: any, i: number) => {
              // override icons specifically for the exact snapshot layout regardless of config key, just to be visually perfect mapping
              const IconsList = [Users, Users, Building2, Banknote]; 
              const Icon = IconsList[i % 4];
              
              return (
                <div key={i} className="flex flex-row items-center sm:items-start gap-4 p-6 sm:p-8 group hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#FAFAFA] border border-slate-100 flex items-center justify-center shrink-0 transition-all duration-300">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#EA4335] transition-colors" strokeWidth={2} />
                  </div>
                  <div className="text-left flex flex-col justify-start mt-[-2px]">
                    <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-none mb-1.5">{st.value}</p>
                    <p className="text-[13px] font-medium text-slate-500 whitespace-pre-wrap leading-relaxed">
                      {st.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>



      {/* ── CAPABILITIES ── */}
      <div className="section-light border-b border-slate-200">
        <SectionWrapper className="py-24">
          <ScrollReveal variant="up" className="text-center mb-14 max-w-2xl mx-auto">
            <span className="eyebrow mb-4 block w-fit mx-auto">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{copy.capabilitiesHeadline}</h2>
            <p className="text-slate-500 text-lg leading-relaxed">{copy.capabilitiesSub}</p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08} delayMs={100}>
            {dbCapabilities.map((cap: any, i: number) => {
              const Icon = getCapabilityIcon(i);
              return (
                <StaggerItem key={i}>
                  <div className="group rounded-xl border border-slate-200 bg-white p-8 flex flex-col h-full hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50/60 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-5 group-hover:bg-[#7C3AED] group-hover:border-[#7C3AED] transition-all duration-300">
                      <Icon className="w-5 h-5 text-[#7C3AED] group-hover:text-white transition-colors" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{cap.title}</h3>
                    <p className="text-sm text-slate-500 flex-1 leading-relaxed">{cap.desc}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#7C3AED] tracking-wider mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      LEARN MORE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </SectionWrapper>
      </div>

      {/* ── AI INTELLIGENCE ── */}
      <div className="section-muted border-b border-slate-200">
        <SectionWrapper className="py-24">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
            <ScrollReveal variant="left" amount={0.2}>
              <span className="eyebrow mb-4 block w-fit">{copy.intelligenceEyebrow}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">{copy.intelligenceHeadline}</h2>
              <p className="text-slate-500 text-base leading-relaxed">{copy.intelligenceSub}</p>
            </ScrollReveal>

            <ScrollReveal variant="right" amount={0.15}>
              <div className="grid gap-4">
                {dbAiSolutions.map((sol: any, idx: number) => (
                  <div key={idx} className="rounded-xl border border-slate-200 bg-white p-6 flex items-start gap-5 border-l-4 border-l-slate-200 hover:border-l-[#7C3AED] hover:shadow-sm transition-all duration-300">
                    <div className="w-10 h-10 bg-[#7C3AED] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">{sol.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{sol.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </SectionWrapper>
      </div>

      {/* ── SERVICE PICKER ── */}
      <div className="section-light border-b border-slate-200">
        <SectionWrapper className="py-24">
          <ScrollReveal variant="up" className="text-center mb-2 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">{copy.exploreHeadline}</h2>
          </ScrollReveal>
          <ServicePicker />
        </SectionWrapper>
      </div>

      {/* ── PROCESS ── */}
      <div className="section-muted border-b border-slate-200">
        <SectionWrapper className="py-24">
          <ScrollReveal variant="up" className="mb-16 text-center">
            <span className="eyebrow mb-4 block w-fit mx-auto">{copy.processEyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">{copy.processHeadline}</h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto" stagger={0.08} delayMs={100}>
            {dbWorkflowSteps.map((step: any, idx: number) => (
              <StaggerItem key={idx}>
                <div className="group rounded-xl border border-slate-200 bg-white p-7 relative overflow-hidden hover:border-violet-200 hover:shadow-md hover:shadow-violet-50/50 transition-all duration-300 h-full">
                  {/* Slide-in top accent */}
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-[#7C3AED] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  {/* Step badge */}
                  <div className="w-11 h-11 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-5 group-hover:bg-[#7C3AED] group-hover:border-[#7C3AED] transition-all duration-300">
                    <span className="text-sm font-black text-[#7C3AED] group-hover:text-white transition-colors">
                      {step.id || String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </SectionWrapper>
      </div>

      {/* ── LAB ── */}
      <div className="section-light border-b border-slate-200">
        <SectionWrapper className="py-24">
          <ScrollReveal variant="up" className="text-center mb-10 max-w-2xl mx-auto">
            <span className="eyebrow mb-4 block w-fit mx-auto">{copy.labBadge}</span>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{copy.labHeadline}</h2>
            <p className="text-slate-500">{copy.labSub}</p>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={100} amount={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-xl border border-slate-200 bg-white shadow-sm mb-16 lg:mx-16 divide-y md:divide-y-0 md:divide-x divide-slate-200 overflow-hidden">
              {dbLabMetrics.map((mt: any, i: number) => (
                <div key={i} className="py-10 text-center hover:bg-violet-50 transition-colors">
                  <h4 className="text-4xl font-black text-[#7C3AED] mb-1">{mt.value}</h4>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">{mt.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="space-y-14">
            {dbLabSteps.map((st: any, idx: number) => {
              const isOdd = idx % 2 === 1;
              return (
                <div key={idx} className={`grid lg:grid-cols-2 gap-12 items-center ${isOdd ? "lg:[&>div:first-child]:order-last" : ""}`}>
                  <ScrollReveal variant={isOdd ? "right" : "left"} amount={0.2}>
                    <div className="rounded-2xl border border-slate-200 bg-[#FAFAFA] aspect-video flex flex-col items-center justify-center overflow-hidden shadow-md">
                      {st.image ? (
                        <img src={st.image} alt={st.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <Globe className="w-16 h-16 text-slate-200" />
                      )}
                    </div>
                  </ScrollReveal>
                  <ScrollReveal variant={isOdd ? "left" : "right"} amount={0.2}>
                    <div className={isOdd ? "lg:pr-8" : "lg:pl-8"}>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{st.title}</h3>
                      <p className="text-slate-500 leading-relaxed mb-5 text-sm">{st.desc}</p>
                      <Link href="/contact" className="text-sm font-bold text-[#7C3AED] hover:text-[#6D28D9] border-b border-[#7C3AED]/40 pb-0.5 transition-colors inline-flex items-center gap-1">
                        {st.linkText} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </SectionWrapper>
      </div>
      {/* ── INDUSTRIES ── */}
      <div className="section-light border-b border-slate-200">
        <SectionWrapper className="py-24">
          <ScrollReveal variant="up" className="text-center mb-12">
            <span className="eyebrow mb-4 block w-fit mx-auto">Verticals</span>
            <h2 className="text-4xl font-bold text-slate-900">{copy.industriesHeadline}</h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" stagger={0.06} delayMs={80}>
            {dbIndustries.map((ind: string, i: number) => {
              const Icon = industryIconMap[ind] ?? Globe;
              return (
                <StaggerItem key={i}>
                  <div className="h-32 rounded-xl border border-slate-200 bg-white flex flex-col items-center justify-center gap-3 p-4 hover:bg-[#7C3AED] hover:border-[#7C3AED] hover:shadow-lg hover:shadow-violet-100/60 transition-all duration-300 group cursor-default">
                    <Icon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                    <p className="text-slate-600 font-semibold group-hover:text-white text-center text-sm transition-colors duration-300 leading-tight">{ind}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </SectionWrapper>
      </div>

      {/* ── WHY US ── */}
      <div className="section-muted border-b border-slate-200">
        <SectionWrapper className="py-24" id="why-us">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="left" amount={0.2}>
              <span className="eyebrow mb-4 block w-fit">Why Us</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">{copy.whyHeadline}</h2>
              <div className="space-y-5 text-slate-500 leading-relaxed text-sm">
                <p>{copy.whyText1}</p>
                <p>{copy.whyText2}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right" amount={0.2}>
              <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="grid grid-cols-1 gap-4">
                  {whyFeatures.map((feat) => {
                    const Icon = feat.icon;
                    return (
                      <div key={feat.label} className="flex items-start gap-4 p-4 rounded-lg border border-slate-100 hover:border-violet-100 hover:bg-violet-50/30 transition-all duration-300 group">
                        <div className="w-9 h-9 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0 group-hover:bg-[#7C3AED] group-hover:border-[#7C3AED] transition-all duration-300">
                          <Icon className="w-4 h-4 text-[#7C3AED] group-hover:text-white transition-colors" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{feat.label}</p>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{feat.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </SectionWrapper>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div className="section-light border-b border-slate-200">
        <SectionWrapper className="py-24">
          <ScrollReveal variant="up" className="text-center mb-12">
            <span className="eyebrow mb-4 block w-fit mx-auto">Client Success</span>
            <h2 className="text-4xl font-bold text-slate-900">{copy.clientHeadline}</h2>
          </ScrollReveal>
          <ScrollReveal variant="scale" delay={100} amount={0.15}>
            <TestimonialSlider testimonials={dbTestimonials} />
          </ScrollReveal>
        </SectionWrapper>
      </div>

      {/* ── CONTACT FORM ── */}
      <div className="section-muted border-b border-slate-200">
        <SectionWrapper className="py-24">
          <ScrollReveal variant="up" amount={0.1}>
            <ContactForm />
          </ScrollReveal>
        </SectionWrapper>
      </div>

    </>
  );
}
