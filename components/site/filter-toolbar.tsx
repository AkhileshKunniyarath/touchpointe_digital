"use client";

import { Search } from "lucide-react";
import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
    if (nextQueryString === currentParams) return;
    startTransition(() => {
      router.replace(nextQueryString ? `${pathname}?${nextQueryString}` : pathname, { scroll: false });
    });
  }, [currentParams, deferredQuery, pathname, router]);

  return (
    <div className="surface flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search titles, categories, and tags"
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-[#FAFAFA] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 text-sm transition-all"
        />
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
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all border ${
                isActive
                  ? "bg-[#7C3AED] border-[#7C3AED] text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-[#7C3AED] hover:text-[#7C3AED]"
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
