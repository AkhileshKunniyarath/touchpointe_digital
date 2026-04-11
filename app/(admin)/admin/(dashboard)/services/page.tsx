import { AdminShell } from "@/components/admin/admin-shell";
import { ResourceManager } from "@/components/admin/resource-manager";
import { resourceConfigs } from "@/lib/resource-config";
import { getCollection } from "@/lib/resource-service";

export default async function AdminServicesPage() {
  const config = resourceConfigs.services;
  const items = await getCollection("services", { status: "all" });

  return (
    <AdminShell title="Services" description="Create and manage service pages, delivery positioning, pricing signals, and featured offerings.">
      <ResourceManager
        resource="services"
        resourceLabel={config.singular}
        description={config.description}
        fields={config.extraFields}
        initialItems={items}
        emptyState={config.emptyState}
      />
    </AdminShell>
  );
}

