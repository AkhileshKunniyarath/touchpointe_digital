import { AdminShell } from "@/components/admin/admin-shell";
import { ResourceManager } from "@/components/admin/resource-manager";
import { resourceConfigs } from "@/lib/resource-config";
import { getCollection } from "@/lib/resource-service";

export default async function AdminInsightsPage() {
  const config = resourceConfigs.insights;
  const items = await getCollection("insights", { status: "all" });

  return (
    <AdminShell title="Insights" description="Publish sharper point-of-view pieces and strategic commentary with the same structured workflow.">
      <ResourceManager
        resource="insights"
        resourceLabel={config.singular}
        description={config.description}
        fields={config.extraFields}
        initialItems={items}
        emptyState={config.emptyState}
      />
    </AdminShell>
  );
}

