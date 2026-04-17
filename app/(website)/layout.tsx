import type { ReactNode } from "react";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { getCollection } from "@/lib/resource-service";

type WebsiteLayoutProps = {
  children: ReactNode;
};

export default async function WebsiteLayout({ children }: WebsiteLayoutProps) {
  const [insights, caseStudies] = await Promise.all([
    getCollection("insights", { status: "published" }),
    getCollection("case-studies", { status: "published" })
  ]);

  return (
    <div className="relative overflow-hidden bg-[#FAFAFA]">
      <Navbar insights={insights} caseStudies={caseStudies} />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
