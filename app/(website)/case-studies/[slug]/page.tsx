import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentDetail } from "@/components/site/content-detail";
import { ResourceGrid } from "@/components/site/resource-grid";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { getCollection, getDocumentBySlug } from "@/lib/resource-service";

type CaseStudyDetailPageProps = {
  params: {
    slug: string;
  };
};

export const revalidate = 600;

export async function generateMetadata({ params }: CaseStudyDetailPageProps): Promise<Metadata> {
  const item = await getDocumentBySlug("case-studies", params.slug);

  if (!item) {
    return {};
  }

  return {
    title: item.seoTitle || item.title,
    description: item.seoDescription || item.summary
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const item = await getDocumentBySlug("case-studies", params.slug);

  if (!item) {
    notFound();
  }

  const related = (await getCollection("case-studies", { status: "published", limit: 4 }))
    .filter((entry) => entry.slug !== item.slug)
    .slice(0, 3);

  return (
    <>
      <SectionWrapper className="pt-12 sm:pt-16">
        <ContentDetail item={item} resource="case-studies" />
      </SectionWrapper>
      {related.length ? (
        <SectionWrapper className="pt-0">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">More case studies</h2>
            <ResourceGrid items={related} resource="case-studies" />
          </div>
        </SectionWrapper>
      ) : null}
    </>
  );
}
