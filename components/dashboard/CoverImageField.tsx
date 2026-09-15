"use client";

import { useEffect, useRef, useState } from "react";
import {
  ACCEPT_ATTR,
  deleteImageByUrl,
  describeSize,
  MAX_BYTES,
  uploadImage,
  validateImage,
} from "@/lib/supabase/storage";
import s from "./editor.module.css";

/* ═══════════════════════════════════════════════════════════════════
   Cover photo for an insight.

   Picking file(s) only stages local previews — nothing is uploaded
   until the author picks one with "Use this photo". That confirm step
   is what lets an author compare a few shots before committing, and it
   means a rejected candidate never touches storage. The stored value is
   the public URL; a path typed by hand (something already under
   `public/`) is still accepted, so existing covers keep working.
   ═══════════════════════════════════════════════════════════════════ */

type Candidate = {
  id: string;
  file: File;
  previewUrl: string;
};

export default function CoverImageField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const candidatesRef = useRef<Candidate[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    candidatesRef.current = candidates;
  }, [candidates]);

  // Local preview URLs are only good for this tab's lifetime — revoke
  // whatever is still staged when the field unmounts.
  useEffect(() => {
    return () => {
      candidatesRef.current.forEach((c) => URL.revokeObjectURL(c.previewUrl));
    };
  }, []);

  function addFiles(files: FileList | File[] | null) {
    const list = Array.from(files ?? []);
    if (list.length === 0) return;

    setError(null);
    const staged: Candidate[] = [];
    for (const file of list) {
      const invalid = validateImage(file);
      if (invalid) {
        setError(invalid);
        continue;
      }
      staged.push({ id: crypto.randomUUID(), file, previewUrl: URL.createObjectURL(file) });
    }
    if (staged.length) setCandidates((prev) => [...prev, ...staged]);
  }

  function discardCandidate(id: string) {
    setCandidates((prev) => {
      const target = prev.find((c) => c.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((c) => c.id !== id);
    });
  }

  function discardAll() {
    setCandidates((prev) => {
      prev.forEach((c) => URL.revokeObjectURL(c.previewUrl));
      return [];
    });
    setError(null);
  }

  async function confirmCandidate(candidate: Candidate) {
    setError(null);
    setConfirmingId(candidate.id);
    const result = await uploadImage(candidate.file);
    setConfirmingId(null);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    onChange(result.url);
    discardAll();
  }

  async function clear() {
    const previous = value;
    onChange("");
    setError(null);
    // Only removes files this bucket owns; a hand-typed path is left alone.
    await deleteImageByUrl(previous);
  }

  const picking = candidates.length > 0;
  const busy = confirmingId !== null;

  return (
    <div>
      {value && !picking && (
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
                style={{ fontSize: "0.7rem" }}
              >
                Replace
              </button>
              <button
                type="button"
                className={s.tool}
                onClick={clear}
                style={{ fontSize: "0.7rem", color: "var(--status-error)" }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {!value && !picking && (
        <div
          className={`${s.dropzone} ${dragging ? s.dropzoneActive : ""}`}
          role="button"
          tabIndex={0}
          onClick={() => input.current?.click()}
          onKeyDown={(e) => {
            console.log("key pressed", e.key);
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
            addFiles(e.dataTransfer.files);
          }}
        >
          <div className={s.dropzoneLabel}>Upload a cover photo</div>
          <div className={s.dropzoneHint}>
            Click or drop image(s) herepick a few to compare
            <br />
            JPEG, PNG, WebP, GIF or AVIF, up to {describeSize(MAX_BYTES)}
          </div>
        </div>
      )}

      {picking && (
        <div>
          <div className={s.pickerHead}>
            <span className={s.pickerLabel}>
              {value ? "Choose a replacement" : "Choose a cover"} - pick the right one
            </span>
          </div>
          <div className={s.candidateGrid}>
            {candidates.map((candidate) => (
              <div key={candidate.id} className={s.candidateCard}>
                <div className={s.candidateThumbWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={candidate.previewUrl} alt="" className={s.candidateThumb} />
                  <button
                    type="button"
                    className={s.candidateDiscard}
                    onClick={() => discardCandidate(candidate.id)}
                    disabled={busy}
                    aria-label={`Discard ${candidate.file.name}`}
                    title="Discard"
                  >
                    ✕
                  </button>
                </div>
                <div className={s.candidateBody}>
                  <span className={s.candidateName} title={candidate.file.name}>
                    {candidate.file.name}
                  </span>
                  <button
                    type="button"
                    className={s.candidateUseBtn}
                    onClick={() => confirmCandidate(candidate)}
                    disabled={busy}
                  >
                    {confirmingId === candidate.id ? "Uploading…" : "Use this photo"}
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              className={s.addTile}
              onClick={() => input.current?.click()}
              disabled={busy}
            >
              + Add more
            </button>
          </div>

          {value && (
            <button
              type="button"
              className={s.tool}
              onClick={discardAll}
              disabled={busy}
              style={{ marginTop: "0.6rem", fontSize: "0.7rem" }}
            >
              Cancel, keep current cover
            </button>
          )}
        </div>
      )}

      <input
        ref={input}
        type="file"
        accept={ACCEPT_ATTR}
        multiple
        className={s.srOnlyInput}
        onChange={(e) => {
          console.log("file input change", e.target.files);
          const files = Array.from(e.target.files || []);
          e.target.value = ""; // let the same file be chosen twice
          addFiles(files);
        }}
      />

      {error && (
        <p className={s.dropzoneHint} style={{ color: "var(--status-error)", marginTop: "0.5rem" }}>
          {error}
        </p>
      )}

      {!value && !picking && (
        <>
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
        </>
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
