import { NextRequest, NextResponse } from "next/server";

import { handleApiError, requireAdminRequest } from "@/lib/api-utils";
import { listMediaAssets, uploadAsset } from "@/lib/minio";

export const runtime = "nodejs";

function sanitizeFileName(fileName: string) {
  return fileName.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
}

export async function GET(request: NextRequest) {
  try {
    const unauthorized = await requireAdminRequest();

    if (unauthorized) {
      return unauthorized;
    }

    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get("prefix") || "";
    const assets = await listMediaAssets(prefix);

    return NextResponse.json({ assets });
  } catch (error) {
    return handleApiError(error, "Unable to load media assets.");
  }
}

export async function POST(request: NextRequest) {
  try {
    const unauthorized = await requireAdminRequest();

    if (unauthorized) {
      return unauthorized;
    }

    const formData = await request.formData();
    const folder = String(formData.get("folder") || "touchpointe").replace(/^\/+|\/+$/g, "");
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const objectKey = `${folder}/${Date.now()}-${sanitizeFileName(file.name)}`;
    const asset = await uploadAsset(objectKey, buffer, file.type || "application/octet-stream");

    return NextResponse.json({ asset }, { status: 201 });
  } catch (error) {
    return handleApiError(error, "Unable to upload asset.");
  }
}

