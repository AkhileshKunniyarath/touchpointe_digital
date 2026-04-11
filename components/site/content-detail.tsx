import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { ResourceDocument, ResourceKey } from "@/lib/content-types";
import { formatDate } from "@/lib/utils";

type ContentDetailProps = {
  item: ResourceDocument;
  resource: ResourceKey;
};

export function ContentDetail({ item, resource }: ContentDetailProps) {
  return (
    <article className="space-y-8">
      <div className="surface-strong overflow-hidden p-8 sm:p-12">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-5">
            <Badge className="eyebrow">{item.category}</Badge>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">{item.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">{item.summary}</p>
          </div>
          <div className="surface grid gap-3 p-6 text-sm text-slate-200">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400">Published</span>
              <span>{formatDate(item.publishedAt)}</span>
            </div>
            {"author" in item ? (
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400">Author</span>
                <span>{item.author}</span>
              </div>
            ) : null}
            {"priceFrom" in item && item.priceFrom ? (
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400">Starting From</span>
                <span>{item.priceFrom}</span>
              </div>
            ) : null}
            {"launchStage" in item ? (
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400">Launch Stage</span>
                <span>{item.launchStage}</span>
              </div>
            ) : null}
            {"client" in item ? (
              <>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Client</span>
                  <span>{item.client}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Duration</span>
                  <span>{item.duration}</span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="surface p-6 sm:p-8">
          <div className="prose-touchpointe" dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>

        <aside className="grid gap-6 self-start lg:sticky lg:top-28">
          {"outcomes" in item && item.outcomes.length ? (
            <div className="surface p-6">
              <h2 className="text-lg font-semibold text-white">Outcomes</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                {item.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {"benefits" in item && item.benefits.length ? (
            <div className="surface p-6">
              <h2 className="text-lg font-semibold text-white">Benefits</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                {item.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {"results" in item && item.results.length ? (
            <div className="surface p-6">
              <h2 className="text-lg font-semibold text-white">Results</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                {item.results.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {"stack" in item && item.stack.length ? (
            <div className="surface p-6">
              <h2 className="text-lg font-semibold text-white">Stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.stack.map((technology) => (
                  <Badge key={technology}>{technology}</Badge>
                ))}
              </div>
            </div>
          ) : null}

          <div className="surface p-6">
            <h2 className="text-lg font-semibold text-white">Need something similar?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Touchpointe builds websites, publishing systems, and productized growth layers around the same principles used here.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90"
            >
              Start a conversation
            </Link>
          </div>
        </aside>
      </div>

      {item.tags.length ? (
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-8">
        <p className="text-sm text-slate-400">Currently viewing {resource.replace("-", " ")}</p>
        <Link href="/contact" className="text-sm font-semibold text-sky-200 transition hover:text-white">
          Want this level of execution?
        </Link>
      </div>
    </article>
  );
}

