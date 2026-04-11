import { AdminShell } from "@/components/admin/admin-shell";
import { MediaLibrary } from "@/components/admin/media-library";
import { listMediaAssets } from "@/lib/minio";

export default async function AdminMediaPage() {
  const assets = await listMediaAssets();

  return (
    <AdminShell title="Media Library" description="Upload and reuse brand assets, case study visuals, and editorial images through MinIO-backed storage.">
      <MediaLibrary initialAssets={assets} />
    </AdminShell>
  );
}
