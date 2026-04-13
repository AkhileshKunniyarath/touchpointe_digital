/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { ResourceDocument, ResourceKey } from "@/lib/content-types";
import { formatDate } from "@/lib/utils";
import { StaggerContainer, StaggerItem } from "@/components/site/scroll-reveal";

type ResourceGridProps = {
  items: ResourceDocument[];
  resource: ResourceKey;
  emptyMessage?: string;
};

function getPath(resource: ResourceKey, slug: string) {
  return resource === "case-studies" ? `/case-studies/${slug}` : `/${resource}/${slug}`;
}

function getMeta(item: ResourceDocument) {
  if ("client" in item) return `${item.client} · ${item.duration}`;
  if ("author" in item) return `${item.author} · ${item.readTime} min read`;
  if ("launchStage" in item) return `${item.launchStage} · ${(item.stack ?? []).join(" / ")}`;
  if ("priceFrom" in item) return item.priceFrom || item.category;
  return item.category;
}

export function ResourceGrid({ items, resource, emptyMessage }: ResourceGridProps) {
  if (!items.length) {
    return (
      <div className="py-24 text-center text-slate-400 text-sm">
        {emptyMessage ?? "No items published yet."}
      </div>
    );
  }

  return (
    <StaggerContainer className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" stagger={0.07} delayMs={60}>
      {items.map((item) => (
        <StaggerItem key={item._id || item.slug}>
          <Link
            href={getPath(resource, item.slug)}
            className="group rounded-xl border border-slate-200 bg-white flex h-full flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 hover:border-slate-300"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl border-b border-slate-200 bg-slate-50">
              {item.coverImage ? (
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-violet-50 to-violet-100/50" />
              )}
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="mb-3 flex items-center justify-between gap-3 text-xs uppercase tracking-widest text-slate-400">
                <span className="truncate">{item.category}</span>
                <span className="shrink-0">{formatDate(item.publishedAt)}</span>
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#7C3AED] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-slate-500 line-clamp-2">{item.summary}</p>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4 text-xs text-slate-400 border-t border-slate-100 pt-4">
                <span className="truncate">{getMeta(item)}</span>
                <ArrowUpRight className="h-4 w-4 text-[#7C3AED] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0" />
              </div>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
