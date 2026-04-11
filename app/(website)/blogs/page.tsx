import { FilterToolbar } from "@/components/site/filter-toolbar";
import { PageHero } from "@/components/site/page-hero";
import { ResourceGrid } from "@/components/site/resource-grid";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { resourceConfigs } from "@/lib/resource-config";
import { getCategories, getCollection } from "@/lib/resource-service";

type BlogsPageProps = {
  searchParams: {
    q?: string;
    category?: string;
  };
};

export const revalidate = 600;

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const config = resourceConfigs.blogs;
  const [items, categories] = await Promise.all([
    getCollection("blogs", {
      status: "published",
      query: searchParams.q,
      category: searchParams.category
    }),
    getCategories("blogs")
  ]);

  return (
    <SectionWrapper className="pt-12 sm:pt-16">
      <div className="space-y-8">
        <PageHero eyebrow="Blogs" title={config.headline} description={config.description} />
        <FilterToolbar categories={categories} />
        <ResourceGrid items={items} resource="blogs" />
      </div>
    </SectionWrapper>
  );
}

