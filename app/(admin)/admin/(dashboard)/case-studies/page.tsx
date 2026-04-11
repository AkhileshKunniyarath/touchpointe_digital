import { AdminShell } from "@/components/admin/admin-shell";
import { ResourceManager } from "@/components/admin/resource-manager";
import { resourceConfigs } from "@/lib/resource-config";
import { getCollection } from "@/lib/resource-service";

export default async function AdminCaseStudiesPage() {
  const config = resourceConfigs["case-studies"];
  const items = await getCollection("case-studies", { status: "all" });

  return (
    <AdminShell title="Case Studies" description="Capture challenge, solution, proof, and stack details for outcome-driven project stories.">
      <ResourceManager
        resource="case-studies"
        resourceLabel={config.singular}
        description={config.description}
        fields={config.extraFields}
        initialItems={items}
        emptyState={config.emptyState}
      />
    </AdminShell>
  );
}

