"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function LeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#growth-plan") {
        setIsOpen(true);
        // Clean up hash immediately so it can be re-triggered if needed
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company: "",
          serviceInterest: "Growth Plan",
          message: "Requested a free growth plan via the lead capture modal."
        })
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unable to submit your request. Please try again.");
      }

      form.reset();
      setStatus("success");
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
      }, 3000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to submit your request. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Get Your Growth Plan</h3>
          <p className="text-[#A1A1AA] text-sm">
            Enter your details below and we&apos;ll reach out with a custom digital automation audit in 24 hours.
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
              <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Request Received!</h4>
            <p className="text-slate-400 text-sm">Our team will be in touch shortly.</p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input 
                id="name"
                name="name"
                type="text" 
                required 
                minLength={2}
                placeholder="Your Name"
                autoComplete="name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input 
                id="email"
                name="email"
                type="email" 
                required 
                placeholder="Work Email"
                autoComplete="email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">Phone Number</label>
              <input 
                id="phone"
                name="phone"
                type="tel" 
                required 
                placeholder="Phone Number"
                inputMode="tel"
                autoComplete="tel"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>

            {status === "error" && errorMessage && (
              <p className="text-sm text-red-400">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className={cn(
                "w-full rounded-xl h-12 text-sm font-bold text-white transition-all mt-6",
                "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {status === "submitting" ? "Sending..." : "Get Free Audit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
