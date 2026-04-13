import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { ResourceGrid } from "@/components/site/resource-grid";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { getCollection, getDocumentBySlug } from "@/lib/resource-service";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getDocumentBySlug("services", params.slug);
  if (!item) return {};
  return { title: item.seoTitle || item.title, description: item.seoDescription || item.summary };
}

export default async function ServiceDetailPage({ params }: Props) {
  const item = await getDocumentBySlug("services", params.slug) as any;
  if (!item) notFound();

  const related = (await getCollection("services", { status: "published", limit: 4 }))
    .filter((e) => e.slug !== item.slug)
    .slice(0, 3);

  return (
    <>
      {/* ── MINIMAL HERO ── */}
      <div className="relative w-full pt-48 pb-24 flex flex-col justify-center items-center text-center overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white" />
        
        <SectionWrapper className="relative z-10 flex flex-col items-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">


            <ScrollReveal variant="up" delay={80}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-6">
                {item.title}
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={160}>
              <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed mb-12">
                {item.summary}
              </p>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={220}>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                <Link href={item.ctaHref || "/contact"} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-lg text-base font-semibold hover:bg-slate-800 transition-colors shadow-sm">
                  {item.ctaLabel || "Start a project"} <ArrowRight className="w-4 h-4" />
                </Link>
                {item.priceFrom && (
                  <span className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-lg text-base font-semibold shadow-sm">
                    Starts from {item.priceFrom}
                  </span>
                )}
              </div>
            </ScrollReveal>
          </div>
        </SectionWrapper>
      </div>

      {/* ── CONTENT SECTION ── */}
      <div className="bg-[#FAFAFA] py-24">
        <SectionWrapper>
          <div className="grid lg:grid-cols-[1fr_350px] gap-16 items-start">
            
            {/* Main content */}
            <ScrollReveal variant="up">
              <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#7C3AED] hover:prose-a:text-[#6D28D9] prose-img:rounded-xl shadow-none bg-white p-8 sm:p-12 border border-slate-200 rounded-2xl" dangerouslySetInnerHTML={{ __html: item.content }} />
            </ScrollReveal>

            {/* Sticky Sidebar */}
            <aside className="sticky top-28 space-y-6">
              {item.outcomes && item.outcomes.length > 0 && (
                <ScrollReveal variant="up" delay={100}>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Key Outcomes</h3>
                    <ul className="space-y-3">
                      {item.outcomes.map((outcome: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-600 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              )}

              {item.process && item.process.length > 0 && (
                <ScrollReveal variant="up" delay={150}>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Our Process</h3>
                    <ul className="space-y-4">
                      {item.process.map((step: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-50 text-[#7C3AED] font-bold text-xs shrink-0">
                            {i + 1}
                          </span>
                          <span className="mt-0.5">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              )}

              {item.tags && item.tags.length > 0 && (
                <ScrollReveal variant="up" delay={200}>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Core Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-semibold text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </aside>

          </div>
        </SectionWrapper>
      </div>

      {related.length > 0 && (
        <div className="bg-white border-t border-slate-200">
          <SectionWrapper className="py-24">
            <ScrollReveal variant="up">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-10 tracking-tight">Other Services</h2>
            </ScrollReveal>
            <ResourceGrid items={related} resource="services" />
          </SectionWrapper>
        </div>
      )}
    </>
  );
}
