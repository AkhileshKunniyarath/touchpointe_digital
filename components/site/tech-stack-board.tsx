import { techStackGroups } from "@/lib/seed-data";

export function TechStackBoard() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {techStackGroups.map((group) => (
        <div key={group.label} className="surface p-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#7C3AED]">{group.label}</p>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span key={item} className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-sm text-slate-700">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
