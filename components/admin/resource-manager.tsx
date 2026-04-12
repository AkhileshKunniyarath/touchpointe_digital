"use client";

import { startTransition, useState } from "react";
import { Pencil, Plus, Trash2, UploadCloud } from "lucide-react";

import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ResourceDocument, ResourceKey } from "@/lib/content-types";
import type { AdminFieldConfig } from "@/lib/resource-config";
import { formatDate, slugify, toDisplayImageUrl } from "@/lib/utils";

type ResourceManagerProps = {
  resource: ResourceKey;
  resourceLabel: string;
  description: string;
  fields: AdminFieldConfig[];
  initialItems: ResourceDocument[];
  emptyState: string;
};

type FormState = Record<string, string | boolean>;

const baseFields: AdminFieldConfig[] = [
  { name: "title", label: "Title", type: "text", placeholder: "Enter a title" },
  { name: "slug", label: "Slug", type: "text", placeholder: "auto-generated-from-title" },
  { name: "category", label: "Category", type: "text", placeholder: "Category or vertical" },
  { name: "summary", label: "Summary", type: "textarea", placeholder: "Short summary for cards and previews" },
  { name: "tags", label: "Tags", type: "tags", placeholder: "seo, launch, ux" },
  { name: "coverImage", label: "Cover Image URL", type: "image", placeholder: "https://..." },
  { name: "content", label: "Body Content", type: "richText" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Draft", value: "draft" },
      { label: "Published", value: "published" }
    ]
  },
  { name: "publishedAt", label: "Publish Date", type: "date" },
  { name: "seoTitle", label: "SEO Title", type: "text", placeholder: "Optional SEO title" },
  { name: "seoDescription", label: "SEO Description", type: "textarea", placeholder: "Optional SEO description" }
];

function buildInitialState(fields: AdminFieldConfig[]) {
  const state: FormState = {
    title: "",
    slug: "",
    category: "",
    summary: "",
    tags: "",
    coverImage: "",
    content: "<p></p>",
    status: "draft",
    featured: false,
    publishedAt: "",
    seoTitle: "",
    seoDescription: ""
  };

  for (const field of fields) {
    state[field.name] = field.type === "select" ? field.options?.[0]?.value || "" : "";
  }

  return state;
}

function itemToFormState(item: ResourceDocument, fields: AdminFieldConfig[]) {
  const base = buildInitialState(fields);

  for (const [key, value] of Object.entries(item)) {
    if (Array.isArray(value)) {
      base[key] = value.join(", ");
      continue;
    }

    if (typeof value === "boolean") {
      base[key] = value;
      continue;
    }

    if (value) {
      base[key] = key === "publishedAt" ? String(value).slice(0, 10) : String(value);
    }
  }

  return base;
}

export function ResourceManager({
  resource,
  resourceLabel,
  description,
  fields,
  initialItems,
  emptyState
}: ResourceManagerProps) {
  const allFields = [...baseFields, ...fields];
  const [items, setItems] = useState(initialItems);
  const [formState, setFormState] = useState<FormState>(() => buildInitialState(fields));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const imageFields = allFields.filter((field) => field.type === "image");
  const [imageFolders, setImageFolders] = useState<Record<string, string>>(() =>
    Object.fromEntries(imageFields.map((field) => [field.name, `${resource}/covers`]))
  );
  const [imageFiles, setImageFiles] = useState<Record<string, File | null>>(() =>
    Object.fromEntries(imageFields.map((field) => [field.name, null]))
  );
  const [uploadingImageField, setUploadingImageField] = useState<string | null>(null);
  const [imageMessages, setImageMessages] = useState<Record<string, string>>({});

  const resetForm = () => {
    setSelectedId(null);
    setFormState(buildInitialState(fields));
  };

  const handleEdit = (item: ResourceDocument) => {
    setSelectedId(String(item._id || ""));
    setFormState(itemToFormState(item, fields));
    setMessage("");
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this item?")) {
      return;
    }

    setIsPending(true);
    setMessage("");

    startTransition(async () => {
      try {
        const response = await fetch(`/api/${resource}/${id}`, {
          method: "DELETE"
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Delete failed.");
        }

        setItems((current) => current.filter((item) => String(item._id || "") !== id));
        if (selectedId === id) {
          resetForm();
        }
        setMessage("Item deleted.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Delete failed.");
      } finally {
        setIsPending(false);
      }
    });
  };

  const setFieldValue = (name: string, value: string | boolean) => {
    setFormState((current) => {
      const next = {
        ...current,
        [name]: value
      };

      if (name === "title" && !selectedId && !String(current.slug || "").trim()) {
        next.slug = slugify(String(value));
      }

      return next;
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="surface-strong p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-200">{resourceLabel}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{selectedId ? `Edit ${resourceLabel}` : `Create ${resourceLabel}`}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <form
          className="grid gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            setIsPending(true);
            setMessage("");

            const payload = Object.fromEntries(
              Object.entries(formState).map(([key, value]) => [key, typeof value === "boolean" ? value : String(value)])
            );

            // Seed items have non-ObjectId IDs (e.g. "seed-case-study-1").
            // We cannot PUT to update a record that was never in MongoDB.
            // Instead, treat it as a CREATE (POST) so a real DB record gets made.
            const isMongoBsonId = selectedId ? /^[a-f\d]{24}$/i.test(selectedId) : false;
            const isRealDbItem = selectedId && isMongoBsonId;

            startTransition(async () => {
              try {
                const response = await fetch(isRealDbItem ? `/api/${resource}/${selectedId}` : `/api/${resource}`, {
                  method: isRealDbItem ? "PUT" : "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (!response.ok) {
                  throw new Error(result.error || "Save failed.");
                }

                const savedItem = result.item as ResourceDocument;

                setItems((current) => {
                  // Real DB item: replace in-place; seed item saved as new: prepend
                  if (isRealDbItem) {
                    return current.map((item) => (String(item._id || "") === selectedId ? savedItem : item));
                  }

                  return [savedItem, ...current];
                });

                setMessage(isRealDbItem ? "Item updated." : "Item created successfully in database.");
                resetForm();
              } catch (error) {
                setMessage(error instanceof Error ? error.message : "Save failed.");
              } finally {
                setIsPending(false);
              }
            });
          }}
        >
          {allFields.map((field) => (
            <label key={field.name} className="grid gap-2 text-sm text-slate-200">
              <span>{field.label}</span>
              {field.type === "textarea" ? (
                <Textarea
                  value={String(formState[field.name] || "")}
                  onChange={(event) => setFieldValue(field.name, event.target.value)}
                  placeholder={field.placeholder}
                />
              ) : null}
              {field.type === "richText" ? (
                <RichTextEditor value={String(formState[field.name] || "<p></p>")} onChange={(value) => setFieldValue(field.name, value)} />
              ) : null}
              {field.type === "select" ? (
                <select
                  value={String(formState[field.name] || "")}
                  onChange={(event) => setFieldValue(field.name, event.target.value)}
                  className="h-11 rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  {(field.options || []).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : null}
              {field.type === "text" || field.type === "tags" ? (
                <Input
                  value={String(formState[field.name] || "")}
                  onChange={(event) => setFieldValue(field.name, event.target.value)}
                  placeholder={field.placeholder}
                />
              ) : null}
              {field.type === "image" ? (
                <div className="grid gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Cover Image URL</p>
                    <Input
                      value={String(formState[field.name] || "")}
                      onChange={(event) => setFieldValue(field.name, event.target.value)}
                      placeholder={field.placeholder}
                    />
                  </div>
                  
                  <div className="my-1 border-t border-white/10" />
                  
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Or Upload To MinIO</p>
                    <Input
                      value={imageFolders[field.name] || `${resource}/covers`}
                      onChange={(event) =>
                        setImageFolders((current) => ({
                          ...current,
                          [field.name]: event.target.value
                        }))
                      }
                      placeholder={`Folder: ${resource}/covers`}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        setImageFiles((current) => ({
                          ...current,
                          [field.name]: event.target.files?.[0] || null
                        }))
                      }
                      className="w-full rounded-[18px] border border-dashed border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-300"
                    />
                    <button
                      type="button"
                      onClick={() => {
                      const file = imageFiles[field.name];

                      if (!file) {
                        setImageMessages((current) => ({ ...current, [field.name]: "Select an image file first." }));
                        return;
                      }

                      const folder = String(imageFolders[field.name] || `${resource}/covers`)
                        .trim()
                        .replace(/^\/+|\/+$/g, "");
                      const uploadFormData = new FormData();
                      uploadFormData.append("folder", folder || `${resource}/covers`);
                      uploadFormData.append("file", file);

                      setUploadingImageField(field.name);
                      setImageMessages((current) => ({ ...current, [field.name]: "" }));

                      startTransition(async () => {
                        try {
                          const response = await fetch("/api/upload", {
                            method: "POST",
                            body: uploadFormData
                          });
                          const result = await response.json();

                          if (!response.ok) {
                            throw new Error(result.error || "Image upload failed.");
                          }

                          setFieldValue(field.name, result.asset.url || "");
                          setImageFiles((current) => ({ ...current, [field.name]: null }));
                          setImageMessages((current) => ({ ...current, [field.name]: "Image uploaded and URL applied." }));
                        } catch (error) {
                          setImageMessages((current) => ({
                            ...current,
                            [field.name]: error instanceof Error ? error.message : "Image upload failed."
                          }));
                        } finally {
                          setUploadingImageField(null);
                        }
                      });
                    }}
                    disabled={uploadingImageField === field.name}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-sky-300/30 bg-sky-300/15 px-5 text-sm font-semibold text-sky-100 transition hover:bg-sky-300/20 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <UploadCloud className="mr-2 h-4 w-4" />
                    {uploadingImageField === field.name ? "Uploading..." : "Upload Image"}
                  </button>
                  {imageMessages[field.name] ? (
                    <p className="text-xs text-slate-300">{imageMessages[field.name]}</p>
                  ) : null}
                  </div>
                  {String(formState[field.name] || "").trim() ? (
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                      <img
                        src={toDisplayImageUrl(String(formState[field.name] || ""))}
                        alt={`${field.label} preview`}
                        className="h-48 w-full object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
              {field.type === "number" ? (
                <Input
                  type="number"
                  value={String(formState[field.name] || "")}
                  onChange={(event) => setFieldValue(field.name, event.target.value)}
                  placeholder={field.placeholder}
                />
              ) : null}
              {field.type === "date" ? (
                <Input
                  type="date"
                  value={String(formState[field.name] || "")}
                  onChange={(event) => setFieldValue(field.name, event.target.value)}
                />
              ) : null}
              {field.helperText ? <span className="text-xs text-slate-500">{field.helperText}</span> : null}
            </label>
          ))}

          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            <input
              type="checkbox"
              checked={Boolean(formState.featured)}
              onChange={(event) => setFieldValue("featured", event.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-slate-950 text-sky-400"
            />
            Mark as featured content
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : selectedId ? `Update ${resourceLabel}` : `Create ${resourceLabel}`}
            </Button>
            {message ? <p className="text-sm text-slate-300">{message}</p> : null}
          </div>
        </form>
      </div>

      <div className="surface-strong p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">{resourceLabel} Library</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {items.length ? `${items.length} item${items.length === 1 ? "" : "s"} available.` : emptyState}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {items.map((item) => (
            <div key={String(item._id || item.slug)} className="surface p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-300">
                      {item.status}
                    </span>
                    {item.featured ? (
                      <span className="rounded-full bg-sky-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-400">
                    {item.category} - {formatDate(item.publishedAt)}
                  </p>
                  <p className="text-sm leading-6 text-slate-300">{item.summary}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(String(item._id || ""))}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-400/20 bg-rose-400/10 text-rose-200 transition hover:bg-rose-400/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!items.length ? <div className="surface p-6 text-sm text-slate-300">{emptyState}</div> : null}
        </div>
      </div>
    </div>
  );
}
