import Link from "next/link";
import { ArrowRight, Code, Smartphone, Briefcase, Database, CloudUpload, Cpu, Shield, Globe, Award, Settings, Layers, Zap } from "lucide-react";

import { SectionWrapper } from "@/components/site/section-wrapper";
import { cn } from "@/lib/utils";
import { TestimonialSlider } from "@/components/site/testimonial-slider";
import { ServicePicker } from "@/components/site/service-picker";
import { ContactForm } from "@/components/site/contact-form";

import { connectToDatabase } from "@/lib/mongodb";
import Homepage from "@/models/Homepage";
import { getCollection } from "@/lib/resource-service";

export const revalidate = 60;

// ---- DEFAULT DATA ARRAYS ---- //
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

const capabilitiesFallback = [
  { title: "Web Development", desc: "Enterprise grade runtimes." },
  { title: "Mobile App Development", desc: "Native iOS and Android." },
  { title: "Saas Products", desc: "MVP to scalable platforms." },
  { title: "Data Intelligence", desc: "Predictive BI insights." },
  { title: "Automation", desc: "Agent loops and workflows." },
  { title: "Enterprise Platforms", desc: "Secure vast operations." }
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

const clientsFallback = ["TECH ENTERPRISE", "GLOBEX CORPORATION", "STELLAR AI", "VISIONARY LABS", "NEXUS SYSTEMS", "OMEGA CLOUD", "QUANTUM DATA"];

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

  // Real Database Fetching Mixed With DB Fallbacks
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
              <div className="mt-12">
                 <Link href="/contact" className={cn(
                    "inline-flex items-center justify-center rounded-full px-10 h-16 text-lg font-bold text-white",
                    "bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400",
                    "transition-transform scale-100 hover:scale-[1.02] shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                 )}>{copy.heroBtnText}</Link>
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
            return (
              <div key={i} className="surface relative p-10 flex flex-col h-full group hover:border-blue-500/30 transition-all rounded-3xl">
                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                   <Icon className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">{cap.title}</h3>
                <p className="text-sm text-[#A1A1AA] flex-1 mb-8 leading-relaxed">{cap.desc}</p>
                <span className="inline-flex items-center text-xs font-bold text-white tracking-widest mt-auto opacity-50 group-hover:opacity-100 group-hover:text-blue-400">LEARN MORE <ArrowRight className="ml-2 w-3 h-3" /></span>
              </div>
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

          <div className="relative max-w-6xl mx-auto">
             <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent md:-translate-x-1/2 z-0" />
             <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px border-l border-dashed border-white/20 md:-translate-x-1/2 z-0" />

             <div className="grid gap-12 md:gap-20 relative z-10">
                {dbWorkflowSteps.map((step: any, idx: number) => {
                   const isEven = idx % 2 === 0;
                   return (
                     <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-8 ${isEven ? 'md:flex-row-reverse' : ''} group`}>
                       <div className="absolute left-[26px] md:left-1/2 mt-1 md:mt-0 top-8 md:top-1/2 md:-translate-y-1/2 md:-translate-x-[50%] w-4 h-4 rounded-full bg-[#030303] border-2 border-slate-600 transition-all duration-500 group-hover:scale-150 group-hover:bg-blue-500 group-hover:border-white z-20" />
                       <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 md:text-right flex md:justify-end' : 'md:pl-16 text-left flex md:justify-start'}`}>
                          <div className={`surface relative z-10 w-full max-w-md p-10 lg:p-12 transition-all duration-[600ms] border-white/5 
                                          group-hover:border-blue-500/40 group-hover:bg-gradient-to-br group-hover:from-blue-900/20 group-hover:to-[#030303] 
                                          overflow-hidden ${isEven ? 'group-hover:-translate-x-4 md:rounded-r-none border-r-4 border-r-transparent group-hover:border-r-blue-500 rounded-[2rem]' : 'group-hover:translate-x-4 md:rounded-l-none border-l-4 border-l-transparent group-hover:border-l-blue-500 rounded-[2rem]'}`}>
                             <span className={`absolute -top-10 ${isEven ? 'left-4' : 'right-4'} text-[10rem] font-black text-white/[0.02] select-none pointer-events-none group-hover:text-blue-500/[0.05] transition-colors duration-700 leading-none`}>{step.id || String(idx + 1).padStart(2, '0')}</span>
                             <h3 className="text-3xl font-extrabold text-white mb-4 relative z-20">{step.title}</h3>
                             <p className="text-slate-400 text-lg leading-relaxed relative z-20">{step.desc}</p>
                          </div>
                       </div>
                       <div className="hidden md:block w-1/2" />
                     </div>
                   );
                })}
             </div>
          </div>
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
