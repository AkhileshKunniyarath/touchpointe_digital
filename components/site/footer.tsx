import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Instagram } from "lucide-react";

import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 lg:grid-cols-[1.4fr_0.6fr_0.6fr_0.6fr]">
        <div className="space-y-4 max-w-xs">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/20">
              <Image src="/brand/logo.jpeg" alt="Touchpointe" width={36} height={36} className="object-cover" />
            </div>
            <span className="font-bold text-white">Touchpointe Digital</span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            Strategy, UX, engineering, admin tooling, and content structure designed as one connected experience.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:bg-[#7C3AED] hover:text-white hover:border-[#7C3AED] transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={siteConfig.links.x} target="_blank" rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:bg-[#7C3AED] hover:text-white hover:border-[#7C3AED] transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href={siteConfig.links.instagram} target="_blank" rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:bg-[#7C3AED] hover:text-white hover:border-[#7C3AED] transition-all">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Navigation</p>
          <div className="grid gap-2">
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Admin</p>
          <div className="grid gap-2">
            <Link href="/admin" className="text-sm text-slate-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/admin/media" className="text-sm text-slate-400 hover:text-white transition-colors">Media Library</Link>
            <p className="text-sm text-slate-500">{siteConfig.adminEmail}</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Contact</p>
          <div className="grid gap-2">
            <Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">Get in touch</Link>
            <Link href="/career" className="text-sm text-slate-400 hover:text-white transition-colors">Careers</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} Touchpointe Digital. All rights reserved.</span>
          <span>Built with precision &amp; purpose.</span>
        </div>
      </div>
    </footer>
  );
}
