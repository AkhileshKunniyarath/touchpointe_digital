"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  return (
    <form
      className="surface-strong grid gap-5 p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setErrorMessage("");
        setIsPending(true);

        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") || "");
        const password = String(formData.get("password") || "");
        const callbackUrl = searchParams.get("callbackUrl") || "/admin";

        startTransition(async () => {
          const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl
          });

          if (result?.error) {
            setErrorMessage("Login failed. Check the admin credentials and try again.");
            setIsPending(false);
            return;
          }

          router.push(callbackUrl);
          router.refresh();
        });
      }}
    >
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.24em] text-[#7C3AED] font-semibold">Secure Login</p>
        <h1 className="text-3xl font-semibold text-slate-900">Admin sign in</h1>
        <p className="text-sm leading-6 text-slate-500">
          Use the configured bootstrap admin credentials to manage Touchpointe content.
        </p>
      </div>
      <Input type="email" name="email" placeholder="Admin email" required />
      <Input type="password" name="password" placeholder="Password" required />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
      {errorMessage ? <p className="text-sm text-rose-500">{errorMessage}</p> : null}
    </form>
  );
}

