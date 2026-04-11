import { FilterToolbar } from "@/components/site/filter-toolbar";
import { PageHero } from "@/components/site/page-hero";
import { ResourceGrid } from "@/components/site/resource-grid";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { resourceConfigs } from "@/lib/resource-config";
import { getCategories, getCollection } from "@/lib/resource-service";

type InsightsPageProps = {
  searchParams: {
    q?: string;
    category?: string;
  };
};

export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const config = resourceConfigs.insights;
  const [items, categories] = await Promise.all([
    getCollection("insights", {
      status: "published",
      query: searchParams.q,
      category: searchParams.category
    }),
    getCategories("insights")
  ]);

  return (
    <SectionWrapper className="pt-12 sm:pt-16">
      <div className="space-y-8">
        <PageHero eyebrow="Insights" title={config.headline} description={config.description} />
        <FilterToolbar categories={categories} />
        <ResourceGrid items={items} resource="insights" />
      </div>
    </SectionWrapper>
  );
}

