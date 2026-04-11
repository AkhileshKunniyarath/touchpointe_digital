import { AdminShell } from "@/components/admin/admin-shell";
import { ResourceManager } from "@/components/admin/resource-manager";
import { resourceConfigs } from "@/lib/resource-config";
import { getCollection } from "@/lib/resource-service";

export const revalidate = 0;

export default async function CareersAdminPage() {
  const config = resourceConfigs["careers"];
  const dbItems = await getCollection("careers", { status: "all" });

  return (
    <AdminShell title={config.label} description={config.headline}>
      <ResourceManager
        resource="careers"
        resourceLabel={config.singular}
        description={config.description}
        emptyState={config.emptyState}
        fields={config.extraFields}
        initialItems={dbItems as any}
      />
    </AdminShell>
  );
}
