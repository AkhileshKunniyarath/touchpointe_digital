import type { NextRequest } from "next/server";
import { handleCollectionGet, handleCollectionPost } from "@/lib/resource-route-handlers";

export async function GET(request: NextRequest) {
  return handleCollectionGet(request, "careers");
}

export async function POST(request: NextRequest) {
  return handleCollectionPost(request, "careers");
}
