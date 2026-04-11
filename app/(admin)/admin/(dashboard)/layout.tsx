import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { getAdminSession } from "@/lib/auth";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return children;
}

