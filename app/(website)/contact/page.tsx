import { ContactForm } from "@/components/site/contact-form";
import { PageHero } from "@/components/site/page-hero";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { resourceConfigs } from "@/lib/resource-config";

const serviceOptions = [
  "Conversion Website Systems",
  "Content Operations Design",
  "Launch Readiness Audits",
  resourceConfigs.products.label
];

export default function ContactPage() {
  return (
    <SectionWrapper className="pt-28 sm:pt-32">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <PageHero
          eyebrow="Contact"
          title="Tell us what you need the platform to do."
          description="Whether you need a fresh flagship site, an editorial engine, or a full admin-backed content system, we can shape the right first build."
          className="h-full"
        >
          <div className="surface p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-200">What we can help with</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li>New website launches</li>
              <li>Content management workflows</li>
              <li>Admin dashboards and publishing systems</li>
              <li>Productized growth pages and landing systems</li>
            </ul>
          </div>
        </PageHero>
        <ContactForm />
      </div>
    </SectionWrapper>
  );
}
