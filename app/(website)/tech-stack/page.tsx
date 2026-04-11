import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { TechStackBoard } from "@/components/site/tech-stack-board";
import { WorkflowTimeline } from "@/components/site/workflow-timeline";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function TechStackPage() {
  return (
    <>
      <SectionWrapper className="pt-12 sm:pt-16">
        <PageHero
          eyebrow="Technology"
          title="A modern stack tuned for growth, speed, and editorial control."
          description="This website is structured around Next.js 14, MongoDB, MinIO, Zod validation, rich text editing, and a custom admin panel that keeps content operations simple."
        />
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="space-y-8">
          <TechStackBoard />
          <div className="surface p-8">
            <h2 className="text-3xl font-semibold text-white">Working flow</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              The system is designed so content strategy, design, engineering, and publishing all move through the same reliable operating layer.
            </p>
            <div className="mt-8">
              <WorkflowTimeline />
            </div>
            <Link href="/contact" className={cn(buttonVariants.variant.default, buttonVariants.size.default, "mt-8 rounded-full px-5")}>
              Build something similar
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

