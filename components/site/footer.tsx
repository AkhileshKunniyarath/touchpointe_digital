import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";

import { getCollection } from "@/lib/resource-service";
import { siteConfig } from "@/lib/site";

export async function Footer() {
  const [services, products] = await Promise.all([
    getCollection("services", { status: "published" }),
    getCollection("products", { status: "published" })
  ]);

  const sortedServices = [...services].sort((a, b) => a.title.localeCompare(b.title));
  const midpoint = Math.ceil(sortedServices.length / 2);
  const serviceColumns = [sortedServices.slice(0, midpoint), sortedServices.slice(midpoint)];

  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="container py-10 sm:py-12">
        <div className="grid items-start gap-10 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr_1.7fr_0.95fr]">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/brand/logo.jpeg" alt={`${siteConfig.name} logo`} width={42} height={42} className="rounded-xl" />
              <span className="text-xl font-semibold text-white">Touchpointe Digital</span>
            </Link>
            <p className="max-w-md text-sm leading-7 text-slate-300">
              Strategy, UX, engineering, and growth systems designed as one connected digital experience.
            </p>
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40"
            >
              Start a project
            </Link>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Navigation</p>
            <div className="grid gap-2">
              {siteConfig.nav.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" className="text-sm text-slate-300 transition hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Services</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {serviceColumns.map((column, index) => (
                <div key={`service-col-${index}`} className="grid gap-2">
                  {column.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="text-sm leading-6 text-slate-300 transition hover:text-white"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Products</p>
            <div className="grid gap-2">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {product.title}
                </Link>
              ))}
              <div className="mt-4 space-y-2 pt-2">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Social</p>
                <div className="flex items-center gap-4 text-slate-300">
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-white" aria-label="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={siteConfig.links.x} target="_blank" rel="noreferrer" className="transition hover:text-white" aria-label="X">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href={siteConfig.links.instagram} target="_blank" rel="noreferrer" className="transition hover:text-white" aria-label="Instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-4">
          <p className="text-xs text-slate-400">(c) {new Date().getFullYear()} Touchpointe Digital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
