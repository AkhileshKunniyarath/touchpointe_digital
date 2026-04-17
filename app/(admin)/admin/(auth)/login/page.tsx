import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { getAdminSession } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <div className="container grid min-h-screen items-center py-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="hidden max-w-xl space-y-5 lg:block">
        <p className="text-sm uppercase tracking-[0.24em] text-[#7C3AED] font-semibold">Touchpointe CMS</p>
        <h1 className="text-5xl font-semibold text-slate-900">Publishing control for a full digital platform.</h1>
        <p className="text-lg leading-8 text-slate-500">
          Manage services, products, blogs, insights, case studies, and media from one secure interface.
        </p>
      </div>
      <div className="mx-auto w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}

