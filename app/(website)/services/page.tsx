import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, Code2, Globe, Smartphone, CloudCog, Bot, ShieldCheck, 
  Rocket, Briefcase, Building, ShoppingCart, Workflow, CheckCircle2, Factory
} from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { resourceConfigs } from "@/lib/resource-config";

export const metadata: Metadata = {
  title: "Services | Touchpointe",
  description: "Comprehensive software development and digital engineering services.",
};

export default function ServicesPage() {
  const config = resourceConfigs.services;

  return (
    <>
      {/* ── HERO ── */}
      <div className="relative w-full py-32 flex flex-col justify-center items-center text-center overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
          <ScrollReveal variant="up" className="flex flex-col items-center pt-16">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.05]">
              Digital Engineering &amp; Growth Solutions
            </h1>
            <p className="text-slate-500 max-w-2xl text-lg md:text-xl leading-relaxed mb-10 mx-auto">
              From internal tools and enterprise CRMs to end-to-end SaaS products. We engineer scalable systems that power modern businesses.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#7C3AED] text-white rounded-lg text-base font-semibold hover:bg-[#6D28D9] transition-colors shadow-sm">
                Discuss Your Project <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ── CORE SERVICES ── */}
      <div className="bg-[#FAFAFA] py-24 border-b border-slate-200">
        <SectionWrapper>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal variant="up">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Core Services</h2>
              <p className="text-lg text-slate-500">Robust, scalable, and high-performance solutions engineered for the long term.</p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1 */}
            <ScrollReveal variant="up" delay={0} className="col-span-1 md:col-span-2 lg:col-span-2">
              <div className="h-full bg-slate-900 rounded-2xl p-8 sm:p-10 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7C3AED]/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#7C3AED]/30 transition-colors duration-700" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/20 flex items-center justify-center text-[#A78BFA] mb-6">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Custom Software Development</h3>
                  <div className="space-y-3 mb-8 flex-grow">
                    <p className="text-slate-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#A78BFA]" /> Web applications (SaaS, dashboards, admin panels)</p>
                    <p className="text-slate-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#A78BFA]" /> Enterprise systems (ERP, CRM)</p>
                    <p className="text-slate-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#A78BFA]" /> Internal workflow tools</p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#A78BFA] uppercase tracking-wider">
                    Our Flagship Offering
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* 4 */}
            <ScrollReveal variant="up" delay={100}>
              <div className="h-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">SaaS Product Development</h3>
                <div className="space-y-3 mb-6 flex-grow">
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> End-to-end SaaS building</p>
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> Subscription systems</p>
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> Multi-tenant architecture</p>
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> Scaling & performance optimization</p>
                </div>
              </div>
            </ScrollReveal>

            {/* 2 */}
            <ScrollReveal variant="up" delay={150}>
              <div className="h-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Web Development</h3>
                <div className="space-y-3 mb-6 flex-grow">
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" /> Business websites</p>
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" /> E-commerce platforms</p>
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" /> Progressive Web Apps (PWA)</p>
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" /> High-converting landing pages</p>
                </div>
              </div>
            </ScrollReveal>

            {/* 3 */}
            <ScrollReveal variant="up" delay={200}>
              <div className="h-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Mobile App Development</h3>
                <div className="space-y-3 mb-6 flex-grow">
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Android native applications</p>
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> iOS native applications</p>
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Cross-platform (React Native/Flutter)</p>
                </div>
              </div>
            </ScrollReveal>

            {/* 5 */}
            <ScrollReveal variant="up" delay={250}>
              <div className="h-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600 mb-6">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">AI & Automation Solutions</h3>
                <div className="space-y-3 mb-6 flex-grow">
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" /> AI chatbots & AI assistants</p>
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" /> Workflow automation arrays</p>
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" /> Integrations (OpenAI, Claude, Gemini)</p>
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" /> Advanced data analysis tools</p>
                </div>
              </div>
            </ScrollReveal>

            {/* 6 */}
            <ScrollReveal variant="up" delay={300}>
              <div className="h-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 mb-6">
                  <CloudCog className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Cloud & DevOps</h3>
                <div className="space-y-3 mb-6 flex-grow">
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" /> VPS setup (Coolify, Docker, CI/CD)</p>
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" /> Cloud deployments (AWS, DigitalOcean)</p>
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" /> Server optimization</p>
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" /> Active monitoring & uptime assurance</p>
                </div>
              </div>
            </ScrollReveal>

            {/* 7 */}
            <ScrollReveal variant="up" delay={350}>
              <div className="h-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Cybersecurity & Maintenance</h3>
                <div className="space-y-3 mb-6 flex-grow">
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" /> Security infrastructure audits</p>
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" /> Deep bug fixing & performance tuning</p>
                  <p className="text-slate-600 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" /> Ongoing support & architecture maintenance</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </SectionWrapper>
      </div>

      {/* ── SPECIALIZED SOLUTIONS ── */}
      <div className="bg-white py-24 border-b border-slate-200">
        <SectionWrapper>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal variant="up">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 mb-5 tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                Where we stand out
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Specialized Solutions</h2>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal variant="up" delay={0}>
              <div className="p-8 border border-slate-200 rounded-2xl bg-[#FAFAFA] hover:bg-white hover:border-[#7C3AED]/30 transition-colors h-full flex flex-col">
                <Building className="w-8 h-8 text-[#7C3AED] mb-5" />
                <h3 className="text-xl font-bold text-slate-900 mb-4">Hospitality Tech</h3>
                <ul className="space-y-3 flex-grow mb-6">
                  <li className="text-slate-600 text-sm border-b border-slate-200 pb-2 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED]"/> Hotel management systems</li>
                  <li className="text-slate-600 text-sm border-b border-slate-200 pb-2 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED]"/> RFID check-in automation</li>
                  <li className="text-slate-600 text-sm flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED]"/> Room automation dashboards</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={100}>
              <div className="p-8 border border-slate-200 rounded-2xl bg-[#FAFAFA] hover:bg-white hover:border-[#7C3AED]/30 transition-colors h-full flex flex-col">
                <Workflow className="w-8 h-8 text-[#7C3AED] mb-5" />
                <h3 className="text-xl font-bold text-slate-900 mb-4">Business Automation</h3>
                <ul className="space-y-3 flex-grow mb-6">
                  <li className="text-slate-600 text-sm border-b border-slate-200 pb-2 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED]"/> Billing systems</li>
                  <li className="text-slate-600 text-sm border-b border-slate-200 pb-2 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED]"/> Inventory management</li>
                  <li className="text-slate-600 text-sm border-b border-slate-200 pb-2 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED]"/> CRM dashboards</li>
                  <li className="text-slate-600 text-sm flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED]"/> Internal workflow tools</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={200}>
               <div className="p-8 border border-slate-200 rounded-2xl bg-[#FAFAFA] hover:bg-white hover:border-[#7C3AED]/30 transition-colors h-full flex flex-col">
                <ShoppingCart className="w-8 h-8 text-[#7C3AED] mb-5" />
                <h3 className="text-xl font-bold text-slate-900 mb-4">E-commerce Solutions</h3>
                <ul className="space-y-3 flex-grow mb-6">
                  <li className="text-slate-600 text-sm border-b border-slate-200 pb-2 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED]"/> Custom stores</li>
                  <li className="text-slate-600 text-sm border-b border-slate-200 pb-2 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED]"/> Payment integration</li>
                  <li className="text-slate-600 text-sm flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED]"/> Order & logistics systems</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </SectionWrapper>
      </div>

      {/* ── PREMIUM SERVICES ── */}
      <div className="bg-[#111827] py-32 text-white">
        <SectionWrapper>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="up">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-slate-300 mb-6 tracking-wide uppercase">
                Premium Engagement
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-[1.1]">Product Development Partnership</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                We act as your technical co-founder. From initial idea mapping through MVP deployment to scaling up globally, we provide long-term product building expertise for high-impact ventures.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="text-[#a78bfa] w-5 h-5"/> Idea → MVP → Scale lifecycle</li>
                <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="text-[#a78bfa] w-5 h-5"/> Technical co-founder support</li>
                <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="text-[#a78bfa] w-5 h-5"/> Long-term strategic building</li>
              </ul>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-lg text-base font-semibold hover:bg-slate-100 transition-colors shadow-sm">
                Discuss Partnership
              </Link>
            </ScrollReveal>
            <ScrollReveal variant="up" delay={200} className="hidden lg:block relative">
               <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-blue-600 blur-[80px] opacity-20 rounded-full" />
               <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-xl">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700">
                      <div className="text-3xl font-bold mb-2">01</div>
                      <div className="text-slate-400 text-sm font-medium">Discovery & Blueprinting</div>
                    </div>
                    <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700">
                      <div className="text-3xl font-bold mb-2">02</div>
                      <div className="text-slate-400 text-sm font-medium">Sprint Prototyping</div>
                    </div>
                    <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700">
                      <div className="text-3xl font-bold mb-2">03</div>
                      <div className="text-slate-400 text-sm font-medium">Core Engineering</div>
                    </div>
                    <div className="bg-[#7C3AED]/20 p-6 rounded-xl border border-[#7C3AED]/50 text-white shadow-[0_0_20px_rgba(124,58,237,0.15)]">
                      <div className="text-3xl font-bold mb-2">04</div>
                      <div className="text-[#A78BFA] text-sm font-medium">Scale & Iterate</div>
                    </div>
                 </div>
               </div>
            </ScrollReveal>
          </div>
        </SectionWrapper>
      </div>

      {/* ── BONUS SECTIONS ── */}
      <div className="bg-[#FAFAFA] py-24">
        <SectionWrapper>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Industries */}
             <ScrollReveal variant="up" delay={0}>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Factory className="w-5 h-5 text-[#7C3AED]" /> Industries We Serve
              </h3>
              <div className="flex flex-col gap-3">
                <div className="px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium text-sm hover:border-[#7C3AED] transition-colors">Startups & High-Growth Ventures</div>
                <div className="px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium text-sm hover:border-[#7C3AED] transition-colors">Hotels & Hospitality</div>
                <div className="px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium text-sm hover:border-[#7C3AED] transition-colors">Healthcare & Medical Tech</div>
                <div className="px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium text-sm hover:border-[#7C3AED] transition-colors">E-commerce Brands</div>
                <div className="px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium text-sm hover:border-[#7C3AED] transition-colors">Enterprise Level Businesses</div>
              </div>
            </ScrollReveal>

            {/* Tech Stack */}
            <ScrollReveal variant="up" delay={100}>
               <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#7C3AED]" /> Technologies We Use
              </h3>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col gap-5 h-[calc(100%-3rem)]">
                 <div className="space-y-1.5">
                   <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Core Strength</h4>
                   <p className="text-sm text-slate-800 font-semibold bg-slate-50 border border-slate-100 py-2.5 px-3 rounded-md">.NET, React, PostgreSQL</p>
                 </div>
                 <div className="space-y-1.5">
                   <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Frameworks & Languages</h4>
                   <p className="text-sm text-slate-800 font-semibold bg-slate-50 border border-slate-100 py-2.5 px-3 rounded-md">Node.js, Python, Next.js</p>
                 </div>
                 <div className="space-y-1.5">
                   <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">DevOps & Cloud</h4>
                   <p className="text-sm text-slate-800 font-semibold bg-slate-50 border border-slate-100 py-2.5 px-3 rounded-md">Docker, Coolify, AWS Core</p>
                 </div>
              </div>
            </ScrollReveal>

            {/* Why Choose Us */}
            <ScrollReveal variant="up" delay={200}>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#7C3AED]" /> Why Choose Us
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-violet-50 text-[#7C3AED] flex items-center justify-center shrink-0 border border-violet-100 mt-0.5"><CheckCircle2 className="w-4 h-4"/></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">In-house Product Builders</h4>
                    <p className="text-sm text-slate-500 mt-1">We don't ship out to third-parties. Direct collaboration and top-tier code quality.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-violet-50 text-[#7C3AED] flex items-center justify-center shrink-0 border border-violet-100 mt-0.5"><CheckCircle2 className="w-4 h-4"/></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Scalable Architecture</h4>
                    <p className="text-sm text-slate-500 mt-1">Every system is engineered to scale from day one, preparing you for growth.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-violet-50 text-[#7C3AED] flex items-center justify-center shrink-0 border border-violet-100 mt-0.5"><CheckCircle2 className="w-4 h-4"/></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Real Business Solutions</h4>
                    <p className="text-sm text-slate-500 mt-1">We focus on business metrics, not just code. Products that drive revenue.</p>
                  </div>
                </li>
              </ul>
            </ScrollReveal>

          </div>
        </SectionWrapper>
      </div>
    </>
  );
}
