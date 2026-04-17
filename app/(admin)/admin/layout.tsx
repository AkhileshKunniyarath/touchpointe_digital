import type { ReactNode } from "react";

type AdminRootLayoutProps = {
  children: ReactNode;
};

export default function AdminRootLayout({ children }: AdminRootLayoutProps) {
  return <div className="min-h-screen bg-[#FAFAFA] selection:bg-violet-500/10">{children}</div>;
}

