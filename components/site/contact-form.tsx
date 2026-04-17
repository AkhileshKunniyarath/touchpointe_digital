"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const defaultTags = [
  "Custom Software",
  "Mobile App Development",
  "Data Intelligence",
  "Workflow Automation",
  "SaaS Products",
  "AI/ML Integration",
  "Enterprise Platforms",
  "Staff Augmentation",
];

interface ContactFormProps {
  serviceTags?: string[];
}

export function ContactForm({ serviceTags = defaultTags }: ContactFormProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fd = new FormData(e.currentTarget);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          message: fd.get("message"),
          serviceInterest: selectedTags.join(", ") || "General inquiry",
        }),
      });
    } catch {
      // fail silently — form still resets
    }
    setIsSubmitting(false);
    setSubmitted(true);
    setSelectedTags([]);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-8 lg:p-14 max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
      <div>
        <span className="eyebrow mb-4 block w-fit">Start a Conversation</span>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
          Let&apos;s build something that works.
        </h3>
        <p className="text-slate-500 mb-8 max-w-sm text-sm leading-relaxed">
          Select the areas you&apos;re exploring and our team will reach out within 24 hours.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest w-full mb-1">
            I&apos;m looking for&hellip;
          </span>
          {serviceTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                selectedTags.includes(tag)
                  ? "bg-[#7C3AED] border-[#7C3AED] text-white shadow-sm"
                  : "bg-white border-slate-200 text-slate-700 hover:border-[#7C3AED] hover:text-[#7C3AED]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {submitted ? (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <Send className="w-5 h-5 text-emerald-600" />
          </div>
          <h4 className="text-lg font-bold text-slate-900">Message received</h4>
          <p className="text-sm text-slate-500 max-w-xs">
            We&apos;ll be in touch within 24 hours. Check your inbox.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Full Name
            </label>
            <input
              required
              name="name"
              type="text"
              className="w-full bg-[#FAFAFA] border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 transition-all"
              placeholder="Jane Smith"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Work Email
            </label>
            <input
              required
              name="email"
              type="email"
              className="w-full bg-[#FAFAFA] border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 transition-all"
              placeholder="jane@company.com"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              className="w-full bg-[#FAFAFA] border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 transition-all"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Project Details
            </label>
            <textarea
              name="message"
              rows={4}
              className="w-full bg-[#FAFAFA] border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 transition-all resize-none"
              placeholder="Tell us about your goals and timeline..."
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#7C3AED] text-white font-bold py-3.5 rounded-lg hover:bg-[#6D28D9] disabled:opacity-60 transition-all mt-1 shadow-sm hover:shadow-md hover:shadow-violet-200"
          >
            {isSubmitting ? "Sending…" : "Submit Inquiry"}
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
