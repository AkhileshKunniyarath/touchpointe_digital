import { Client } from "minio";

import type { MediaAsset } from "@/lib/content-types";

let cachedClient: Client | null | undefined;

function minioConfig() {
  const endPoint = process.env.MINIO_ENDPOINT;
  const port = Number(process.env.MINIO_PORT || "443");
  const useSSL = String(process.env.MINIO_USE_SSL || "true") === "true";
  const accessKey = process.env.MINIO_ACCESS_KEY;
  const secretKey = process.env.MINIO_SECRET_KEY;
  const bucket = process.env.MINIO_BUCKET;

  if (!endPoint || !accessKey || !secretKey || !bucket) {
    return null;
  }

  return {
    endPoint,
    port,
    useSSL,
    accessKey,
    secretKey,
    bucket
  };
}

export function getMinioClient() {
  const config = minioConfig();

  if (!config) {
    return null;
  }

  if (cachedClient !== undefined) {
    return cachedClient;
  }

  cachedClient = new Client({
    endPoint: config.endPoint,
    port: config.port,
    useSSL: config.useSSL,
    accessKey: config.accessKey,
    secretKey: config.secretKey
  });

  return cachedClient;
}

async function ensureBucketExists(client: Client) {
  const config = minioConfig();

  if (!config) {
    throw new Error("Missing MinIO configuration.");
  }

  const exists = await client.bucketExists(config.bucket);

  if (!exists) {
    await client.makeBucket(config.bucket);
  }

  // Set public read policy so uploaded assets are accessible via direct URL
  const publicReadPolicy = JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { AWS: ["*"] },
        Action: ["s3:GetObject"],
        Resource: [`arn:aws:s3:::${config.bucket}/*`]
      }
    ]
  });

  try {
    await client.setBucketPolicy(config.bucket, publicReadPolicy);
  } catch {
    // Non-fatal: policy may already be set or permissions may differ
  }

  return config.bucket;
}

export function getPublicObjectUrl(objectKey: string) {
  const config = minioConfig();

  if (!config) {
    return "";
  }

  const protocol = config.useSSL ? "https" : "http";
  const portPart =
    (config.useSSL && config.port === 443) || (!config.useSSL && config.port === 80) ? "" : `:${config.port}`;

  return `${protocol}://${config.endPoint}${portPart}/${config.bucket}/${objectKey}`;
}

export async function uploadAsset(
  objectKey: string,
  buffer: Buffer,
  contentType: string
) {
  const client = getMinioClient();

  if (!client) {
    throw new Error("MinIO is not configured.");
  }

  const bucket = await ensureBucketExists(client);

  await client.putObject(bucket, objectKey, buffer, buffer.length, {
    "Content-Type": contentType
  });

  return {
    key: objectKey,
    url: getPublicObjectUrl(objectKey)
  };
}

export async function listMediaAssets(prefix = ""): Promise<MediaAsset[]> {
  const client = getMinioClient();
  const config = minioConfig();

  if (!client || !config) {
    return [];
  }

  await ensureBucketExists(client);

  return new Promise((resolve, reject) => {
    const items: MediaAsset[] = [];
    const stream = client.listObjectsV2(config.bucket, prefix, true);

    stream.on("data", (item) => {
      if (!item.name) {
        return;
      }

      items.push({
        key: item.name,
        url: getPublicObjectUrl(item.name),
        lastModified: item.lastModified ? new Date(item.lastModified).toISOString() : undefined,
        size: item.size
      });
    });

    stream.on("error", reject);
    stream.on("end", () => resolve(items.sort((a, b) => (b.lastModified || "").localeCompare(a.lastModified || ""))));
  });
}

