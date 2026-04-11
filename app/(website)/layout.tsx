import type { ReactNode } from "react";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";

type WebsiteLayoutProps = {
  children: ReactNode;
};

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 bg-touchpointe-radial opacity-80" />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
