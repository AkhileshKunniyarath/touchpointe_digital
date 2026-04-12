import { FilterToolbar } from "@/components/site/filter-toolbar";
import { PageHero } from "@/components/site/page-hero";
import { ResourceGrid } from "@/components/site/resource-grid";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { resourceConfigs } from "@/lib/resource-config";
import { getCategories, getCollection } from "@/lib/resource-service";

type CaseStudiesPageProps = {
  searchParams: {
    q?: string;
    category?: string;
  };
};

export const revalidate = 0;

export default async function CaseStudiesPage({ searchParams }: CaseStudiesPageProps) {
  const config = resourceConfigs["case-studies"];
  const [items, categories] = await Promise.all([
    getCollection("case-studies", {
      status: "published",
      query: searchParams.q,
      category: searchParams.category
    }),
    getCategories("case-studies")
  ]);

  return (
    <SectionWrapper className="pt-28 sm:pt-32">
      <div className="space-y-8">
        <PageHero eyebrow="Case Studies" title={config.headline} description={config.description} />
        <FilterToolbar categories={categories} />
        <ResourceGrid items={items} resource="case-studies" />
      </div>
    </SectionWrapper>
  );
}
