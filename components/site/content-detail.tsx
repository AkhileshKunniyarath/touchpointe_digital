import Link from "next/link";

import type { ResourceDocument, ResourceKey } from "@/lib/content-types";
import { formatDate } from "@/lib/utils";

type ContentDetailProps = {
  item: ResourceDocument;
  resource: ResourceKey;
};

export function ContentDetail({ item, resource }: ContentDetailProps) {
  return (
    <article className="space-y-8">
      <div className="relative overflow-hidden bg-white border-b border-slate-200 p-8 sm:p-12 pt-28 sm:pt-32">
        <div className="hero-grid absolute inset-0 opacity-60" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7C3AED]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-5">
            <span className="eyebrow">{item.category}</span>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{item.title}</h1>
            <p className="max-w-3xl text-base leading-7 text-slate-500">{item.summary}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400">Published</span>
              <span className="text-slate-900 font-medium">{formatDate(item.publishedAt)}</span>
            </div>
            {"author" in item ? (
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400">Author</span>
                <span className="text-slate-900 font-medium">{item.author}</span>
              </div>
            ) : null}
            {"priceFrom" in item && item.priceFrom ? (
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400">Starting From</span>
                <span className="text-slate-900 font-medium">{item.priceFrom}</span>
              </div>
            ) : null}
            {"launchStage" in item ? (
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400">Launch Stage</span>
                <span className="text-slate-900 font-medium">{item.launchStage}</span>
              </div>
            ) : null}
            {"client" in item ? (
              <>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Client</span>
                  <span className="text-slate-900 font-medium">{item.client}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Duration</span>
                  <span className="text-slate-900 font-medium">{item.duration}</span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
          <div className="prose-touchpointe" dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>

        <aside className="grid gap-5 self-start lg:sticky lg:top-24">
          {"outcomes" in item && item.outcomes.length ? (
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
              <h2 className="text-base font-semibold text-slate-900 mb-3">Outcomes</h2>
              <ul className="space-y-2 text-sm leading-6 text-slate-500">
                {item.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 shrink-0" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {"benefits" in item && item.benefits.length ? (
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
              <h2 className="text-base font-semibold text-slate-900 mb-3">Benefits</h2>
              <ul className="space-y-2 text-sm leading-6 text-slate-500">
                {item.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {"results" in item && item.results.length ? (
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
              <h2 className="text-base font-semibold text-slate-900 mb-3">Results</h2>
              <ul className="space-y-2 text-sm leading-6 text-slate-500">
                {item.results.map((result) => (
                  <li key={result} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 shrink-0" />
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {"stack" in item && item.stack.length ? (
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
              <h2 className="text-base font-semibold text-slate-900 mb-3">Stack</h2>
              <div className="flex flex-wrap gap-2">
                {item.stack.map((technology) => (
                  <span key={technology} className="px-2.5 py-1 rounded-full text-xs font-medium border border-violet-100 bg-violet-50 text-slate-700">{technology}</span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 border-t-4 border-t-[#7C3AED]">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Need something similar?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Touchpointe builds websites, publishing systems, and productized growth layers around the same principles used here.
            </p>
            <Link href="/contact" className="mt-4 btn-brand text-xs px-4 py-2 w-full justify-center">
              Start a conversation
            </Link>
          </div>
        </aside>
      </div>

      {item.tags.length ? (
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium border border-violet-100 bg-violet-50 text-slate-700">{tag}</span>
          ))}
        </div>
      ) : null}

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-8">
        <p className="text-sm text-slate-400">Currently viewing {resource.replace("-", " ")}</p>
        <Link href="/contact" className="text-sm font-semibold text-[#7C3AED] hover:text-[#6D28D9] transition-colors">
          Want this level of execution?
        </Link>
      </div>
    </article>
  );
}
