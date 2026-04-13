import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FilterToolbar } from "@/components/site/filter-toolbar";
import { ResourceGrid } from "@/components/site/resource-grid";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { resourceConfigs } from "@/lib/resource-config";
import { getCategories, getCollection } from "@/lib/resource-service";

export const revalidate = 600;

type Props = { searchParams: { q?: string; category?: string } };

export default async function CaseStudiesPage({ searchParams }: Props) {
  const config = resourceConfigs["case-studies"];
  const [items, categories] = await Promise.all([
    getCollection("case-studies", {
      status: "published",
      query: searchParams.q,
      category: searchParams.category,
    }),
    getCategories("case-studies"),
  ]);

  return (
    <>
      {/* Grid Pattern Hero */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200 px-6 pt-48 pb-20 md:pb-28">
        <div className="absolute inset-0 hero-grid opacity-60" />
        <div className="animate-pulse-glow absolute -top-24 -right-24 w-[500px] h-[500px] bg-[#7C3AED]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <ScrollReveal variant="up">

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 max-w-3xl leading-tight">
              {config.headline}
            </h1>
            <p className="text-slate-500 max-w-2xl text-lg leading-relaxed mb-8">
              {config.description}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                {items.length} case stud{items.length !== 1 ? "ies" : "y"} published
              </div>
              {categories.slice(1).map((cat) => (
                <Link
                  key={cat}
                  href={`/case-studies?category=${encodeURIComponent(cat)}`}
                  className="text-xs font-semibold text-slate-400 hover:text-[#7C3AED] transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#FAFAFA] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
          <FilterToolbar categories={categories} />
          <ResourceGrid items={items} resource="case-studies" emptyMessage="No case studies published yet." />
        </div>
      </div>

    </>
  );
}
