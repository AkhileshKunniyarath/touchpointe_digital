import { workflowSteps } from "@/lib/seed-data";

export function WorkflowTimeline() {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {workflowSteps.map((step, index) => (
        <div key={step.title} className="surface relative overflow-hidden p-6">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 to-violet-400" />
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">0{index + 1}</p>
          <h3 className="text-xl font-semibold text-white">{step.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
        </div>
      ))}
    </div>
  );
}

