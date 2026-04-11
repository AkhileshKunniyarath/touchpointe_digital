import { AdminShell } from "@/components/admin/admin-shell";
import { ResourceManager } from "@/components/admin/resource-manager";
import { resourceConfigs } from "@/lib/resource-config";
import { getCollection } from "@/lib/resource-service";

export default async function AdminBlogsPage() {
  const config = resourceConfigs.blogs;
  const items = await getCollection("blogs", { status: "all" });

  return (
    <AdminShell title="Blogs" description="Manage educational content, search-ready articles, and featured editorial stories.">
      <ResourceManager
        resource="blogs"
        resourceLabel={config.singular}
        description={config.description}
        fields={config.extraFields}
        initialItems={items}
        emptyState={config.emptyState}
      />
    </AdminShell>
  );
}

