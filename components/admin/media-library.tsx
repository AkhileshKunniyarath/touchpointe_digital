/* eslint-disable @next/next/no-img-element */

"use client";

import { startTransition, useState } from "react";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { MediaAsset } from "@/lib/content-types";

type MediaLibraryProps = {
  initialAssets: MediaAsset[];
};

export function MediaLibrary({ initialAssets }: MediaLibraryProps) {
  const [assets, setAssets] = useState(initialAssets);
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <form
        className="surface-strong grid gap-5 p-6"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);

          setIsPending(true);
          setMessage("");

          startTransition(async () => {
            try {
              const response = await fetch("/api/upload", {
                method: "POST",
                body: formData
              });
              const result = await response.json();

              if (!response.ok) {
                throw new Error(result.error || "Upload failed.");
              }

              setAssets((current) => [result.asset, ...current]);
              setMessage("Asset uploaded.");
              event.currentTarget.reset();
            } catch (error) {
              setMessage(error instanceof Error ? error.message : "Upload failed.");
            } finally {
              setIsPending(false);
            }
          });
        }}
      >
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#7C3AED] font-semibold">Media Library</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">Upload new asset</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Files are stored in MinIO and can be reused across services, blogs, products, and case studies.
          </p>
        </div>
        <label className="grid gap-2 text-sm text-slate-900 font-medium">
          <span>Folder</span>
          <input
            type="text"
            name="folder"
            defaultValue="touchpointe"
            className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-900 font-medium">
          <span>File</span>
          <input
            type="file"
            name="file"
            required
            className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600"
          />
        </label>
        <Button type="submit" disabled={isPending}>
          <UploadCloud className="mr-2 h-4 w-4" />
          {isPending ? "Uploading..." : "Upload asset"}
        </Button>
        {message ? <p className="text-sm text-slate-500">{message}</p> : null}
      </form>

      <div className="surface-strong p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">Stored assets</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {assets.length ? `${assets.length} asset${assets.length === 1 ? "" : "s"} available.` : "No assets uploaded yet."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {assets.map((asset) => (
            <div key={asset.key} className="surface overflow-hidden">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-[#7C3AED]/10 to-violet-400/20">
                <img src={asset.url} alt={asset.key} className="h-full w-full object-cover" />
              </div>
              <div className="space-y-2 p-4">
                <p className="break-all text-sm font-medium text-slate-900">{asset.key}</p>
                <a href={asset.url} target="_blank" rel="noreferrer" className="text-xs text-[#7C3AED] font-semibold hover:underline">
                  Open asset
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
