import { AdminShell } from "@/components/admin/admin-shell";
import { ResourceManager } from "@/components/admin/resource-manager";
import { resourceConfigs } from "@/lib/resource-config";
import { getCollection } from "@/lib/resource-service";

export default async function AdminProductsPage() {
  const config = resourceConfigs.products;
  const items = await getCollection("products", { status: "all" });

  return (
    <AdminShell title="Products" description="Shape repeatable offers, growth products, and launch-stage messaging from one place.">
      <ResourceManager
        resource="products"
        resourceLabel={config.singular}
        description={config.description}
        fields={config.extraFields}
        initialItems={items}
        emptyState={config.emptyState}
      />
    </AdminShell>
  );
}

