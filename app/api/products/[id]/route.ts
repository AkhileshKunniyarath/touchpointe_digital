import type { NextRequest } from "next/server";

import { handleItemDelete, handleItemPut } from "@/lib/resource-route-handlers";

type ProductItemRouteProps = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, { params }: ProductItemRouteProps) {
  return handleItemPut(request, "products", params.id);
}

export async function DELETE(_: NextRequest, { params }: ProductItemRouteProps) {
  return handleItemDelete("products", params.id);
}

