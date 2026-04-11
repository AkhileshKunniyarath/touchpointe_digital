"use client";

import { Search } from "lucide-react";
import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";

type FilterToolbarProps = {
  categories: string[];
};

export function FilterToolbar({ categories }: FilterToolbarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const deferredQuery = useDeferredValue(query);
  const currentParams = searchParams.toString();

  useEffect(() => {
    const params = new URLSearchParams(currentParams);

    if (deferredQuery) {
      params.set("q", deferredQuery);
    } else {
      params.delete("q");
    }

    const nextQueryString = params.toString();

    if (nextQueryString === currentParams) {
      return;
    }

    startTransition(() => {
      router.replace(nextQueryString ? `${pathname}?${nextQueryString}` : pathname, { scroll: false });
    });
  }, [currentParams, deferredQuery, pathname, router]);

  return (
    <div className="surface flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search titles, categories, and tags" className="pl-10" />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const params = new URLSearchParams(searchParams.toString());
          if (category === "All") {
            params.delete("category");
          } else {
            params.set("category", category);
          }

          const isActive = (searchParams.get("category") || "All") === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => router.replace(`${pathname}?${params.toString()}`, { scroll: false })}
              className={`rounded-full px-4 py-2 text-sm transition ${
                isActive ? "bg-white text-slate-950" : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
