import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, Banknote, Share2 } from "lucide-react";
import type { Metadata } from "next";

import { SectionWrapper } from "@/components/site/section-wrapper";
import { ContactForm } from "@/components/site/contact-form";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { connectToDatabase } from "@/lib/mongodb";
import Career from "@/models/Career";

export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    await connectToDatabase();
    const job = await Career.findOne({ slug: params.slug, status: "published" }).lean() as any;
    if (!job) return {};
    return {
      title: job.title,
      description: `${job.department} · ${job.location || "Remote"} · ${job.employmentType || "Full-Time"}`,
    };
  } catch {
    return {};
  }
}

export default async function CareerPostPage({ params }: Props) {
  await connectToDatabase();
  const job = await Career.findOne({ slug: params.slug, status: "published" }).lean() as any;
  if (!job) notFound();

  return (
    <>
      {/* Header */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200 pt-32 pb-12 px-6">
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="animate-pulse-glow absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#7C3AED]/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <Link
            href="/career"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#7C3AED] font-medium text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to open roles
          </Link>
          <ScrollReveal variant="up">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7C3AED] mb-3 block">
              {job.department}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight max-w-3xl">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 border-y border-slate-200 py-5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#7C3AED]" /> {job.location || "Remote / Flexible"}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#7C3AED]" /> {job.employmentType || "Full-Time"}
              </div>
              {job.salaryRange && (
                <div className="flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-[#7C3AED]" /> {job.salaryRange}
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Body */}
      <div className="bg-[#FAFAFA]">
        <SectionWrapper className="py-16">
          <div className="grid lg:grid-cols-[1fr_260px] gap-12 lg:gap-16 items-start">
            <ScrollReveal variant="left" amount={0.15}>
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-8 sm:p-10">
                <div className="prose-touchpointe" dangerouslySetInnerHTML={{ __html: job.content }} />
              </div>
            </ScrollReveal>

            <div className="space-y-4 lg:sticky lg:top-28">
              <ScrollReveal variant="right" amount={0.2}>
                <div className="surface border-t-4 border-t-[#7C3AED] p-7 text-center">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">Apply for this role</h3>
                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                    We review every application and reply within 48 hours.
                  </p>
                  <Link
                    href="#application-form"
                    className="btn-brand w-full justify-center text-sm"
                  >
                    Submit Application
                  </Link>
                </div>

                <button className="surface w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-slate-500 hover:text-[#7C3AED] transition-colors mt-4">
                  <Share2 className="w-4 h-4" /> Share this role
                </button>
              </ScrollReveal>
            </div>
          </div>

          {/* Application form */}
          <ScrollReveal variant="up" amount={0.1}>
            <div id="application-form" className="mt-20 pt-16 border-t border-slate-200">
              <div className="mb-10">
                <span className="eyebrow mb-3 block w-fit">Apply Now</span>
                <h2 className="text-2xl font-bold text-slate-900">Fast-track application</h2>
                <p className="text-slate-500 text-sm mt-2">
                  Reference the role title &ldquo;{job.title}&rdquo; in your project details.
                </p>
              </div>
              <ContactForm serviceTags={[job.department, job.title]} />
            </div>
          </ScrollReveal>
        </SectionWrapper>
      </div>
    </>
  );
}
