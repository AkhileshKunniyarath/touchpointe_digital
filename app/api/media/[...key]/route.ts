import { NextRequest, NextResponse } from "next/server";

import { handleApiError } from "@/lib/api-utils";
import { getAssetBuffer } from "@/lib/minio";

export const runtime = "nodejs";

type MediaRouteContext = {
  params: {
    key: string[];
  };
};

export async function GET(_request: NextRequest, { params }: MediaRouteContext) {
  try {
    const segments = params.key || [];

    if (!segments.length) {
      return NextResponse.json({ error: "Asset key is required." }, { status: 400 });
    }

    if (segments.some((segment) => segment.includes(".."))) {
      return NextResponse.json({ error: "Invalid asset key." }, { status: 400 });
    }

    const objectKey = segments.map((segment) => decodeURIComponent(segment)).join("/");
    const asset = await getAssetBuffer(objectKey);

    return new NextResponse(asset.buffer, {
      headers: {
        "Content-Type": asset.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        ...(asset.lastModified ? { "Last-Modified": asset.lastModified.toUTCString() } : {})
      }
    });
  } catch (error) {
    if (typeof error === "object" && error && "code" in error) {
      const code = String((error as { code?: string }).code || "");
      if (code === "NotFound" || code === "NoSuchKey") {
        return NextResponse.json({ error: "Asset not found." }, { status: 404 });
      }
    }

    return handleApiError(error, "Unable to load media asset.");
  }
}

