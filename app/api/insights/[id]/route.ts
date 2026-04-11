import type { NextRequest } from "next/server";

import { handleItemDelete, handleItemPut } from "@/lib/resource-route-handlers";

type InsightItemRouteProps = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, { params }: InsightItemRouteProps) {
  return handleItemPut(request, "insights", params.id);
}

export async function DELETE(_: NextRequest, { params }: InsightItemRouteProps) {
  return handleItemDelete("insights", params.id);
}

