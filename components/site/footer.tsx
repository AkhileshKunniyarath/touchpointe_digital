import Link from "next/link";
import { Linkedin, Twitter, Instagram } from "lucide-react";

import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <div className="container grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-200">Touchpointe</p>
          <h2 className="max-w-xl text-3xl font-semibold text-white">Build a website system your team can actually grow with.</h2>
          <p className="max-w-xl text-slate-300">
            Strategy, UX, engineering, admin tooling, and content structure designed as one connected experience.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Navigation</p>
            <div className="grid gap-2">
              {siteConfig.nav.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Admin</p>
            <div className="grid gap-2">
              <Link href="/admin" className="text-sm text-slate-300 transition hover:text-white">
                Dashboard
              </Link>
              <Link href="/admin/media" className="text-sm text-slate-300 transition hover:text-white">
                Media Library
              </Link>
              <p className="text-sm text-slate-400">{siteConfig.adminEmail}</p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Social</p>
            <div className="grid gap-2">
              <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href={siteConfig.links.x} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
                <Twitter className="w-4 h-4" /> X / Twitter
              </a>
              <a href={siteConfig.links.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
                <Instagram className="w-4 h-4" /> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

