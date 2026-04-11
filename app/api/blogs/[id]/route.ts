import type { NextRequest } from "next/server";

import { handleItemDelete, handleItemPut } from "@/lib/resource-route-handlers";

type BlogItemRouteProps = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, { params }: BlogItemRouteProps) {
  return handleItemPut(request, "blogs", params.id);
}

export async function DELETE(_: NextRequest, { params }: BlogItemRouteProps) {
  return handleItemDelete("blogs", params.id);
}

