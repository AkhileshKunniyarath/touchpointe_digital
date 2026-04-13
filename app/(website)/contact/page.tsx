import type { Metadata } from "next";
import { Mail, MessageSquare, Clock, Globe } from "lucide-react";

import { ContactForm } from "@/components/site/contact-form";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/site/scroll-reveal";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { getCollection } from "@/lib/resource-service";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}. Tell us about your project and we'll shape the right build.`,
};

const contactDetails = [
  { icon: Mail, label: "Email", value: siteConfig.adminEmail, desc: "We reply within 24 hours" },
  { icon: Clock, label: "Response time", value: "< 24 hrs", desc: "On business days" },
  { icon: Globe, label: "Coverage", value: "Global", desc: "Remote-first, timezone-flexible" },
  { icon: MessageSquare, label: "Engagements", value: "Ongoing", desc: "Strategy, build, or advisory" },
];

export default async function ContactPage() {
  // Use real service titles as contact form tags
  const services = await getCollection("services", { status: "published" }).catch(() => []);
  const serviceTags = services.length > 0
    ? services.map((s: any) => s.title)
    : ["Custom Software", "Mobile App Development", "Data Intelligence", "Workflow Automation", "SaaS Products", "AI Integration"];

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200 pt-36 pb-20 px-6">
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="animate-pulse-glow absolute -top-24 -right-24 w-[500px] h-[500px] bg-[#7C3AED]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal variant="left">
            <span className="eyebrow mb-5 block w-fit">Contact</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.08] tracking-tight mb-6">
              Tell us what<br />
              <span className="text-[#7C3AED]">you need.</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
              Whether you need a flagship site, an editorial engine, a data pipeline, or a full admin-backed content system — we&apos;ll shape the right build.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="right" amount={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-5 hover:border-violet-100 hover:shadow-sm transition-all">
                    <div className="w-9 h-9 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4 text-[#7C3AED]" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{item.label}</p>
                    <p className="text-base font-bold text-slate-900">{item.value}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Form */}
      <div className="bg-[#FAFAFA]">
        <SectionWrapper className="py-20">
          <ScrollReveal variant="up" amount={0.1}>
            <ContactForm serviceTags={serviceTags} />
          </ScrollReveal>
        </SectionWrapper>
      </div>
    </>
  );
}
