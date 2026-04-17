"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FolderKanban, Lightbulb, Activity, Briefcase, Inbox } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "System Overview", icon: BarChart3 },
  { href: "/admin/insights", label: "Insights", icon: Lightbulb },
  { href: "/admin/case-studies", label: "Case Studies", icon: FolderKanban },
  { href: "/admin/careers", label: "Career Openings", icon: Briefcase },
  { href: "/admin/submissions", label: "Form Submissions", icon: Inbox },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col shadow-sm">
      <div className="p-8 flex items-center gap-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#9333EA] flex items-center justify-center shadow-sm">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Touchpointe</h2>
          <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-black mt-0.5">Admin Server</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-8 px-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 rounded-xl px-4 py-4 text-sm font-semibold transition-all duration-300 relative group",
                active ? "text-[#7C3AED] bg-violet-50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              {active && <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-[#7C3AED]" />}
              <item.icon className={cn("w-5 h-5 transition-colors", active ? "text-[#7C3AED]" : "group-hover:text-slate-400")} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
