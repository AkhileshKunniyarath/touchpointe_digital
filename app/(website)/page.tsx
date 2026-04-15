import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code, Smartphone, Briefcase, Database, CloudUpload, Cpu, Shield, Globe, Award, Settings, Layers, Zap } from "lucide-react";

import { SectionWrapper } from "@/components/site/section-wrapper";
import { cn, slugify, toDisplayImageUrl } from "@/lib/utils";
import { TestimonialSlider } from "@/components/site/testimonial-slider";
import { ServicePicker } from "@/components/site/service-picker";
import { ContactForm } from "@/components/site/contact-form";
import { WorkflowTimeline } from "@/components/site/workflow-timeline";

import { connectToDatabase } from "@/lib/mongodb";
import Homepage from "@/models/Homepage";
import { getCollection } from "@/lib/resource-service";

export const revalidate = 0;

// ---- DEFAULT DATA ARRAYS ---- //
const defaultCopy = {
  heroTitle1: "We help local businesses",
  heroTitleGradient: "increase revenue",
  heroTitle3: "using AI-driven systems",
  heroBtnText: "Book Free Consultation",
  secondaryBtnText: "Get Growth Plan",
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
  { title: "UI / UX Design", desc: "Journey-first design systems for web and mobile products.", slug: "ui-ux-design" },
  { title: "Web Development", desc: "Scalable engineering for conversion and reliability.", slug: "web-development" },
  { title: "Mobile App Development", desc: "Native and cross-platform product delivery for iOS and Android.", slug: "mobile-app-development" },
  { title: "Platform Development", desc: "Enterprise-ready product platforms and portals.", slug: "platform-development" },
  { title: "Cloud Computing", desc: "Cloud modernization, DevOps, and managed operations.", slug: "cloud-computing" },
  { title: "AI and Machine Learning", desc: "Applied AI workflows for smarter business decisions.", slug: "ai-machine-learning" }
];

const statsFallback = [
  { label: "DEPLOYMENTS", value: "500+" },
  { label: "SYSTEM UPTIME", value: "99.9%" },
  { label: "GLOBAL SUPPORT", value: "24/7" },
  { label: "INDUSTRIES", value: "12" }
];

const workflowStepsFallback = [
  { id: "01", title: "Planning", desc: "Goal setting and resource allocation." },
  { id: "02", title: "Research", desc: "User behavior mapping." },
  { id: "03", title: "Design", desc: "Visual and UX architecture validation." },
  { id: "04", title: "Development", desc: "Code translation and iteration." },
  { id: "05", title: "Quality Assurance", desc: "Performance & security testing." },
  { id: "06", title: "Product Launch", desc: "Final deployment payload." }
];

const clientsFallback = ["SANJEEVANI AYURVEDIC HOSPITAL", "TECH ENTERPRISE", "GLOBEX CORPORATION", "STELLAR AI", "VISIONARY LABS", "NEXUS SYSTEMS", "OMEGA CLOUD", "QUANTUM DATA"];

const aiSolutionsFallback = [
  { title: "Computer Vision Models", desc: "Detect, analyze, and process visual data securely at scale.", color: "from-purple-600/20" },
  { title: "Generative LLM Wrappers", desc: "Proprietary conversational agents trained on your documentation.", color: "from-blue-600/20" },
  { title: "Predictive Analytics", desc: "Forecasting operational loads and automated inventory scaling.", color: "from-indigo-600/20" }
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
  { title: "1. Start & Validate", desc: "Helping visionary people with great ideas get their start. We run 3-week design sprints to establish product-market fit...", linkText: "Apply for validation" },
  { title: "2. Building a Product", desc: "Acting as your direct equity-partner Technical team. We construct highly distributed microservices...", linkText: "Review Engineering Stack" },
  { title: "3. Launch and Scale", desc: "Specifically engineered for scaling up your product pipeline globally. Handing over 99.9% uptime architectures...", linkText: "Coordinate Handover" }
];

const industriesFallback = ["Healthcare", "FinTech", "Retail & E-Commerce", "Logistics", "EdTech", "Real Estate", "Automotive", "SaaS"];

const testimonialsFallback = [
  { quote: "Touchpointe re-engineered our entire cloud infrastructure within 8 weeks. Unmatched fidelity.", author: "Sarah Jenkins", role: "CTO", company: "Stellar AI" },
  { quote: "The conversion lift we saw just from their frontend glassmorphism layout was roughly 43%.", author: "David Vance", role: "VP Growth", company: "Nexus Systems" }
];

// Mapping helper to avoid storing strict lucid react generic models in mongo
function getCapabilityIcon(index: number) {
  const icons = [Code, Smartphone, Briefcase, Database, Cpu, CloudUpload, Shield, Globe, Award, Settings, Layers, Zap];
  return icons[index % icons.length];
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
  } catch (error) {
    console.warn("Database Connection Unstable. Falling back to local native structures.");
  }

  let publishedServices: any[] = [];
  try {
    publishedServices = await getCollection("services", { status: "published" });
  } catch (error) {
    publishedServices = [];
  }

  // Real Database Fetching Mixed With DB Fallbacks
  const copy = { ...defaultCopy, ...(dbData?.copy || {}) };
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  const primaryCtaHref = calendlyUrl || "/contact";
  const primaryCtaIsExternal = Boolean(calendlyUrl && /^https?:\/\//i.test(calendlyUrl));
  
  const baseClients = dbData?.clients?.length ? dbData.clients : clientsFallback;
  const dbWorkflowSteps = dbData?.workflowSteps?.length ? dbData.workflowSteps : workflowStepsFallback;
  const dbAiSolutions = dbData?.aiSolutions?.length ? dbData.aiSolutions : aiSolutionsFallback;
  const dbIndustries = dbData?.industries?.length ? dbData.industries : industriesFallback;
  const dbTestimonials = dbData?.testimonials?.length ? dbData.testimonials : testimonialsFallback;
  
  const serviceSlugSet = new Set(publishedServices.map((service) => String(service.slug)));
  const preferredCapabilitySlugs = [
    "ui-ux-design",
    "web-development",
    "mobile-app-development",
    "platform-development",
    "cloud-computing",
    "ai-machine-learning"
  ];

  const serviceBySlug = new Map(publishedServices.map((service) => [String(service.slug), service] as const));
  const prioritizedServices = preferredCapabilitySlugs
    .map((slug) => serviceBySlug.get(slug))
    .filter(Boolean) as any[];
  const remainingServices = publishedServices.filter((service) => !preferredCapabilitySlugs.includes(String(service.slug)));

  const serviceDrivenCapabilities = [...prioritizedServices, ...remainingServices].map((service) => ({
    title: String(service.title || ""),
    desc: String(service.summary || ""),
    slug: String(service.slug || "")
  }));

  const capabilitySource = serviceDrivenCapabilities.length
    ? serviceDrivenCapabilities
    : dbData?.capabilities?.length
      ? dbData.capabilities
      : capabilitiesFallback;

  const normalizedCapabilities = capabilitySource.map((cap: any) => {
    const title = String(cap?.title || "").trim();
    const desc = String(cap?.desc || cap?.summary || "").trim();
    const candidateSlug = String(cap?.slug || slugify(title)).trim();

    return {
      title,
      desc,
      slug: serviceSlugSet.has(candidateSlug) ? candidateSlug : ""
    };
  }).filter((cap: any) => cap.title);
  const capabilityFromService = (slug: string) => {
    const service = serviceBySlug.get(slug);
    if (!service) {
      return null;
    }

    return {
      title: String(service.title || ""),
      desc: String(service.summary || ""),
      slug: String(service.slug || "")
    };
  };

  const withRequiredCapabilities = [...normalizedCapabilities];
  for (const slug of ["ui-ux-design", "web-development", "mobile-app-development"]) {
    if (withRequiredCapabilities.some((cap) => cap.slug === slug)) {
      continue;
    }

    const nextCapability = capabilityFromService(slug);
    if (nextCapability) {
      withRequiredCapabilities.unshift(nextCapability);
    }
  }

  const uniqueCapabilities = withRequiredCapabilities.reduce<Array<{ title: string; desc: string; slug: string }>>((acc, item) => {
    const key = item.slug || item.title.toLowerCase();
    if (!acc.some((entry) => (entry.slug || entry.title.toLowerCase()) === key)) {
      acc.push(item);
    }
    return acc;
  }, []);

  const dbCapabilities = uniqueCapabilities.length
    ? uniqueCapabilities
    : capabilitiesFallback
        .map((cap) => ({
          ...cap,
          slug: serviceSlugSet.has(cap.slug) ? cap.slug : ""
        }))
        .filter((cap) => cap.title);

  const dbStats = dbData?.stats?.length ? dbData.stats : statsFallback;
  const dbProducts = dbData?.productsList?.length ? dbData.productsList : productsListFallback;
  const dbLabMetrics = dbData?.labMetrics?.length ? dbData.labMetrics : labMetricsFallback;
  const dbLabSteps = dbData?.labSteps?.length ? dbData.labSteps : labStepsFallback;

  // Fetch 3 most recent published case studies for "Recent Work" section
  let recentWork: any[] = [];
  try {
    recentWork = await getCollection("case-studies", { status: "published", limit: 3 });
  } catch (e) {
    recentWork = [];
  }

  const dbClients = Array.from(
    new Set(
      [
        ...recentWork.map((item) => String(item?.client || "").trim().toUpperCase()),
        ...baseClients.map((client: any) => String(client || "").trim().toUpperCase())
      ].filter(Boolean)
    )
  );

  return (
    <>
      <div className="relative w-full pt-32 pb-24 overflow-hidden flex flex-col justify-center min-h-[90vh]">
        <SectionWrapper className="relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left flex flex-col items-start lg:pr-8">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.8rem] font-extrabold tracking-tight text-white leading-[1.05]">
                {copy.heroTitle1}<br/>
                <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent inline-block pb-2">
                  {copy.heroTitleGradient}
                </span><br/>
                {copy.heroTitle3}
              </h1>
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                 <Link href={primaryCtaHref} target={primaryCtaIsExternal ? "_blank" : undefined} rel={primaryCtaIsExternal ? "noopener noreferrer" : undefined} className={cn(
                    "inline-flex items-center justify-center rounded-full px-10 h-16 text-lg font-bold text-white w-full sm:w-auto",
                    "bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400",
                    "transition-transform scale-100 hover:scale-[1.02] shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                 )}>{copy.heroBtnText}</Link>
                 <Link href="#growth-plan" className={cn(
                    "inline-flex items-center justify-center rounded-full px-10 h-16 text-lg font-bold text-white w-full sm:w-auto",
                    "bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md",
                    "transition-all duration-300"
                 )}>{copy.secondaryBtnText || "Get Growth Plan"}</Link>
              </div>
            </div>

            <div className="relative w-full h-[500px] hidden lg:block">
               <div className="absolute left-[10%] top-10 w-[240px] h-[480px] rounded-[30px] border-[6px] border-slate-900 bg-slate-950 shadow-2xl rotate-[-10deg] opacity-70 blur-[1px]">
                  <div className="w-full h-full rounded-[24px] border border-white/5 opacity-40 bg-gradient-to-b from-blue-900/40 to-transparent p-4">
                    <div className="w-full h-6 rounded bg-white/10 mb-4" />
                    <div className="w-2/3 h-3 rounded bg-white/5 mb-6" />
                  </div>
               </div>
               <div className="absolute right-[5%] -top-10 w-[280px] h-[550px] rounded-[35px] border-[6px] border-slate-800 bg-slate-950 shadow-[0_0_60px_rgba(0,0,0,0.8)] rotate-[5deg] z-10">
                  <div className="w-full h-full rounded-[28px] border border-white/10 bg-gradient-to-b from-slate-900 flex flex-col items-center">
                     <div className="w-full h-[60%] bg-gradient-to-br from-blue-600/20 to-purple-600/10 rounded-t-[28px]" />
                     <div className="px-6 py-8 w-full"><div className="w-3/4 h-5 bg-white/20 rounded mb-4"/><div className="w-1/2 h-5 bg-white/20 rounded"/></div>
                  </div>
               </div>
            </div>
          </div>
        </SectionWrapper>
      </div>

      <div className="w-full bg-[#050505] border-y border-white/5 relative z-20">
         <SectionWrapper className="py-20">
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
               <div>
                  <p className="text-xl md:text-3xl font-extrabold text-white leading-snug" dangerouslySetInnerHTML={{__html: copy.credibilityHeadline.replace('Touchpointe', '<span class="text-blue-500">Touchpointe</span>')}} />
                  <p className="mt-4 text-slate-400 text-sm leading-relaxed">{copy.credibilitySub}</p>
               </div>
               <div className="grid grid-cols-2 gap-8 lg:gap-12 text-center md:text-left">
                 {dbStats.map((st: any, i: number) => (
                   <div key={i}>
                      <h4 className="text-5xl font-black text-white mb-2">{st.value.replace(/[^0-9.]/g, '')}<span className="text-blue-500">{st.value.replace(/[0-9.]/g, '')}</span></h4>
                      <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">{st.label}</p>
                   </div>
                 ))}
               </div>
            </div>
         </SectionWrapper>
      </div>

      <div className="w-full overflow-hidden bg-slate-950/30 border-b border-white/5 py-12 flex relative">
         <div className="flex animate-marquee whitespace-nowrap min-w-full hover:paused">
            {[...dbClients, ...dbClients, ...dbClients].map((client: string, idx: number) => (
              <span key={idx} className="mx-16 text-2xl font-black text-white/10 hover:text-white transition-colors duration-500 cursor-default">
                 {client}
              </span>
            ))}
         </div>
      </div>

      <SectionWrapper className="py-24">
        <div className="mb-16">
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{copy.capabilitiesHeadline}</h2>
           <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">{copy.capabilitiesSub}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dbCapabilities.map((cap: any, i: number) => {
            const Icon = getCapabilityIcon(i);
            const href = cap.slug ? `/services/${cap.slug}` : "/services";
            return (
              <Link key={i} href={href} className="surface relative p-10 flex flex-col h-full group hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(59,130,246,0.1)] transition-all duration-300 rounded-3xl cursor-pointer">
                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-all">
                   <Icon className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">{cap.title}</h3>
                <p className="text-sm text-[#A1A1AA] flex-1 mb-8 leading-relaxed">{cap.desc}</p>
                <span className="inline-flex items-center text-xs font-bold text-white tracking-widest mt-auto opacity-50 group-hover:opacity-100 group-hover:text-blue-400 transition-all">
                  LEARN MORE <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-24 overflow-hidden relative">
         <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-center">
            <div className="relative z-10">
               <p className="text-sky-400 uppercase tracking-widest text-sm font-semibold mb-4">{copy.intelligenceEyebrow}</p>
               <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">{copy.intelligenceHeadline}</h2>
               <p className="text-[#A1A1AA] text-lg leading-relaxed mb-8">{copy.intelligenceSub}</p>
            </div>
            <div className="grid gap-6">
               {dbAiSolutions.map((sol: any, idx: number) => (
                 <div key={idx} className={`surface-strong p-8 flex items-start gap-6 border-l-4 border-l-transparent hover:border-l-purple-500 transition-all rounded-2xl bg-gradient-to-r ${sol.color} to-transparent`}>
                    <Zap className="w-8 h-8 text-white shrink-0 mt-1" />
                    <div>
                       <h4 className="text-xl font-bold text-white mb-2">{sol.title}</h4>
                       <p className="text-slate-400 text-sm leading-relaxed">{sol.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </SectionWrapper>

      <div className="border-y border-white/5 bg-slate-950/50 relative">
        <SectionWrapper className="py-24">
            <div className="text-center mb-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{copy.exploreHeadline}</h2>
            </div>
            <ServicePicker />
        </SectionWrapper>
      </div>

      {/* ── Recent Work Section ─────────────────────────────── */}
      <div className="w-full relative bg-[#040404] border-y border-white/5">
        <SectionWrapper className="py-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-4">Our Work</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">Recent Projects</h2>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors shrink-0 group"
            >
              View all case studies
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {recentWork.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentWork.map((item: any, i: number) => (
                <Link
                  key={item._id || i}
                  href={`/case-studies/${item.slug}`}
                  className="group surface relative overflow-hidden flex flex-col hover:border-blue-500/40 transition-all duration-500 rounded-3xl"
                >
                  {/* Gradient top bar */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Cover image or gradient placeholder */}
                  <div className="relative w-full h-52 overflow-hidden rounded-t-3xl bg-gradient-to-br from-slate-800 to-slate-900">
                    {item.coverImage ? (
                      <Image
                        src={toDisplayImageUrl(item.coverImage)}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-900 to-indigo-900/30 flex items-center justify-center">
                        <span className="text-7xl font-black text-white/5 select-none">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-300 bg-blue-500/20 border border-blue-500/30 px-3 py-1 rounded-full">
                        {item.category || "Case Study"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed flex-1 line-clamp-3">
                      {item.summary}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                      Read case study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center surface p-16 rounded-3xl border-dashed">
              <p className="text-slate-500 font-semibold">Case studies will appear here once published from the CMS.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 mt-4 text-blue-400 text-sm font-medium hover:text-white transition-colors">
                Discuss your project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </SectionWrapper>
      </div>

      <div className="w-full relative bg-gradient-to-b from-[#030303] to-[#050505]">
        <SectionWrapper className="py-32">
          <div className="mb-24 text-center">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-500 mb-4 inline-flex items-center gap-2 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> {copy.processEyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white relative inline-block tracking-tight">
               {copy.processHeadline}
               <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </h2>
          </div>

          <WorkflowTimeline steps={dbWorkflowSteps} />
        </SectionWrapper>
      </div>

      <SectionWrapper className="py-24 border-t border-white/5">
        <div className="text-center mb-16 max-w-2xl mx-auto">
           <Badge className="bg-indigo-500/20 text-indigo-300 pointer-events-none mb-4">{copy.labBadge}</Badge>
           <h2 className="text-4xl font-bold text-white mb-6">{copy.labHeadline}</h2>
           <p className="text-[#A1A1AA] text-lg">{copy.labSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/5 surface py-8 mb-20 lg:mx-16 rounded-3xl">
          {dbLabMetrics.map((mt: any, i: number) => (
             <div key={i} className="pt-4 md:pt-0"><h4 className="text-4xl font-black text-indigo-400 mb-2">{mt.value}</h4><p className="text-xs uppercase tracking-[0.2em] text-slate-400">{mt.label}</p></div>
          ))}
        </div>

        <div className="space-y-16">
           {dbLabSteps.map((st: any, idx: number) => {
              const Icon = getLabIcon(idx);
              const colorMaps = [
                "from-indigo-900/30 to-purple-900/10 border-indigo-500/20 text-indigo-500/50 hover:text-white shadow-[inset_0_0_80px_rgba(79,70,229,0.1)]",
                "from-blue-900/30 to-[#030303] border-blue-500/20 text-blue-500/50 hover:text-white shadow-[inset_0_0_80px_rgba(59,130,246,0.1)]",
                "from-purple-900/30 to-violet-900/10 border-purple-500/20 text-purple-500/50 hover:text-white shadow-[inset_0_0_80px_rgba(168,85,247,0.1)]",
              ];
              const mapClass = colorMaps[idx % colorMaps.length];

              return (
                 <div key={idx} className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:[&>div:first-child]:order-last' : ''}`}>
                    <div className={`bg-gradient-to-br transition-all duration-700 rounded-[32px] aspect-video border flex flex-col items-center justify-center relative overflow-hidden ${mapClass}`}>
                       <Icon className="w-20 h-20 transition-all duration-500" />
                    </div>
                    <div className={`${idx % 2 === 1 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                       <h3 className="text-3xl font-bold text-white mb-4">{st.title}</h3>
                       <p className="text-slate-400 leading-relaxed text-lg mb-6">{st.desc}</p>
                       <Link href="/contact" className="text-indigo-400 font-semibold border-b border-indigo-500/50 hover:text-white pb-1 transition-colors">{st.linkText}</Link>
                    </div>
                 </div>
              );
           })}
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-24 border-t border-white/5">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{copy.productsHeadline}</h2>
          <p className="text-slate-400">{copy.productsSub}</p>
        </div>
        <div className="grid gap-20">
           {dbProducts.map((prod: any, idx: number) => (
             <div key={idx} className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:[&>div:first-child]:order-last' : ''}`}>
               <div className="aspect-[4/3] rounded-[32px] surface-strong p-2 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                 <div className="w-full h-full rounded-[24px] border border-white/5 bg-slate-900 overflow-hidden relative">
                    <div className="absolute top-0 w-full h-10 border-b border-white/5 bg-white/5 px-4 flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-400"/><div className="w-2.5 h-2.5 rounded-full bg-amber-400"/><div className="w-2.5 h-2.5 rounded-full bg-green-400"/></div>
                    <div className="w-full h-full pt-16 px-6"><div className="w-full h-full bg-white/5 rounded-t-xl border-x border-t border-white/10" /></div>
                 </div>
               </div>
               <div>
                 <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4 block">{prod.tagline}</span>
                 <h3 className="text-4xl font-bold text-white mb-6">{prod.title}</h3>
                 <p className="text-[#A1A1AA] text-lg leading-relaxed mb-8">{prod.desc}</p>
                 <Link href={`/products`} className="text-white border-b border-blue-500 pb-1 hover:text-blue-400 font-medium">View detailed spec</Link>
               </div>
             </div>
           ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-24 border-t border-white/5 bg-slate-950/20">
         <h2 className="text-4xl font-bold text-white mb-16 text-center">{copy.industriesHeadline}</h2>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {dbIndustries.map((ind: string, i: number) => (
               <div key={i} className="h-32 rounded-2xl border border-white/5 bg-[#030303] flex items-center justify-center p-4 hover:bg-blue-600 transition-colors group cursor-default">
                  <p className="text-white/60 font-semibold group-hover:text-white text-center">{ind}</p>
               </div>
            ))}
         </div>
      </SectionWrapper>

      <SectionWrapper className="py-24 overflow-hidden relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-10">{copy.whyHeadline}</h2>
            <div className="space-y-8 text-lg text-[#A1A1AA] leading-relaxed">
              <p>{copy.whyText1}</p>
              <p>{copy.whyText2}</p>
            </div>
          </div>
          <div className="relative h-full flex items-center justify-center opacity-[0.03] pointer-events-none">
             <div className="w-[400px] h-[400px] rounded-full border-[50px] border-white border-r-transparent rotate-45 scale-125" />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">{copy.clientHeadline}</h2>
        </div>
        <TestimonialSlider testimonials={dbTestimonials} />
      </SectionWrapper>

      <div className="w-full bg-[#050505] border-y border-white/10 relative z-20 py-24">
        <SectionWrapper>
          <ContactForm />
        </SectionWrapper>
      </div>

      <SectionWrapper className="py-32 items-center flex flex-col justify-center text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 max-w-2xl mx-auto leading-tight">
          {copy.ctaHeadline}
        </h2>
        <Link href="/contact" className="inline-flex items-center justify-center rounded-full px-12 h-16 text-lg font-bold text-white border-2 border-white hover:bg-white hover:text-black transition-all">
           {copy.ctaBtn}
        </Link>
      </SectionWrapper>
    </>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider", className)}>{children}</span>
}
