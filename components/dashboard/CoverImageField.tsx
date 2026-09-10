"use client";

import { useRef, useState } from "react";
import {
  ACCEPT_ATTR,
  deleteImageByUrl,
  describeSize,
  MAX_BYTES,
  uploadImage,
} from "@/lib/supabase/storage";
import s from "./editor.module.css";

/* ═══════════════════════════════════════════════════════════════════
   Cover photo for an insight.

   Click or drop to upload; the stored value is the public URL. A path
   typed by hand (something already under `public/`) is still accepted,
   so existing covers keep working.
   ═══════════════════════════════════════════════════════════════════ */

export default function CoverImageField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manual, setManual] = useState(false);

  async function handleFiles(files: FileList | File[] | null) {
    const file = Array.from(files ?? [])[0];
    if (!file) return;

    setError(null);
    setUploading(true);
    const result = await uploadImage(file);
    setUploading(false);

    if (!result.ok) setError(result.error);
    else onChange(result.url);
  }

  async function clear() {
    const previous = value;
    onChange("");
    setError(null);
    // Only removes files this bucket owns; a hand-typed path is left alone.
    await deleteImageByUrl(previous);
  }

  if (value) {
    return (
      <div>
        <div className={s.preview}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className={s.previewImg} />
          <div className={s.previewBar}>
            <span className={s.previewName}>{fileNameFrom(value)}</span>
            <div style={{ display: "flex", gap: "0.6rem", flexShrink: 0 }}>
              <button
                type="button"
                className={s.tool}
                onClick={() => input.current?.click()}
                disabled={uploading}
                style={{ fontSize: "0.7rem" }}
              >
                {uploading ? "Uploading…" : "Replace"}
              </button>
              <button
                type="button"
                className={s.tool}
                onClick={clear}
                style={{ fontSize: "0.7rem", color: "#d15757" }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <input
          ref={input}
          type="file"
          accept={ACCEPT_ATTR}
          className={s.srOnlyInput}
          onChange={(e) => {
            const files = e.target.files;
            e.target.value = "";
            void handleFiles(files);
          }}
        />

        {error && (
          <p className={s.dropzoneHint} style={{ color: "#d15757", marginTop: "0.5rem" }}>
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        className={`${s.dropzone} ${dragging ? s.dropzoneActive : ""}`}
        role="button"
        tabIndex={0}
        onClick={() => input.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            input.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void handleFiles(e.dataTransfer.files);
        }}
      >
        <div className={s.dropzoneLabel}>
          {uploading ? "Uploading…" : "Upload a cover photo"}
        </div>
        <div className={s.dropzoneHint}>
          Click or drop an image here
          <br />
          JPEG, PNG, WebP, GIF or AVIF, up to {describeSize(MAX_BYTES)}
        </div>
      </div>

      <input
        ref={input}
        type="file"
        accept={ACCEPT_ATTR}
        className={s.srOnlyInput}
        onChange={(e) => {
          const files = e.target.files;
          e.target.value = "";
          void handleFiles(files);
        }}
      />

      {error && (
        <p className={s.dropzoneHint} style={{ color: "#d15757", marginTop: "0.5rem" }}>
          {error}
        </p>
      )}

      {manual ? (
        <input
          className="form-field"
          style={{ marginTop: "0.6rem" }}
          placeholder="/insights/my-cover.jpg"
          autoFocus
          onBlur={(e) => {
            const path = e.target.value.trim();
            if (path) onChange(path);
            setManual(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
            if (e.key === "Escape") setManual(false);
          }}
        />
      ) : (
        <button
          type="button"
          className={s.tool}
          style={{ marginTop: "0.5rem", fontSize: "0.7rem" }}
          onClick={() => setManual(true)}
        >
          Or enter a path
        </button>
      )}
    </div>
  );
}

function fileNameFrom(url: string): string {
  try {
    const path = url.startsWith("/") ? url : new URL(url).pathname;
    return decodeURIComponent(path.split("/").pop() ?? url);
  } catch {
    return url;
  }
}
