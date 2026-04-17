import { getCollection } from "@/lib/resource-service";
import { CareersClient } from "./careers-client";

export const metadata = {
  title: "Careers | Touchpointe Digital",
  description: "Join the Touchpointe team. Explore open roles in engineering, design, strategy, and more.",
};

export const revalidate = 60;

export default async function CareersPage() {
  const jobs = await getCollection("careers", { status: "published" });

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20 lg:py-28">
          <span className="eyebrow mb-6 block w-fit">We&apos;re Hiring</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight max-w-3xl leading-tight mb-6">
            Build the future with{" "}
            <span className="text-[#7C3AED]">Touchpointe</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
            We&apos;re a team of engineers, designers, and strategists who believe great software changes how businesses operate. Come help us build it.
          </p>
        </div>
      </div>

      {/* Listings */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        {jobs.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">No open positions right now</h2>
            <p className="text-slate-500 max-w-md mx-auto">
              We&apos;re not actively hiring at the moment, but we&apos;re always interested in exceptional talent. Send your CV to{" "}
              <a href="mailto:careers@touchpointe.com" className="text-[#7C3AED] font-semibold hover:underline">
                careers@touchpointe.com
              </a>
            </p>
          </div>
        ) : (
          <CareersClient jobs={jobs as any} />
        )}
      </div>
    </div>
  );
}
