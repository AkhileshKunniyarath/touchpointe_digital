import Link from "next/link";
import { ArrowRight, MapPin, Briefcase, Clock, Users } from "lucide-react";
import type { Metadata } from "next";

import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/site/scroll-reveal";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { getCollection } from "@/lib/resource-service";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Careers",
  description: `Join the ${siteConfig.name} team. We're looking for engineers, designers, and strategists to build the next generation of digital systems.`,
};

const perks = [
  { title: "Remote-first", desc: "Build from anywhere. Our pipeline runs async across global timezones." },
  { title: "Equity opportunities", desc: "Select roles come with equity — we grow together, not just your resume." },
  { title: "Cutting-edge stack", desc: "Next.js, AI/ML pipelines, distributed systems. Always learning, never stale." },
  { title: "Direct impact", desc: "No layers of bureaucracy. Your work ships and users feel it immediately." },
];

export default async function CareerPage() {
  const jobs: any[] = await getCollection("careers", { status: "published" }).catch(() => []);

  return (
    <>
      {/* Hero */}
      <div className="relative w-full pt-32 pb-20 flex flex-col justify-center items-center text-center overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white" />

        <SectionWrapper className="relative z-10 flex flex-col items-center w-full">
          <div className="max-w-4xl mx-auto flex flex-col items-center pt-8">


            <ScrollReveal variant="up" delay={80}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-6">
                Build systems that{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-blue-500">
                  outlast trends.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={160}>
              <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed mb-12">
                We&apos;re constantly seeking brilliant engineers, designers, and strategists to build global-scale digital systems. If you care about craft and outcomes, you&apos;ll fit here.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={220}>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                <Link href="#open-roles" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-lg text-base font-semibold hover:bg-slate-800 transition-colors shadow-sm">
                  View open roles <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-lg text-base font-semibold hover:bg-slate-50 transition-colors shadow-sm">
                  General inquiry
                </Link>
              </div>
            </ScrollReveal>
          </div>
          
          <ScrollReveal variant="up" delay={300} className="w-full max-w-5xl mx-auto mt-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
              {perks.map((perk) => (
                <div key={perk.title} className="flex flex-col items-center text-center justify-center border border-slate-100 bg-white shadow-sm rounded-xl p-6">
                  <p className="text-sm font-bold text-slate-900 mb-2">{perk.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{perk.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </SectionWrapper>
      </div>

      {/* Open roles */}
      <div className="bg-[#FAFAFA]" id="open-roles">
        <SectionWrapper className="py-20">
          <ScrollReveal variant="up" className="mb-10">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <span className="eyebrow mb-3 block w-fit">Open Roles</span>
                <h2 className="text-3xl font-bold text-slate-900">
                  {jobs.length > 0 ? `${jobs.length} position${jobs.length !== 1 ? "s" : ""} available` : "No active openings"}
                </h2>
              </div>
              {jobs.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Users className="w-4 h-4" />
                  Hiring across multiple departments
                </div>
              )}
            </div>
          </ScrollReveal>

          {jobs.length === 0 ? (
            <ScrollReveal variant="scale" amount={0.3}>
              <div className="border border-slate-200 border-dashed rounded-2xl p-16 text-center max-w-lg mx-auto bg-white">
                <div className="w-12 h-12 rounded-full bg-violet-50 border border-violet-100 flex items-center justify-center mx-auto mb-5">
                  <Users className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">No active openings right now</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
                  We aren&apos;t actively placing candidates right now, but we always keep an eye on exceptional talent.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C3AED] hover:text-[#6D28D9] transition-colors"
                >
                  Send a general inquiry <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          ) : (
            <StaggerContainer className="grid gap-3" stagger={0.07}>
              {jobs.map((job: any) => (
                <StaggerItem key={job._id}>
                  <Link
                    href={`/career/${job.slug}`}
                    className="surface group p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-violet-200 hover:shadow-md hover:shadow-violet-50/40"
                  >
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#7C3AED] mb-2 block">
                        {job.department}
                      </span>
                      <h3 className="text-base font-semibold text-slate-900 mb-3 group-hover:text-[#7C3AED] transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" /> {job.location || "Remote"}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5" /> {job.employmentType || "Full-Time"}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(job.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </div>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-[#7C3AED] group-hover:border-[#7C3AED] group-hover:text-white transition-all shrink-0">
                      <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </SectionWrapper>
      </div>
    </>
  );
}
