import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, Banknote, Share2 } from "lucide-react";

import { SectionWrapper } from "@/components/site/section-wrapper";
import { PageHero } from "@/components/site/page-hero";
import { connectToDatabase } from "@/lib/mongodb";
import Career from "@/models/Career";
import { ContactForm } from "@/components/site/contact-form";
import { normalizeHtmlImageSources } from "@/lib/utils";

export const revalidate = 60;

export default async function CompanyPostPage({ params }: { params: { slug: string } }) {
  await connectToDatabase();

  const job = await Career.findOne({ slug: params.slug, status: "published" }).lean() as any;

  if (!job) {
    notFound();
  }

  return (
    <SectionWrapper className="pt-24 sm:pt-32 pb-32">
       <Link href="/company" className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium text-sm mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to company
       </Link>

       <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-24 items-start">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-4 block">{job.department}</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]">{job.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-300 mb-12 border-y border-white/10 py-6">
               <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-slate-500"/> {job.location || "Location Flexible"}</div>
               <div className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-slate-500"/> {job.employmentType || "Full-Time"}</div>
               {job.salaryRange && <div className="flex items-center gap-2"><Banknote className="w-5 h-5 text-slate-500"/> {job.salaryRange}</div>}
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-slate-300 
                            prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight 
                            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
                            prose-strong:text-white prose-ul:list-disc prose-ul:pl-4 prose-li:marker:text-blue-500"
                 dangerouslySetInnerHTML={{ __html: normalizeHtmlImageSources(job.content) }} />
          </div>

          <div className="sticky top-32 space-y-6">
             <div className="surface p-8 text-center rounded-[32px] border-t-8 border-t-blue-500">
                <h3 className="text-xl font-bold text-white mb-3">Apply for this role</h3>
                <p className="text-sm text-slate-400 mb-6">Send us a direct overview of your experience and we&apos;ll reach out within 48 hours.</p>
                <Link href="#application-form" className="flex items-center justify-center w-full h-14 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-colors">
                   Submit Application
                </Link>
             </div>
             
             <button className="flex items-center justify-center gap-2 w-full h-12 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-colors">
                <Share2 className="w-4 h-4"/> Share Opportunity
             </button>
          </div>
       </div>

       <div id="application-form" className="mt-32 pt-24 border-t border-white/5">
         <h2 className="text-3xl font-bold text-white mb-12 text-center">Fast-Track Application</h2>
         <ContactForm />
       </div>
    </SectionWrapper>
  );
}
