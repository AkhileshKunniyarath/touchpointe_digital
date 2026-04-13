import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Layers, Cpu, Shield } from "lucide-react";
import type { Metadata } from "next";

import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/site/scroll-reveal";
import { TestimonialSlider } from "@/components/site/testimonial-slider";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { connectToDatabase } from "@/lib/mongodb";
import { getCollection } from "@/lib/resource-service";
import Homepage from "@/models/Homepage";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name} — a digital engineering agency building scalable systems, products, and intelligent automation for modern brands.`,
};

const defaultStats = [
  { label: "Clients Served", value: "200+" },
  { label: "Deployments", value: "500+" },
  { label: "System Uptime", value: "99.9%" },
  { label: "Global Support", value: "24/7" },
];

const defaultTestimonials = [
  { quote: "Touchpointe re-engineered our entire cloud infrastructure within 8 weeks. Unmatched fidelity.", author: "Sarah Jenkins", role: "CTO", company: "Stellar AI" },
  { quote: "The conversion lift we saw just from their frontend layout was roughly 43%.", author: "David Vance", role: "VP Growth", company: "Nexus Systems" },
];

const values = [
  { icon: Zap, title: "Speed without chaos", desc: "We move fast by removing ambiguity early — clear scope, clear ownership, no scrambles at launch." },
  { icon: Layers, title: "Systems over pages", desc: "Every build creates a reusable, extensible layer. Nothing we ship is a one-time shortcut." },
  { icon: Cpu, title: "Intelligence by default", desc: "AI isn't a feature we bolt on — it's a design constraint we reason about from day one." },
  { icon: Shield, title: "Trust through transparency", desc: "We share what we know, flag what we see, and never hide behind technical jargon." },
];

export default async function AboutPage() {
  let dbStats = defaultStats;
  let dbTestimonials = defaultTestimonials;

  try {
    await connectToDatabase();
    const hp = await Homepage.findOne({}).lean() as any;
    if (hp?.stats?.length) dbStats = hp.stats;
    if (hp?.testimonials?.length) dbTestimonials = hp.testimonials;
  } catch { /* use defaults */ }

  const [services, caseStudies] = await Promise.all([
    getCollection("services", { status: "published" }),
    getCollection("case-studies", { status: "published", limit: 3 }),
  ]);

  return (
    <>
      {/* ── HERO ── */}
      <div className="relative w-full pt-32 pb-20 flex flex-col justify-center items-center text-center overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white" />

        <SectionWrapper className="relative z-10 flex flex-col items-center w-full">
          <div className="max-w-4xl mx-auto flex flex-col items-center pt-8">


            <ScrollReveal variant="up" delay={80}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-6">
                We engineer systems that{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-blue-500">
                  compound over time.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={160}>
              <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed mb-12">
                Touchpointe is a digital engineering agency building scalable software, intelligent automation, and growth-ready products for modern brands.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={220}>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-lg text-base font-semibold hover:bg-slate-800 transition-colors shadow-sm">
                  Work with us <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/case-studies" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-lg text-base font-semibold hover:bg-slate-50 transition-colors shadow-sm">
                  See our work
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="up" delay={300} className="w-full max-w-5xl mx-auto mt-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {dbStats.map((stat: any, i: number) => (
                <div key={i} className="flex flex-col items-center justify-center border border-slate-100 bg-white shadow-sm rounded-xl py-8">
                  <p className="text-3xl font-black text-slate-800 mb-2">{stat.value}</p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </SectionWrapper>
      </div>

      {/* ── MISSION ── */}
      <div className="bg-[#FAFAFA] border-b border-slate-200">
        <SectionWrapper className="py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="left" amount={0.2}>
              <span className="eyebrow mb-4 block w-fit">Our Philosophy</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Quality and strategy must be intimately intertwined.
              </h2>
              <div className="space-y-4 text-slate-500 text-sm leading-relaxed">
                <p>
                  We don&apos;t separate design from engineering, or strategy from execution. Every deliverable we ship is designed, built, and measured as a single coherent system.
                </p>
                <p>
                  This means your frontend and backend are architected together. Your content operations and design systems reinforce each other. Your analytics feed back into your messaging.
                </p>
                <p>
                  The result is a digital presence that compounds — getting sharper, faster, and more effective with every iteration.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right" amount={0.2}>
              <div className="grid gap-4">
                {values.map((v) => {
                  const Icon = v.icon;
                  return (
                    <div key={v.title} className="flex items-start gap-4 p-5 rounded-xl border border-slate-200 bg-white hover:border-violet-100 hover:shadow-sm transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0 group-hover:bg-[#7C3AED] group-hover:border-[#7C3AED] transition-all">
                        <Icon className="w-4 h-4 text-[#7C3AED] group-hover:text-white transition-colors" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 mb-0.5">{v.title}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </SectionWrapper>
      </div>

      {/* ── SERVICES WE OFFER ── */}
      {services.length > 0 && (
        <div className="bg-white border-b border-slate-200">
          <SectionWrapper className="py-24">
            <ScrollReveal variant="up" className="text-center mb-14 max-w-2xl mx-auto">
              <span className="eyebrow mb-4 block w-fit mx-auto">What We Deliver</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Services built for clarity and speed.</h2>
              <p className="text-slate-500 leading-relaxed">
                Every engagement starts with a clear objective and ends with a system that keeps working after handoff.
              </p>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.07}>
              {services.map((svc: any) => (
                <StaggerItem key={svc._id || svc.slug}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="group block rounded-xl border border-slate-200 bg-white p-7 hover:border-violet-200 hover:shadow-md hover:shadow-violet-50/50 transition-all h-full"
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-[#7C3AED] mb-3">{svc.category}</p>
                    <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-[#7C3AED] transition-colors">{svc.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{svc.summary}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#7C3AED] mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      View details <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </SectionWrapper>
        </div>
      )}

      {/* ── CASE STUDIES ── */}
      {caseStudies.length > 0 && (
        <div className="bg-[#FAFAFA] border-b border-slate-200">
          <SectionWrapper className="py-24">
            <ScrollReveal variant="up" className="mb-14">
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <span className="eyebrow mb-4 block w-fit">Proof of Work</span>
                  <h2 className="text-4xl font-bold text-slate-900">Client outcomes that speak.</h2>
                </div>
                <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors">
                  All case studies <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
              {caseStudies.map((cs: any) => (
                <StaggerItem key={cs._id || cs.slug}>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="group block rounded-xl border border-slate-200 bg-white p-7 hover:border-violet-200 hover:shadow-md transition-all h-full"
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">{cs.sector || cs.category}</p>
                    <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-[#7C3AED] transition-colors leading-snug">{cs.title}</h3>
                    {cs.results?.length > 0 && (
                      <ul className="mt-4 space-y-1.5">
                        {cs.results.slice(0, 2).map((r: string) => (
                          <li key={r} className="flex items-center gap-2 text-xs text-slate-500">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </SectionWrapper>
        </div>
      )}

      {/* ── TESTIMONIALS ── */}
      <div className="bg-white border-b border-slate-200">
        <SectionWrapper className="py-24">
          <ScrollReveal variant="up" className="text-center mb-12">
            <span className="eyebrow mb-4 block w-fit mx-auto">What Clients Say</span>
            <h2 className="text-4xl font-bold text-slate-900">Real feedback from real partnerships.</h2>
          </ScrollReveal>
          <ScrollReveal variant="scale" delay={100} amount={0.15}>
            <TestimonialSlider testimonials={dbTestimonials} />
          </ScrollReveal>
        </SectionWrapper>
      </div>
    </>
  );
}
