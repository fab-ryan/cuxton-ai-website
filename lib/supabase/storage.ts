"use client";

import { getSupabase } from "./client";

/* ═══════════════════════════════════════════════════════════════════
   Image uploads for insights.

   Files go to the public-read `insight-media` bucket. Writing is
   admin-only, enforced by the storage policies in supabase/schema.sql —
   the checks here exist to give the author a useful message, not to
   secure anything.
   ═══════════════════════════════════════════════════════════════════ */

export const BUCKET = "insight-media";

/** Mirrors `allowed_mime_types` on the bucket. SVG is excluded: it can carry script. */
export const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
] as const;

export const MAX_BYTES = 10 * 1024 * 1024; // matches file_size_limit

/** For an <input type="file"> accept attribute. */
export const ACCEPT_ATTR = ACCEPTED_TYPES.join(",");

export type UploadResult =
  | { ok: true; url: string; path: string }
  | { ok: false; error: string };

export function describeSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Reject the two failures worth catching before a round trip. */
export function validateImage(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type as (typeof ACCEPTED_TYPES)[number])) {
    return `${file.name} is a ${file.type || "unrecognised"} file. Use JPEG, PNG, WebP, GIF or AVIF.`;
  }
  if (file.size > MAX_BYTES) {
    return `${file.name} is ${describeSize(file.size)}. The limit is ${describeSize(MAX_BYTES)}.`;
  }
  return null;
}

/**
 * Object key for an upload: `insights/<year>/<random>-<original name>`.
 *
 * The random prefix means two authors uploading `hero.jpg` on the same
 * day cannot collide, and the readable tail keeps the bucket browsable
 * in the Supabase dashboard.
 */
function objectPath(file: File): string {
  const cleanName =
    file.name
      .toLowerCase()
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "image";

  const ext = (file.name.match(/\.([a-z0-9]+)$/i)?.[1] ?? "jpg").toLowerCase();
  const year = new Date().getFullYear();
  const unique = crypto.randomUUID().slice(0, 8);

  return `insights/${year}/${unique}-${cleanName}.${ext}`;
}

/** Upload one image and return its public URL. */
export async function uploadImage(file: File): Promise<UploadResult> {
  const invalid = validateImage(file);
  if (invalid) return { ok: false, error: invalid };

  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const path = objectPath(file);

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000", // immutable: the random key changes on re-upload
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    const message = /row-level security|Unauthorized/i.test(error.message)
      ? "Your account is not permitted to upload images."
      : error.message;
    return { ok: false, error: message };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { ok: true, url: data.publicUrl, path };
}

/**
 * Remove a previously uploaded image.
 *
 * Takes the public URL the editor stored and recovers the object key from
 * it, so callers never have to track paths separately. A URL that does not
 * point at this bucket is ignored rather than treated as an error — the
 * cover field also accepts hand-typed paths under `public/`.
 */
export async function deleteImageByUrl(url: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return;

  const path = decodeURIComponent(url.slice(index + marker.length).split("?")[0]);
  if (path) await supabase.storage.from(BUCKET).remove([path]);
}
