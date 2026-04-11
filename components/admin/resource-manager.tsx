"use client";

import { startTransition, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ResourceDocument, ResourceKey } from "@/lib/content-types";
import type { AdminFieldConfig } from "@/lib/resource-config";
import { formatDate, slugify } from "@/lib/utils";

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

            startTransition(async () => {
              try {
                const response = await fetch(selectedId ? `/api/${resource}/${selectedId}` : `/api/${resource}`, {
                  method: selectedId ? "PUT" : "POST",
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
                  if (selectedId) {
                    return current.map((item) => (String(item._id || "") === selectedId ? savedItem : item));
                  }

                  return [savedItem, ...current];
                });

                setMessage(selectedId ? "Item updated." : "Item created.");
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
              {field.type === "text" || field.type === "tags" || field.type === "image" ? (
                <Input
                  value={String(formState[field.name] || "")}
                  onChange={(event) => setFieldValue(field.name, event.target.value)}
                  placeholder={field.placeholder}
                />
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
