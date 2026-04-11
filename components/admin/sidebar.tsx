"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpenText, BriefcaseBusiness, FolderKanban, ImageIcon, Lightbulb, Package, LayoutTemplate, Activity, Briefcase } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "System Overview", icon: BarChart3 },
  { href: "/admin/homepage", label: "Homepage Configurations", icon: LayoutTemplate },
  { href: "/admin/careers", label: "Global Careers", icon: Briefcase },
  { href: "/admin/services", label: "Services Registry", icon: BriefcaseBusiness },
  { href: "/admin/products", label: "Product Systems", icon: Package },
  { href: "/admin/blogs", label: "Editorial Content", icon: BookOpenText },
  { href: "/admin/insights", label: "Deep Insights", icon: Lightbulb },
  { href: "/admin/case-studies", label: "Case Studies", icon: FolderKanban },
  { href: "/admin/media", label: "Global Media CDN", icon: ImageIcon }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-[#020202] border-r border-white/5 hidden lg:flex flex-col shadow-2xl">
      <div className="p-8 flex items-center gap-4 border-b border-white/5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Touchpointe</h2>
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
                active ? "text-white bg-blue-500/10 border border-blue-500/20" : "text-slate-400 border border-transparent hover:text-white hover:bg-white/[0.02]"
              )}
            >
              {active && <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />}
              <item.icon className={cn("w-5 h-5 transition-colors", active ? "text-blue-400" : "group-hover:text-slate-300")} />
              {item.label}
            </Link>
          );
        })}
      </div>
      
      <div className="p-6 border-t border-white/5">
         <div className="w-full bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 p-5 rounded-2xl relative overflow-hidden group hover:border-blue-500/40 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-blue-500/20 transition-all" />
            <p className="text-[10px] text-blue-400 font-extrabold uppercase tracking-[0.2em] mb-1">Live Status</p>
            <p className="text-sm text-white font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span> Clusters Online</p>
         </div>
      </div>
    </aside>
  );
}
