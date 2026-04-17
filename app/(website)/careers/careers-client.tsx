"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/admin/image-upload-field";

type Job = {
  _id: string;
  title: string;
  summary: string;
  department: string;
  location: string;
  employmentType: string;
  salaryRange?: string;
  slug: string;
};

type ApplyModalProps = {
  job: Job;
  onClose: () => void;
};

function ApplyModal({ job, onClose }: ApplyModalProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", coverLetter: "", resumeUrl: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job._id, jobTitle: job.title, ...form }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#7C3AED] font-bold">Apply for</p>
            <h3 className="font-bold text-slate-900 text-lg leading-tight">{job.title}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {status === "success" ? (
          <div className="p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Application submitted!</h4>
            <p className="text-slate-500 text-sm">Thank you, {form.name}. We'll review your application and be in touch.</p>
            <button onClick={onClose} className="mt-6 px-6 py-2.5 bg-[#7C3AED] text-white text-sm font-semibold rounded-full hover:bg-[#6D28D9] transition-colors">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <label className="grid gap-1.5 text-sm font-medium text-slate-900">
                Full Name *
                <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" required />
              </label>
              <label className="grid gap-1.5 text-sm font-medium text-slate-900">
                Email *
                <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" required />
              </label>
            </div>

            <label className="grid gap-1.5 text-sm font-medium text-slate-900">
              Phone
              <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+1 (555) 000-0000" />
            </label>

            <label className="grid gap-1.5 text-sm font-medium text-slate-900">
              Resume / CV (upload to get a link)
              <ImageUploadField
                value={form.resumeUrl}
                onChange={(url) => set("resumeUrl", url)}
                placeholder="Or paste a resume link (Google Drive, etc.)"
              />
            </label>

            <label className="grid gap-1.5 text-sm font-medium text-slate-900">
              Cover Letter
              <Textarea value={form.coverLetter} onChange={(e) => set("coverLetter", e.target.value)} placeholder="Tell us why you're a great fit…" />
            </label>

            {status === "error" && <p className="text-xs text-rose-500 font-medium">{errorMsg}</p>}

            <Button type="submit" disabled={status === "sending"} className="mt-1">
              {status === "sending" ? (
                <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</span>
              ) : "Submit Application"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export function CareersClient({ jobs }: { jobs: Job[] }) {
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.department).filter(Boolean)))];
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? jobs : jobs.filter((j) => j.department === filter);

  return (
    <>
      {/* Department filter */}
      {departments.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                filter === d
                  ? "bg-[#7C3AED] text-white border-[#7C3AED]"
                  : "bg-white text-slate-600 border-slate-200 hover:border-[#7C3AED] hover:text-[#7C3AED]"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">No open positions in this department right now.</div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((job) => (
            <div key={job._id} className="group rounded-xl border border-slate-200 bg-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-violet-200 hover:shadow-md transition-all duration-300">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.department && (
                    <span className="eyebrow">{job.department}</span>
                  )}
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-0.5 text-xs font-semibold text-slate-500">
                    {job.employmentType}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-[#7C3AED] transition-colors">{job.title}</h3>
                <p className="text-sm text-slate-500 mb-2">{job.location}{job.salaryRange ? ` · ${job.salaryRange}` : ""}</p>
                {job.summary && <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{job.summary}</p>}
              </div>
              <button
                onClick={() => setActiveJob(job)}
                className="shrink-0 px-6 py-2.5 bg-[#7C3AED] text-white text-sm font-semibold rounded-full hover:bg-[#6D28D9] transition-colors"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}

      {activeJob && <ApplyModal job={activeJob} onClose={() => setActiveJob(null)} />}
    </>
  );
}
