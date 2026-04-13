import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentDetail } from "@/components/site/content-detail";
import { ResourceGrid } from "@/components/site/resource-grid";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { getCollection, getDocumentBySlug } from "@/lib/resource-service";

export const revalidate = 600;

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getDocumentBySlug("insights", params.slug);
  if (!item) return {};
  return { title: item.seoTitle || item.title, description: item.seoDescription || item.summary };
}

export default async function InsightDetailPage({ params }: Props) {
  const item = await getDocumentBySlug("insights", params.slug);
  if (!item) notFound();

  const related = (await getCollection("insights", { status: "published", limit: 4 }))
    .filter((e) => e.slug !== item.slug)
    .slice(0, 3);

  return (
    <>
      <ContentDetail item={item} resource="insights" />
      {related.length > 0 && (
        <SectionWrapper className="pt-0 pb-20">
          <ScrollReveal variant="up">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">More insights</h2>
          </ScrollReveal>
          <ResourceGrid items={related} resource="insights" />
        </SectionWrapper>
      )}
    </>
  );
}
