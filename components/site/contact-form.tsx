"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const tags = [
  "AI/ML Solutions",
  "UI/UX Design",
  "Mobile App Development",
  "Custom Software",
  "Generative AI",
  "Product Development",
  "Staff Augmentation",
  "Enterprise Automation"
];

export function ContactForm() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const serviceInterest = selectedTags.length ? selectedTags.join(", ") : "General Inquiry";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: "",
          serviceInterest,
          message
        })
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unable to submit. Please try again.");
      }

      setSelectedTags([]);
      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="surface p-10 lg:p-16 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
       {/* Left Side: Tag Picker */}
       <div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            Let&apos;s level up your brand, together.
          </h3>
          <p className="text-slate-400 mb-8 max-w-sm">
            Select the services you are exploring and our engineering partners will reach out securely.
          </p>
          <div className="flex flex-wrap gap-3">
             <span className="text-sm font-semibold text-white/50 uppercase tracking-widest w-full mb-2">Hi, I am looking for...</span>
             {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
                    selectedTags.includes(tag) 
                      ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {tag}
                </button>
             ))}
          </div>
       </div>

       {/* Right Side: Form Inputs */}
       <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-2">
             <label className="text-xs font-semibold text-white/50 uppercase tracking-widest pl-1">Full Name</label>
             <input name="name" required minLength={2} type="text" className="w-full bg-[#030303] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" autoComplete="name" />
          </div>
          <div className="space-y-2">
             <label className="text-xs font-semibold text-white/50 uppercase tracking-widest pl-1">Work Email</label>
             <input name="email" required type="email" className="w-full bg-[#030303] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@enterprise.com" autoComplete="email" />
          </div>
          <div className="space-y-2">
             <label className="text-xs font-semibold text-white/50 uppercase tracking-widest pl-1">Project Details</label>
             <textarea name="message" required minLength={20} rows={4} className="w-full bg-[#030303] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="Tell us about your strategic goals..." />
          </div>

          {status === "success" && (
            <p className="text-sm text-emerald-400">Thanks — we&apos;ll reach out shortly.</p>
          )}

          {status === "error" && errorMessage && (
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-3 bg-white text-black font-bold h-14 rounded-xl hover:bg-slate-200 transition-colors mt-2"
          >
             {isSubmitting ? "Initiating Handshake..." : "Submit Inquiry"} <Send className="w-4 h-4" />
          </button>
       </form>
    </div>
  );
}
