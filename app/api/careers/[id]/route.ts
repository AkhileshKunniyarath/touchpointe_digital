import type { NextRequest } from "next/server";
import { handleItemPut, handleItemDelete } from "@/lib/resource-route-handlers";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  return handleItemPut(request, "careers", params.id);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  return handleItemDelete("careers", params.id);
}
