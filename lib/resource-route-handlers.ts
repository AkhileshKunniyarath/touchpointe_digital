import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest, handleApiError } from "@/lib/api-utils";
import type { ResourceKey } from "@/lib/content-types";
import { createResource, deleteResource, getCollection, updateResource } from "@/lib/resource-service";

export async function handleCollectionGet(request: NextRequest, resource: ResourceKey) {
  try {
    const { searchParams } = new URL(request.url);
    const status = (searchParams.get("status") as "all" | "published" | "draft" | null) || "published";

    if (status !== "published") {
      const unauthorized = await requireAdminRequest();

      if (unauthorized) {
        return unauthorized;
      }
    }

    const items = await getCollection(resource, {
      status,
      query: searchParams.get("q") || undefined,
      category: searchParams.get("category") || undefined
    });

    return NextResponse.json({ items });
  } catch (error) {
    return handleApiError(error, "Unable to fetch items.");
  }
}

export async function handleCollectionPost(request: NextRequest, resource: ResourceKey) {
  try {
    const unauthorized = await requireAdminRequest();

    if (unauthorized) {
      return unauthorized;
    }

    const payload = await request.json();
    const item = await createResource(resource, payload);

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return handleApiError(error, "Unable to create item.");
  }
}

export async function handleItemPut(request: NextRequest, resource: ResourceKey, id: string) {
  try {
    const unauthorized = await requireAdminRequest();

    if (unauthorized) {
      return unauthorized;
    }

    const payload = await request.json();
    const item = await updateResource(resource, id, payload);

    if (!item) {
      return NextResponse.json({ error: "Item not found." }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch (error) {
    return handleApiError(error, "Unable to update item.");
  }
}

export async function handleItemDelete(resource: ResourceKey, id: string) {
  try {
    const unauthorized = await requireAdminRequest();

    if (unauthorized) {
      return unauthorized;
    }

    await deleteResource(resource, id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error, "Unable to delete item.");
  }
}

