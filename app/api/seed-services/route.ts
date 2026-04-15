import { NextResponse } from "next/server";

import { createResource } from "@/lib/resource-service";
import { seedServices } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

function isDuplicateError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const maybeError = error as { code?: number; message?: string };
  return maybeError.code === 11000 || /duplicate|slug/i.test(String(maybeError.message || ""));
}

export async function GET() {
  const results: Array<{ title: string; status: string }> = [];

  for (const service of seedServices) {
    try {
      await createResource("services", service as unknown as Record<string, unknown>);
      results.push({ title: service.title, status: "created" });
    } catch (error) {
      if (isDuplicateError(error)) {
        results.push({ title: service.title, status: "skipped (already exists)" });
        continue;
      }

      const message = error instanceof Error ? error.message : "Unknown error";
      results.push({ title: service.title, status: `error: ${message}` });
    }
  }

  const created = results.filter((item) => item.status === "created").length;
  const skipped = results.filter((item) => item.status.startsWith("skipped")).length;
  const errors = results.filter((item) => item.status.startsWith("error")).length;

  return NextResponse.json({
    ok: errors === 0,
    created,
    skipped,
    errors,
    total: results.length,
    results
  });
}
