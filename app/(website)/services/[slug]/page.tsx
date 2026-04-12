import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentDetail } from "@/components/site/content-detail";
import { ResourceGrid } from "@/components/site/resource-grid";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { getCollection, getDocumentBySlug } from "@/lib/resource-service";

type ServiceDetailPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const item = await getDocumentBySlug("services", params.slug);

  if (!item) {
    return {};
  }

  return {
    title: item.seoTitle || item.title,
    description: item.seoDescription || item.summary
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const item = await getDocumentBySlug("services", params.slug);

  if (!item) {
    notFound();
  }

  const related = (await getCollection("services", { status: "published", limit: 4 }))
    .filter((entry) => entry.slug !== item.slug)
    .slice(0, 3);

  return (
    <>
      <SectionWrapper className="pt-28 sm:pt-32">
        <ContentDetail item={item} resource="services" />
      </SectionWrapper>
      {related.length ? (
        <SectionWrapper className="pt-0">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">More services</h2>
            <ResourceGrid items={related} resource="services" />
          </div>
        </SectionWrapper>
      ) : null}
    </>
  );
}
