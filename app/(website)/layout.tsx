import type { ReactNode } from "react";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { getCollection } from "@/lib/resource-service";

type WebsiteLayoutProps = {
  children: ReactNode;
};

export default async function WebsiteLayout({ children }: WebsiteLayoutProps) {
  const services = await getCollection("services", { status: "published" });

  return (
    <div className="relative overflow-hidden bg-[#FAFAFA]">
      <Navbar services={services} />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
