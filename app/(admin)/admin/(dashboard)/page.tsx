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
      description="Track the state of the website content system, jump into key publishing areas, and keep an eye on featured content across the platform."
    >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Services" value={snapshot.counts.services} description="Core offers available to publish and update." />
          <StatCard label="Products" value={snapshot.counts.products} description="Productized offers and digital systems." />
          <StatCard label="Blogs" value={snapshot.counts.blogs} description="Educational content powering discovery and trust." />
          <StatCard label="Insights" value={snapshot.counts.insights} description="Strategic commentary and thought leadership." />
          <StatCard label="Case Studies" value={snapshot.counts["case-studies"]} description="Proof-backed stories showing measurable impact." />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="surface-strong p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-sky-200">Featured Services</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Current spotlight</h2>
              </div>
              <Link href="/admin/services" className={cn(buttonVariants.variant.secondary, buttonVariants.size.sm, "rounded-full px-4")}>
                Manage
              </Link>
            </div>
            <div className="grid gap-4">
              {snapshot.featured.services.map((item) => (
                <div key={item.slug} className="surface p-5">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-strong p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-sky-200">Featured Content</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Editorial highlights</h2>
              </div>
              <Link href="/admin/blogs" className={cn(buttonVariants.variant.secondary, buttonVariants.size.sm, "rounded-full px-4")}>
                Review
              </Link>
            </div>
            <div className="grid gap-4">
              {[...snapshot.featured.blogs, ...snapshot.featured.insights].map((item) => (
                <div key={item.slug} className="surface p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{item.category}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
