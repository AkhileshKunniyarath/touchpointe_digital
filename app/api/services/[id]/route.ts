import type { NextRequest } from "next/server";

import { handleItemDelete, handleItemPut } from "@/lib/resource-route-handlers";

type ServiceItemRouteProps = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, { params }: ServiceItemRouteProps) {
  return handleItemPut(request, "services", params.id);
}

export async function DELETE(_: NextRequest, { params }: ServiceItemRouteProps) {
  return handleItemDelete("services", params.id);
}

