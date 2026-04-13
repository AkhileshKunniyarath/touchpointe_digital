import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

export function PageHero({ eyebrow, title, description, children, className }: PageHeroProps) {
  return (
    <div className={cn("relative overflow-hidden bg-white border-b border-slate-200 p-8 sm:p-12 pt-28 sm:pt-32", className)}>
      <div className="hero-grid absolute inset-0 opacity-70" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7C3AED]/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-5">
          <span className="eyebrow">{eyebrow}</span>
          <div className="space-y-3">
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
            <p className="max-w-2xl text-base leading-7 text-slate-500">{description}</p>
          </div>
        </div>
        {children ? <div className="relative">{children}</div> : null}
      </div>
    </div>
  );
}
