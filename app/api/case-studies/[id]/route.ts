import type { NextRequest } from "next/server";

import { handleItemDelete, handleItemPut } from "@/lib/resource-route-handlers";

type CaseStudyItemRouteProps = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, { params }: CaseStudyItemRouteProps) {
  return handleItemPut(request, "case-studies", params.id);
}

export async function DELETE(_: NextRequest, { params }: CaseStudyItemRouteProps) {
  return handleItemDelete("case-studies", params.id);
}
