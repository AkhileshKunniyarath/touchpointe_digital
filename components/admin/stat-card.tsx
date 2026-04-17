type StatCardProps = {
  label: string;
  value: number | string;
  description: string;
};

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div className="surface p-6">
      <p className="text-sm uppercase tracking-[0.24em] text-[#7C3AED] font-semibold">{label}</p>
      <p className="mt-4 text-4xl font-semibold text-slate-900">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

