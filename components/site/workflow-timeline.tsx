import { workflowSteps } from "@/lib/seed-data";

export function WorkflowTimeline() {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {workflowSteps.map((step, index) => (
        <div key={step.title} className="surface relative overflow-hidden p-6 group">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="mb-3 text-xs font-black text-[#7C3AED]/20 group-hover:text-[#7C3AED] transition-colors tabular-nums">
            0{index + 1}
          </p>
          <h3 className="text-sm font-semibold text-slate-900">{step.title}</h3>
          <p className="mt-2 text-xs leading-6 text-slate-500">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
