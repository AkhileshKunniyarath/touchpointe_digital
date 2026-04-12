import type { Model } from "mongoose";

import type {
  DashboardSnapshot,
  ResourceCollectionMap,
  ResourceDocument,
  ResourceKey
} from "@/lib/content-types";
import { connectToDatabase } from "@/lib/mongodb";
import { localStoreCreate, localStoreDelete, localStoreGetAll, localStoreUpdate } from "@/lib/local-store";
import { resourceKeys } from "@/lib/resource-config";
import { getSeedCollection } from "@/lib/seed-data";
import { arrayFromCsv, readingTimeFromText, slugify, toDisplayImageUrl } from "@/lib/utils";
import Blog from "@/models/Blog";
import CaseStudy from "@/models/CaseStudy";
import ContactSubmission from "@/models/ContactSubmission";
import Insight from "@/models/Insight";
import Product from "@/models/Product";
import Service from "@/models/Service";
import Career from "@/models/Career";
import { blogSchema } from "@/schemas/blog";
import { careerSchema } from "@/schemas/career";
import { caseStudySchema } from "@/schemas/case-study";
import { contactSubmissionSchema } from "@/schemas/contact";
import { insightSchema } from "@/schemas/insight";
import { productSchema } from "@/schemas/product";
import { serviceSchema } from "@/schemas/service";

type ResourceFilters = {
  status?: "all" | "published" | "draft";
  featured?: boolean;
  query?: string;
  category?: string;
  limit?: number;
};

const resourceModels: Record<ResourceKey, Model<any>> = {
  services: Service,
  products: Product,
  blogs: Blog,
  insights: Insight,
  "case-studies": CaseStudy,
  careers: Career
};

const resourceSchemas = {
  services: serviceSchema,
  products: productSchema,
  blogs: blogSchema,
  insights: insightSchema,
  "case-studies": caseStudySchema,
  careers: careerSchema
};

const arrayFields: Record<ResourceKey, string[]> = {
  services: ["tags", "outcomes", "process"],
  products: ["tags", "benefits", "stack"],
  blogs: ["tags"],
  insights: ["tags"],
  "case-studies": ["tags", "results", "stack"],
  careers: ["tags"]
};

const numberFields: Partial<Record<ResourceKey, string[]>> = {
  blogs: ["readTime"],
  insights: ["readTime"]
};

let fallbackWarningShown = false;

function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function logFallback(resource: ResourceKey | "contact", error: unknown) {
  if (fallbackWarningShown) {
    return;
  }

  fallbackWarningShown = true;

  if (error instanceof Error) {
    const fallbackLabel = resource === "contact" ? "contact submissions" : resource;
    console.warn(`Database unavailable for ${fallbackLabel}; using fallback content. ${error.message}`);
    return;
  }

  const fallbackLabel = resource === "contact" ? "contact submissions" : resource;
  console.warn(`Database unavailable for ${fallbackLabel}; using fallback content.`);
}

function matchesSearch(item: ResourceDocument, query?: string) {
  if (!query) {
    return true;
  }

  const haystack = [item.title, item.summary, item.category, ...item.tags].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function filterSeedCollection<T extends ResourceKey>(
  resource: T,
  filters: ResourceFilters = {}
): ResourceCollectionMap[T] {
  let items = [...getSeedCollection(resource)];

  if (filters.status && filters.status !== "all") {
    items = items.filter((item) => item.status === filters.status);
  }

  if (typeof filters.featured === "boolean") {
    items = items.filter((item) => item.featured === filters.featured);
  }

  if (filters.category && filters.category !== "All") {
    items = items.filter((item) => item.category.toLowerCase() === filters.category?.toLowerCase());
  }

  if (filters.query) {
    items = items.filter((item) => matchesSearch(item, filters.query));
  }

  items.sort((a, b) => {
    const aDate = new Date(a.publishedAt || a.updatedAt || 0).getTime();
    const bDate = new Date(b.publishedAt || b.updatedAt || 0).getTime();
    return bDate - aDate;
  });

  if (filters.limit) {
    items = items.slice(0, filters.limit);
  }

  return items as ResourceCollectionMap[T];
}

function asBoolean(value: unknown) {
  return value === true || value === "true" || value === "on";
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown) {
  const numeric = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : undefined;
}

function normalizePayload(resource: ResourceKey, payload: Record<string, unknown>) {
  const normalized: Record<string, unknown> = {
    title: asString(payload.title),
    slug: slugify(asString(payload.slug) || asString(payload.title)),
    summary: asString(payload.summary),
    content: asString(payload.content),
    category: asString(payload.category),
    coverImage: toDisplayImageUrl(asString(payload.coverImage)),
    featured: asBoolean(payload.featured),
    status: asString(payload.status) === "draft" ? "draft" : "published",
    seoTitle: asString(payload.seoTitle),
    seoDescription: asString(payload.seoDescription),
    publishedAt: asString(payload.publishedAt)
  };

  for (const field of arrayFields[resource]) {
    normalized[field] = arrayFromCsv(payload[field] as string | string[] | undefined);
  }

  for (const field of numberFields[resource] || []) {
    normalized[field] = asNumber(payload[field]);
  }

  if (resource === "services") {
    normalized.icon = asString(payload.icon) || "Sparkles";
    normalized.priceFrom = asString(payload.priceFrom);
    normalized.ctaLabel = asString(payload.ctaLabel);
    normalized.ctaHref = asString(payload.ctaHref);
  }

  if (resource === "products") {
    normalized.launchStage = asString(payload.launchStage) || "Discovery";
    normalized.ctaLabel = asString(payload.ctaLabel);
    normalized.ctaHref = asString(payload.ctaHref);
  }

  if (resource === "blogs" || resource === "insights") {
    normalized.author = asString(payload.author) || "Touchpointe Team";
    normalized.readTime = asNumber(payload.readTime) || readingTimeFromText(asString(payload.content));
  }

  if (resource === "case-studies") {
    normalized.client = asString(payload.client);
    normalized.sector = asString(payload.sector);
    normalized.duration = asString(payload.duration);
    normalized.challenge = asString(payload.challenge);
    normalized.solution = asString(payload.solution);
  }

  if (normalized.status === "published" && !normalized.publishedAt) {
    normalized.publishedAt = new Date().toISOString();
  }

  return normalized;
}

function toDatabasePayload(payload: Record<string, unknown>) {
  return {
    ...payload,
    publishedAt: payload.publishedAt ? new Date(String(payload.publishedAt)) : undefined
  };
}

async function queryDatabase<T extends ResourceKey>(
  resource: T,
  filters: ResourceFilters = {}
): Promise<ResourceCollectionMap[T]> {
  await connectToDatabase();

  const Model = resourceModels[resource];
  const query: Record<string, unknown> = {};

  if (filters.status && filters.status !== "all") {
    query.status = filters.status;
  }

  if (typeof filters.featured === "boolean") {
    query.featured = filters.featured;
  }

  if (filters.category && filters.category !== "All") {
    query.category = filters.category;
  }

  if (filters.query) {
    query.$or = [
      { title: { $regex: filters.query, $options: "i" } },
      { summary: { $regex: filters.query, $options: "i" } },
      { category: { $regex: filters.query, $options: "i" } },
      { tags: { $regex: filters.query, $options: "i" } }
    ];
  }

  let cursor = Model.find(query).sort({
    featured: -1,
    publishedAt: -1,
    updatedAt: -1,
    createdAt: -1
  });

  if (filters.limit) {
    cursor = cursor.limit(filters.limit);
  }

  return serialize(await cursor.lean()) as unknown as ResourceCollectionMap[T];
}

export async function getCollection<T extends ResourceKey>(
  resource: T,
  filters: ResourceFilters = {}
): Promise<ResourceCollectionMap[T]> {
  try {
    return await queryDatabase(resource, filters);
  } catch (error) {
    logFallback(resource, error);

    // Merge local store items (written when DB was down) on top of seed fallback.
    // Local items take priority and are de-duped by slug.
    const seedItems = filterSeedCollection(resource, filters);
    const localItems = localStoreGetAll(resource) as unknown as ResourceCollectionMap[T];

    if (localItems.length === 0) {
      return seedItems;
    }

    const localSlugs = new Set(localItems.map((i: any) => i.slug));
    const filteredSeed = seedItems.filter((i: any) => !localSlugs.has(i.slug));

    let merged = [...localItems, ...filteredSeed] as ResourceCollectionMap[T];

    if (filters.status && filters.status !== "all") {
      merged = merged.filter((i: any) => i.status === filters.status) as ResourceCollectionMap[T];
    }

    if (filters.limit) {
      merged = merged.slice(0, filters.limit) as ResourceCollectionMap[T];
    }

    return merged;
  }
}

export async function getDocumentBySlug<T extends ResourceKey>(
  resource: T,
  slug: string,
  includeDrafts = false
): Promise<ResourceCollectionMap[T][number] | null> {
  try {
    await connectToDatabase();
    const Model = resourceModels[resource];
    const item = await Model.findOne({
      slug,
      ...(includeDrafts ? {} : { status: "published" })
    }).lean();

    return item ? (serialize(item) as unknown as ResourceCollectionMap[T][number]) : null;
  } catch (error) {
    logFallback(resource, error);

    // Check local store first — it has the most up-to-date saved data.
    const localItems = localStoreGetAll(resource);
    const localMatch = localItems.find(
      (item: any) => item.slug === slug && (includeDrafts ? true : item.status === "published")
    );

    if (localMatch) {
      return localMatch as unknown as ResourceCollectionMap[T][number];
    }

    return (
      getSeedCollection(resource).find(
        (item) => item.slug === slug && (includeDrafts ? true : item.status === "published")
      ) || null
    );
  }
}

export async function getDocumentById<T extends ResourceKey>(
  resource: T,
  id: string
): Promise<ResourceCollectionMap[T][number] | null> {
  try {
    await connectToDatabase();
    const Model = resourceModels[resource];
    const item = await Model.findById(id).lean();
    return item ? (serialize(item) as unknown as ResourceCollectionMap[T][number]) : null;
  } catch {
    // Fallback: check local store by _id
    const localItems = localStoreGetAll(resource);
    const localMatch = localItems.find((item: any) => item._id === id);
    return localMatch as unknown as ResourceCollectionMap[T][number] | null;
  }
}

export async function createResource<T extends ResourceKey>(
  resource: T,
  payload: Record<string, unknown>
): Promise<ResourceCollectionMap[T][number]> {
  const normalized = normalizePayload(resource, payload);
  const parsed = resourceSchemas[resource].parse(normalized);

  try {
    await connectToDatabase();
    const Model = resourceModels[resource];
    const created = await Model.create(toDatabasePayload(parsed));
    return serialize(created.toObject()) as unknown as ResourceCollectionMap[T][number];
  } catch (error) {
    logFallback(resource, error);
    console.warn(`[local-store] MongoDB unavailable — saving '${resource}' item to local file store.`);
    return localStoreCreate(resource, parsed as Record<string, unknown>) as unknown as ResourceCollectionMap[T][number];
  }
}

export async function updateResource<T extends ResourceKey>(
  resource: T,
  id: string,
  payload: Record<string, unknown>
): Promise<ResourceCollectionMap[T][number] | null> {
  const normalized = normalizePayload(resource, payload);
  const parsed = resourceSchemas[resource].parse(normalized);

  try {
    await connectToDatabase();
    const Model = resourceModels[resource];
    const updated = await Model.findByIdAndUpdate(id, toDatabasePayload(parsed), {
      new: true,
      runValidators: true
    }).lean();
    return updated ? (serialize(updated) as unknown as ResourceCollectionMap[T][number]) : null;
  } catch (error) {
    logFallback(resource, error);
    console.warn(`[local-store] MongoDB unavailable — updating '${resource}/${id}' in local file store.`);
    // Try to update in local store; if not found there, create it fresh.
    const result = localStoreUpdate(resource, id, parsed as Record<string, unknown>)
      ?? localStoreCreate(resource, { ...parsed, _id: id } as Record<string, unknown>);
    return result as unknown as ResourceCollectionMap[T][number];
  }
}

export async function deleteResource(resource: ResourceKey, id: string) {
  try {
    await connectToDatabase();
    const Model = resourceModels[resource];
    await Model.findByIdAndDelete(id);
  } catch {
    // Try local store first, ignore if not found there
    localStoreDelete(resource, id);
  }
}

export async function getCategories<T extends ResourceKey>(resource: T) {
  const items = await getCollection(resource, { status: "published" });
  return ["All", ...new Set(items.map((item) => item.category))];
}

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const [services, products, blogs, insights, caseStudies, careers] = await Promise.all([
    getCollection("services", { status: "all" }),
    getCollection("products", { status: "all" }),
    getCollection("blogs", { status: "all" }),
    getCollection("insights", { status: "all" }),
    getCollection("case-studies", { status: "all" }),
    getCollection("careers", { status: "all" })
  ]);

  return {
    counts: {
      services: services.length,
      products: products.length,
      blogs: blogs.length,
      insights: insights.length,
      "case-studies": caseStudies.length,
      careers: careers.length
    },
    featured: {
      services: services.filter((item) => item.featured).slice(0, 2),
      products: products.filter((item) => item.featured).slice(0, 2),
      blogs: blogs.filter((item) => item.featured).slice(0, 2),
      insights: insights.filter((item) => item.featured).slice(0, 2),
      "case-studies": caseStudies.filter((item) => item.featured).slice(0, 2),
      careers: careers.filter((item) => item.featured).slice(0, 2)
    }
  };
}

export async function getSitemapEntries() {
  const collections = await Promise.all(resourceKeys.map((resource) => getCollection(resource, { status: "published" })));

  return resourceKeys.flatMap((resource, index) =>
    collections[index].map((item) => ({
      resource,
      slug: item.slug,
      updatedAt: item.updatedAt || item.publishedAt
    }))
  );
}

export async function createContactSubmission(payload: Record<string, unknown>) {
  const parsed = contactSubmissionSchema.parse({
    name: asString(payload.name),
    email: asString(payload.email),
    company: asString(payload.company),
    serviceInterest: asString(payload.serviceInterest),
    message: asString(payload.message)
  });

  try {
    await connectToDatabase();
    const created = await ContactSubmission.create(parsed);
    return serialize(created.toObject());
  } catch (error) {
    logFallback("contact", error);
    return parsed;
  }
}
