import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentDetail } from "@/components/site/content-detail";
import { ResourceGrid } from "@/components/site/resource-grid";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { getCollection, getDocumentBySlug } from "@/lib/resource-service";

type InsightDetailPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: InsightDetailPageProps): Promise<Metadata> {
  const item = await getDocumentBySlug("insights", params.slug);

  if (!item) {
    return {};
  }

  return {
    title: item.seoTitle || item.title,
    description: item.seoDescription || item.summary
  };
}

export default async function InsightDetailPage({ params }: InsightDetailPageProps) {
  const item = await getDocumentBySlug("insights", params.slug);

  if (!item) {
    notFound();
  }

  const related = (await getCollection("insights", { status: "published", limit: 4 }))
    .filter((entry) => entry.slug !== item.slug)
    .slice(0, 3);

  return (
    <>
      <SectionWrapper className="pt-28 sm:pt-32">
        <ContentDetail item={item} resource="insights" />
      </SectionWrapper>
      {related.length ? (
        <SectionWrapper className="pt-0">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">More insights</h2>
            <ResourceGrid items={related} resource="insights" />
          </div>
        </SectionWrapper>
      ) : null}
    </>
  );
}
