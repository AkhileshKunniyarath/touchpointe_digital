/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { ResourceDocument, ResourceKey } from "@/lib/content-types";
import { formatDate } from "@/lib/utils";

type ResourceGridProps = {
  items: ResourceDocument[];
  resource: ResourceKey;
};

function getPath(resource: ResourceKey, slug: string) {
  return resource === "case-studies" ? `/case-studies/${slug}` : `/${resource}/${slug}`;
}

function getMeta(item: ResourceDocument) {
  if ("client" in item) {
    return `${item.client} - ${item.duration}`;
  }

  if ("author" in item) {
    return `${item.author} - ${item.readTime} min read`;
  }

  if ("launchStage" in item) {
    return `${item.launchStage} - ${item.stack.join(" / ")}`;
  }

  if ("priceFrom" in item) {
    return item.priceFrom || item.category;
  }

  return item.category;
}

export function ResourceGrid({ items, resource }: ResourceGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item._id || item.slug}
          href={getPath(resource, item.slug)}
          className="group surface-strong flex h-full flex-col overflow-hidden p-6 transition hover:-translate-y-1 hover:border-sky-300/30"
        >
          <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-br from-sky-400/20 via-transparent to-violet-400/25">
            {item.coverImage ? (
              <img src={item.coverImage} alt={item.title} className="h-full w-full object-cover opacity-70 transition group-hover:scale-105" />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/0 to-slate-950/70" />
          </div>
          <div className="mb-3 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-slate-400">
            <span>{item.category}</span>
            <span>{formatDate(item.publishedAt)}</span>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
            <p className="text-sm leading-6 text-slate-300">{item.summary}</p>
          </div>
          <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-200">
            <span className="truncate">{getMeta(item)}</span>
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </Link>
      ))}
    </div>
  );
}
