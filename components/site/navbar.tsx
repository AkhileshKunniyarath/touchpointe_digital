"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function Navbar({ services = [] }: { services?: any[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 pt-6 pb-2 pointer-events-none">
      <header
        className={cn(
          "w-full max-w-[1280px] bg-white rounded-xl pointer-events-auto transition-all duration-300",
          "flex items-center justify-between px-6 lg:px-8 py-3.5",
          scrolled
            ? "shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            : "shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative h-7 w-7 sm:h-8 sm:w-8 overflow-hidden rounded-md group-hover:scale-105 transition-transform">
            <Image src="/brand/logo.jpeg" alt={siteConfig.name} fill className="object-cover" />
          </div>
          <span className="font-semibold text-lg lg:text-[22px] tracking-tight text-slate-900 flex items-center">
            touchpointe<span className="text-[#7C3AED]">.</span>
          </span>
        </Link>

        {/* Desktop nav — driven by siteConfig */}
        <nav className="hidden lg:flex items-center ml-auto">
          <ul className="flex items-center gap-5 xl:gap-7">
            {siteConfig.nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              if (item.label === "Services" && services.length > 0) {
                return (
                  <li key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      className={cn(
                        "text-[13.5px] font-medium transition-all duration-200 flex items-center gap-1",
                        active
                          ? "text-[#7C3AED]"
                          : "text-slate-500 hover:text-slate-900"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:transform group-hover:rotate-180 transition-transform duration-200" />
                    </Link>
                    <div className="absolute top-full -left-4 pt-5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                      <div className="bg-white rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden w-[360px] p-2.5 flex flex-col gap-1 ring-1 ring-black/5">
                        <Link 
                          href="/services"
                          className="px-4 py-3 hover:bg-violet-50 transition-colors rounded-lg flex items-center gap-2 text-[14px] font-bold text-[#7C3AED] mb-1 group/all"
                        >
                          Explore All Services 
                          <ArrowRight className="w-4 h-4 opacity-70 group-hover/all:translate-x-1 group-hover/all:opacity-100 transition-all" />
                        </Link>
                        {services.map((svc) => (
                          <Link
                            key={svc._id || svc.slug}
                            href={`/services/${svc.slug}`}
                            className="px-4 py-3 hover:bg-slate-50 transition-colors rounded-lg flex flex-col group/item"
                          >
                            <span className="text-sm font-semibold text-slate-800 group-hover/item:text-[#7C3AED] transition-colors">{svc.title}</span>
                            <span className="text-[12px] text-slate-500 line-clamp-1 mt-0.5 leading-snug">{svc.summary}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-[13.5px] font-medium transition-all duration-200",
                      active
                        ? "text-[#7C3AED]"
                        : "text-slate-500 hover:text-slate-900"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4 ml-8 pl-8 border-l border-slate-200 h-6">
            <Link
              href="/contact"
              className="text-[13.5px] font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors px-4 py-1.5 rounded-lg"
            >
              Contact
            </Link>
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((c) => !c)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 lg:hidden hover:bg-slate-50 transition-colors"
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-[85px] left-4 right-4 bg-white rounded-xl shadow-xl border border-slate-100 lg:hidden pointer-events-auto overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col py-2">
            {siteConfig.nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              if (item.label === "Services" && services.length > 0) {
                 return (
                  <div key={item.href} className="flex flex-col border-b border-slate-50 last:border-0">
                    <Link
                      href={item.href}
                      className={cn(
                        "px-6 pt-3.5 pb-2 text-sm font-semibold transition-colors flex items-center justify-between",
                        active ? "text-[#7C3AED]" : "text-slate-900"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                    <div className="flex flex-col pl-6 pb-2 w-full">
                      {services.map((svc) => (
                        <Link
                          key={svc._id || svc.slug}
                          href={`/services/${svc.slug}`}
                          className="px-6 py-2.5 text-sm text-slate-500 hover:text-[#7C3AED] transition-colors relative"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute left-1 top-[18px] w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                          {svc.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                 );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-6 py-3.5 text-sm font-medium transition-colors border-b border-slate-50 last:border-0",
                    active
                      ? "text-[#7C3AED] bg-violet-50/50"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 mt-2">
              <Link
                href="/contact"
                className="block w-full py-2.5 text-center text-sm font-semibold text-white bg-[#7C3AED] rounded-lg hover:bg-[#6D28D9] transition-colors"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
