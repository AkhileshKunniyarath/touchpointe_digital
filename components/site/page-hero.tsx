import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
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
    <div className={cn("surface-strong overflow-hidden p-8 sm:p-12", className)}>
      <div className="hero-grid absolute inset-0 opacity-20" />
      <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-6">
          <Badge className="eyebrow border-sky-300/20 bg-sky-300/10 text-sky-100">{eyebrow}</Badge>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">{description}</p>
          </div>
        </div>
        {children ? <div className="relative">{children}</div> : null}
      </div>
    </div>
  );
}

