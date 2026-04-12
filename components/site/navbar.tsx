"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#030303]/40 backdrop-blur-2xl border-b border-white/10 h-[90px] flex items-center transition-all">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center relative gap-4">
        <Link href="/" className="flex items-center gap-3 relative z-10">
          <Image
            src="/brand/logo.jpeg"
            alt={`${siteConfig.name} logo`}
            width={40}
            height={40}
            className="rounded-xl border border-white/10 shadow-[0_0_18px_rgba(59,130,246,0.25)]"
            priority
          />
          <p className="font-sans text-xl font-semibold text-white tracking-wide">Touchpointe Digital</p>
        </Link>

        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-12 z-10">
          {siteConfig.nav.map((item) => {
            const isActive = isActiveRoute(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[15px] transition-colors relative",
                  isActive ? "text-white font-medium" : "text-[#A1A1AA] hover:text-white"
                )}
              >
                {item.label}
                {isActive ? <span className="absolute bottom-[-10px] left-0 w-full h-[2px] bg-blue-500" /> : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex relative z-10">
          <Link href="/contact" className="text-lg font-bold text-white hover:text-blue-400 transition-colors">
            Let&apos;s talk
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-slate-950/95 lg:hidden">
          <div className="container grid gap-2 py-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm transition",
                  isActiveRoute(item.href)
                    ? "bg-blue-500/15 text-white border border-blue-500/30"
                    : "text-slate-200 hover:bg-white/5 border border-transparent"
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/admin" className="rounded-2xl px-4 py-3 text-sm text-slate-200" onClick={() => setOpen(false)}>
              Admin
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
