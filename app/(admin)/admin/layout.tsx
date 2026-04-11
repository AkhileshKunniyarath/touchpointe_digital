import type { ReactNode } from "react";

type AdminRootLayoutProps = {
  children: ReactNode;
};

export default function AdminRootLayout({ children }: AdminRootLayoutProps) {
  return <div className="min-h-screen bg-background">{children}</div>;
}

