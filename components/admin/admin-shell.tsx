import Link from "next/link";
import type { ReactNode } from "react";

import { SignOutButton } from "@/components/admin/sign-out-button";
import { Sidebar } from "@/components/admin/sidebar";
import { ExternalLink, Zap } from "lucide-react";

type AdminShellProps = {
  children: ReactNode;
  title: string;
  description: string;
};

export function AdminShell({ children, title, description }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[#030303] flex font-sans">
      <Sidebar />
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 transition-all duration-300 relative z-10 w-full">
        
        {/* PREMIUM TOP HEADER */}
        <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-[#030303]/80 border-b border-white/5 py-4 px-6 lg:px-12 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                 <Zap className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-white font-bold tracking-wide">CMS Engine Core</h2>
           </div>
           
           <div className="flex items-center gap-4">
              <Link href="/" target="_blank" className="text-sm font-semibold text-slate-400 hover:text-white flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
                <ExternalLink className="w-4 h-4" /> Live Site
              </Link>
              <div className="h-6 w-px bg-white/10 mx-2" />
              <SignOutButton />
           </div>
        </header>

        {/* CONTENT AREA */}
        <main className="flex-1 p-6 lg:p-12 mb-24 max-w-[1600px] w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="mb-12">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> Workspace Context
             </div>
             <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">{title}</h1>
             <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">{description}</p>
           </div>
           
           <div className="relative">
             {children}
           </div>
        </main>
      </div>
    </div>
  );
}
