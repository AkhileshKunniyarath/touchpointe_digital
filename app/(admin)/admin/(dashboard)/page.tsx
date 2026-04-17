import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { StatCard } from "@/components/admin/stat-card";
import { buttonVariants } from "@/components/ui/button";
import { getDashboardSnapshot } from "@/lib/resource-service";
import { cn } from "@/lib/utils";

export default async function AdminOverviewPage() {
  const snapshot = await getDashboardSnapshot();

  return (
    <AdminShell
      title="Overview"
      description="Track and manage your Insights and Case Studies content. Publish new entries, review featured pieces, and keep your content library up to date."
    >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <StatCard label="Insights" value={snapshot.counts.insights} description="Strategic articles and thought leadership published on the site." />
          <StatCard label="Case Studies" value={snapshot.counts["case-studies"]} description="Proof-backed stories that demonstrate measurable client impact." />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="surface-strong p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#7C3AED] font-semibold">Insights</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Featured insights</h2>
              </div>
              <Link href="/admin/insights" className={cn(buttonVariants.variant.secondary, buttonVariants.size.sm, "rounded-full px-4 border border-slate-200")}>
                Manage
              </Link>
            </div>
            <div className="grid gap-4">
              {snapshot.featured.insights.length > 0 ? (
                snapshot.featured.insights.map((item) => (
                  <div key={item.slug} className="surface p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#7C3AED] font-semibold">{item.category}</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{item.summary}</p>
                  </div>
                ))
              ) : (
                <div className="surface p-5 text-sm text-slate-400 text-center">No featured insights yet. Mark entries as featured to see them here.</div>
              )}
            </div>
          </div>

          <div className="surface-strong p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#7C3AED] font-semibold">Case Studies</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Featured case studies</h2>
              </div>
              <Link href="/admin/case-studies" className={cn(buttonVariants.variant.secondary, buttonVariants.size.sm, "rounded-full px-4 border border-slate-200")}>
                Manage
              </Link>
            </div>
            <div className="grid gap-4">
              {snapshot.featured["case-studies"].length > 0 ? (
                snapshot.featured["case-studies"].map((item) => (
                  <div key={item.slug} className="surface p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#7C3AED] font-semibold">{item.category}</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{item.summary}</p>
                  </div>
                ))
              ) : (
                <div className="surface p-5 text-sm text-slate-400 text-center">No featured case studies yet. Mark entries as featured to see them here.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
