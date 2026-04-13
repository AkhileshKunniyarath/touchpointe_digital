import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { TechStackBoard } from "@/components/site/tech-stack-board";
import { WorkflowTimeline } from "@/components/site/workflow-timeline";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tech Stack",
  description: `The modern engineering stack behind every ${siteConfig.name} build — Next.js, MongoDB, Framer Motion, and more.`,
};

export default function TechStackPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative w-full pt-48 pb-24 flex flex-col justify-center items-center text-center overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
          <ScrollReveal variant="up" className="flex flex-col items-center">

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              A modern stack tuned for growth, speed, and editorial control.
            </h1>
            <p className="text-slate-500 max-w-2xl text-lg md:text-xl leading-relaxed mx-auto">
              Structured around Next.js, MongoDB, Framer Motion, Zod validation, rich text editing, and a custom admin panel that keeps content operations simple.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Stack & workflow */}
      <div className="bg-[#FAFAFA]">
        <SectionWrapper className="py-16">
          <div className="space-y-10">
            <ScrollReveal variant="up">
              <div>
                <span className="eyebrow mb-4 block w-fit">The Stack</span>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Technologies we ship with.</h2>
                <p className="text-slate-500 text-sm max-w-2xl mb-8">
                  Every technology below is chosen for composability, performance, and how well it ages. We avoid hype-driven choices.
                </p>
                <TechStackBoard />
              </div>
            </ScrollReveal>

            <ScrollReveal variant="up" amount={0.15}>
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-8">
                <div className="mb-8">
                  <span className="eyebrow mb-4 block w-fit">Working Process</span>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">How we deliver.</h2>
                  <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
                    Content strategy, design, engineering, and publishing all move through the same reliable operating layer. No handoff gaps, no rework cycles.
                  </p>
                </div>
                <WorkflowTimeline />
                <Link href="/contact" className="btn-brand inline-flex mt-8">
                  Build something similar <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </SectionWrapper>
      </div>

    </>
  );
}
