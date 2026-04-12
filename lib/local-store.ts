/**
 * Local file-based store used as a fallback when MongoDB is unavailable.
 * Data is persisted to .data/local-store.json so changes survive server restarts.
 */

import fs from "fs";
import path from "path";

import type { ResourceKey } from "@/lib/content-types";

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(DATA_DIR, "local-store.json");

type LocalStoreShape = Partial<Record<ResourceKey, Record<string, unknown>[]>>;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readStore(): LocalStoreShape {
  try {
    ensureDataDir();
    if (!fs.existsSync(STORE_FILE)) {
      return {};
    }
    const raw = fs.readFileSync(STORE_FILE, "utf-8");
    return JSON.parse(raw) as LocalStoreShape;
  } catch {
    return {};
  }
}

function writeStore(store: LocalStoreShape) {
  ensureDataDir();
  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
}

export function localStoreGetAll(resource: ResourceKey): Record<string, unknown>[] {
  const store = readStore();
  return store[resource] || [];
}

export function localStoreCreate(
  resource: ResourceKey,
  item: Record<string, unknown>
): Record<string, unknown> {
  const store = readStore();

  if (!store[resource]) {
    store[resource] = [];
  }

  // Generate a simple unique local ID
  const localId = `local-${resource}-${Date.now()}`;
  const newItem = {
    ...item,
    _id: localId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  store[resource]!.unshift(newItem);
  writeStore(store);

  return newItem;
}

export function localStoreUpdate(
  resource: ResourceKey,
  id: string,
  item: Record<string, unknown>
): Record<string, unknown> | null {
  const store = readStore();

  if (!store[resource]) {
    return null;
  }

  const idx = store[resource]!.findIndex((entry) => entry._id === id);

  if (idx === -1) {
    return null;
  }

  const updated = {
    ...store[resource]![idx],
    ...item,
    _id: id,
    updatedAt: new Date().toISOString()
  };

  store[resource]![idx] = updated;
  writeStore(store);

  return updated;
}

export function localStoreDelete(resource: ResourceKey, id: string): boolean {
  const store = readStore();

  if (!store[resource]) {
    return false;
  }

  const before = store[resource]!.length;
  store[resource] = store[resource]!.filter((entry) => entry._id !== id);

  if (store[resource]!.length !== before) {
    writeStore(store);
    return true;
  }

  return false;
}

export function localStoreHasItems(resource: ResourceKey): boolean {
  const store = readStore();
  return (store[resource]?.length || 0) > 0;
}
