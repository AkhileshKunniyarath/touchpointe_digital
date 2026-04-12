import { FilterToolbar } from "@/components/site/filter-toolbar";
import { PageHero } from "@/components/site/page-hero";
import { ResourceGrid } from "@/components/site/resource-grid";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { resourceConfigs } from "@/lib/resource-config";
import { getCategories, getCollection } from "@/lib/resource-service";

type ServicesPageProps = {
  searchParams: {
    q?: string;
    category?: string;
  };
};

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const config = resourceConfigs.services;
  const [items, categories] = await Promise.all([
    getCollection("services", {
      status: "published",
      query: searchParams.q,
      category: searchParams.category
    }),
    getCategories("services")
  ]);

  return (
    <SectionWrapper className="pt-28 sm:pt-32">
      <div className="space-y-8">
        <PageHero eyebrow="Services" title={config.headline} description={config.description} />
        <FilterToolbar categories={categories} />
        <ResourceGrid items={items} resource="services" />
      </div>
    </SectionWrapper>
  );
}
