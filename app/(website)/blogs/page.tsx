import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FilterToolbar } from "@/components/site/filter-toolbar";
import { ResourceGrid } from "@/components/site/resource-grid";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { resourceConfigs } from "@/lib/resource-config";
import { getCategories, getCollection } from "@/lib/resource-service";

export const revalidate = 600;

type Props = { searchParams: { q?: string; category?: string } };

export default async function BlogsPage({ searchParams }: Props) {
  const config = resourceConfigs.blogs;
  const [items, categories] = await Promise.all([
    getCollection("blogs", {
      status: "published",
      query: searchParams.q,
      category: searchParams.category,
    }),
    getCategories("blogs"),
  ]);

  return (
    <>
      {/* Hero */}
      <div className="relative w-full pt-48 pb-24 flex flex-col justify-center items-center text-center overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
          <ScrollReveal variant="up" className="flex flex-col items-center">

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              {config.headline}
            </h1>
            <p className="text-slate-500 max-w-2xl text-lg md:text-xl leading-relaxed mb-8 mx-auto">
              {config.description}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              {items.length} article{items.length !== 1 ? "s" : ""} published
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#FAFAFA] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
          <FilterToolbar categories={categories} />
          <ResourceGrid items={items} resource="blogs" emptyMessage="No articles published yet." />
        </div>
      </div>

    </>
  );
}
