import { AdminShell } from "@/components/admin/admin-shell";
import { connectToDatabase } from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";
import JobApplication from "@/models/JobApplication";
import { formatDate } from "@/lib/utils";

function serialize<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

async function getSubmissions() {
  try {
    await connectToDatabase();
    const [contacts, applications] = await Promise.all([
      ContactSubmission.find({}).sort({ createdAt: -1 }).lean(),
      JobApplication.find({}).sort({ createdAt: -1 }).lean(),
    ]);
    return {
      contacts: serialize(contacts) as any[],
      applications: serialize(applications) as any[],
    };
  } catch {
    return { contacts: [], applications: [] };
  }
}

export const revalidate = 0;

export default async function SubmissionsPage() {
  const { contacts, applications } = await getSubmissions();

  return (
    <AdminShell
      title="Form Submissions"
      description="View all contact enquiries and job applications submitted through the website."
    >
      <div className="grid gap-8">

        {/* Contact Enquiries */}
        <div className="surface-strong p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#7C3AED] font-semibold">Contact Enquiries</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {contacts.length} submission{contacts.length !== 1 ? "s" : ""}
              </h2>
            </div>
          </div>

          {contacts.length === 0 ? (
            <div className="surface p-6 text-center text-sm text-slate-400">No contact submissions yet.</div>
          ) : (
            <div className="grid gap-4">
              {contacts.map((c: any) => (
                <div key={c._id} className="surface p-5 grid gap-2">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="font-semibold text-slate-900">{c.name}</p>
                      <p className="text-sm text-slate-500">{c.email}{c.phone ? ` · ${c.phone}` : ""}{c.company ? ` · ${c.company}` : ""}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-block rounded-full border border-violet-200 bg-violet-50 px-3 py-0.5 text-xs font-semibold text-[#7C3AED]">
                        {c.serviceInterest || "General"}
                      </span>
                      <p className="text-xs text-slate-400 mt-1">{formatDate(c.createdAt)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 mt-1">{c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Job Applications */}
        <div className="surface-strong p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#7C3AED] font-semibold">Job Applications</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {applications.length} application{applications.length !== 1 ? "s" : ""}
              </h2>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="surface p-6 text-center text-sm text-slate-400">No job applications yet.</div>
          ) : (
            <div className="grid gap-4">
              {applications.map((a: any) => (
                <div key={a._id} className="surface p-5 grid gap-2">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="font-semibold text-slate-900">{a.name}</p>
                      <p className="text-sm text-slate-500">{a.email}{a.phone ? ` · ${a.phone}` : ""}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-block rounded-full border border-violet-200 bg-violet-50 px-3 py-0.5 text-xs font-semibold text-[#7C3AED]">
                        {a.jobTitle}
                      </span>
                      <p className="text-xs text-slate-400 mt-1">{formatDate(a.createdAt)}</p>
                    </div>
                  </div>
                  {a.coverLetter && (
                    <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 mt-1">{a.coverLetter}</p>
                  )}
                  {a.resumeUrl && (
                    <a
                      href={a.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-[#7C3AED] hover:underline w-fit"
                    >
                      View Resume / CV →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
