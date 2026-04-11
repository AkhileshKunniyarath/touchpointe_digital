import { techStackGroups } from "@/lib/seed-data";

export function TechStackBoard() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {techStackGroups.map((group) => (
        <div key={group.label} className="surface p-6">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-sky-200">{group.label}</p>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

