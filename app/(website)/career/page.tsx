import Link from "next/link";
import { ArrowRight, MapPin, Briefcase, Clock, Building2 } from "lucide-react";

import { SectionWrapper } from "@/components/site/section-wrapper";
import { PageHero } from "@/components/site/page-hero";
import { getCollection } from "@/lib/resource-service";

export const revalidate = 0;

export default async function CareerPage() {
  let jobs: any[] = [];
  try {
    jobs = await getCollection("careers", { status: "published" });
  } catch (error) {
    console.warn("Could not retrieve career collections.");
  }

  // Pre-sort or organize by department if wanted, but a simple list is cleanest
  return (
    <SectionWrapper className="pt-24 sm:pt-32 pb-32">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
        <div className="lg:sticky lg:top-32 h-fit">
          <PageHero
            eyebrow="Careers at Touchpointe"
            title="Engineer the Future."
            description="We are constantly seeking brilliant engineers, designers, and strategists to build global enterprise systems."
            className="h-full mb-8"
          />
          <div className="surface p-6 border-l-2 border-l-blue-500 bg-blue-500/5">
             <p className="text-sm font-semibold text-white mb-2">Remote-First Philosophy</p>
             <p className="text-sm text-slate-400">Our engineering pipeline runs async across global timezones. Unless explicitly defined, you can build from anywhere.</p>
          </div>
        </div>

        <div>
          {jobs.length === 0 ? (
             <div className="surface p-12 text-center rounded-[32px] border-dashed">
                <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No active mandates</h3>
                <p className="text-slate-400 max-w-md mx-auto">We aren&apos;t actively placing candidates right now, but we are always keeping an eye on top talent. Send your details to our contact team.</p>
                <Link href="/contact" className="inline-flex items-center gap-2 mt-6 text-blue-400 font-medium hover:text-white transition-colors">
                   General Inquiries <ArrowRight className="w-4 h-4"/>
                </Link>
             </div>
          ) : (
             <div className="grid gap-6">
                {jobs.map((job: any) => (
                   <Link href={`/career/${job.slug}`} key={job._id} className="surface p-8 group hover:border-blue-500/50 hover:bg-blue-500/5 transition-all">
                      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                         <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-3 block">{job.department}</span>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors">{job.title}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-400">
                               <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {job.location || "Remote"}</div>
                               <div className="flex items-center gap-1.5"><Briefcase className="w-4 h-4"/> {job.employmentType || "Full-Time"}</div>
                               <div className="flex items-center gap-1.5"><Clock className="w-4 h-4"/> {new Date(job.createdAt).toLocaleDateString()}</div>
                            </div>
                         </div>
                         <div className="shrink-0 mt-4 md:mt-0">
                            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 group-hover:border-blue-500 group-hover:bg-blue-500 text-white transition-all">
                               <ArrowRight className="w-5 h-5 group-hover:-rotate-45 transition-transform" />
                            </span>
                         </div>
                      </div>
                   </Link>
                ))}
             </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
