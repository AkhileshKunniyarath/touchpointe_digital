/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import { UploadCloud, X, Link2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ImageUploadFieldProps = {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
};

type UploadState = "idle" | "uploading" | "error";

export function ImageUploadField({ value, onChange, placeholder }: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  async function uploadFile(file: File) {
    setUploadState("uploading");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("folder", "content");
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Upload failed.");
      }

      onChange(json.asset.url);
      setUploadState("idle");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Upload failed.");
      setUploadState("error");
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) uploadFile(file);
  }

  return (
    <div className="grid gap-2">
      {/* Drop zone / preview */}
      <div
        onClick={() => uploadState !== "uploading" && fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden",
          uploadState === "uploading"
            ? "border-violet-300 bg-violet-50 cursor-wait"
            : isDragging
            ? "border-[#7C3AED] bg-violet-50 cursor-copy"
            : value
            ? "border-slate-200 bg-slate-50 cursor-pointer hover:border-[#7C3AED]"
            : "border-slate-300 bg-slate-50 cursor-pointer hover:border-[#7C3AED] hover:bg-violet-50/30"
        )}
      >
        {value ? (
          /* Preview */
          <div className="relative group">
            <img
              src={value}
              alt="Cover preview"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <span
                onClick={() => fileInputRef.current?.click()}
                className="bg-white text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-violet-50 transition-colors"
              >
                <UploadCloud className="w-3.5 h-3.5" /> Replace
              </span>
              <span
                onClick={(e) => { e.stopPropagation(); onChange(""); }}
                className="bg-rose-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-rose-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Remove
              </span>
            </div>
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center gap-3 py-10 px-6">
            {uploadState === "uploading" ? (
              <>
                <div className="w-8 h-8 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
                <p className="text-sm text-slate-500 font-medium">Uploading to MinIO…</p>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <UploadCloud className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-700">Click or drag an image here</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP, GIF — max 10MB</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Error message */}
      {uploadState === "error" && (
        <p className="text-xs text-rose-500 font-medium">{errorMsg}</p>
      )}

      {/* Manual URL input */}
      <div className="flex items-center gap-2">
        <Link2 className="w-4 h-4 text-slate-400 shrink-0" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Or paste an image URL directly"}
          className="text-xs"
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
