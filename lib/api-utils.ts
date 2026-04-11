import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { authOptions } from "@/lib/auth";

export async function requireAdminRequest() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

export function handleApiError(error: unknown, fallbackMessage = "Request failed.") {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: error.issues[0]?.message || fallbackMessage }, { status: 400 });
  }

  if (typeof error === "object" && error && "code" in error && error.code === 11000) {
    return NextResponse.json({ error: "A record with this slug already exists." }, { status: 409 });
  }

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message || fallbackMessage }, { status: 500 });
  }

  return NextResponse.json({ error: fallbackMessage }, { status: 500 });
}

