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
   Cover photo + gallery for an insight.

   Picking file(s) only stages local previews — nothing is uploaded
   until the author confirms one, either individually ("Use as cover" /
   "Add to gallery") or in bulk ("Upload all"). That confirm step is
   what lets an author compare a few shots before committing, and it
   means a discarded candidate never touches storage.

   The cover is really just a flag on one gallery image, so both are
   managed together here: the gallery grid always shows the current
   cover (badged), even one carried over from before this field
   supported a gallery at all.
   ═══════════════════════════════════════════════════════════════════ */

type Candidate = {
  id: string;
  file: File;
  previewUrl: string;
  uploading: boolean;
  error: string | null;
};

export default function InsightMediaField({
  coverImage,
  gallery,
  onCoverChange,
  onGalleryChange,
}: {
  coverImage: string;
  gallery: string[];
  onCoverChange: (url: string) => void;
  onGalleryChange: (urls: string[]) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const candidatesRef = useRef<Candidate[]>([]);
  const galleryRef = useRef<string[]>(gallery);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    candidatesRef.current = candidates;
  }, [candidates]);

  useEffect(() => {
    galleryRef.current = gallery;
  }, [gallery]);

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
      staged.push({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
        uploading: false,
        error: null,
      });
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

  /** Upload one staged candidate, removing it from staging on success. */
  async function uploadCandidate(id: string): Promise<string | null> {
    const candidate = candidatesRef.current.find((c) => c.id === id);
    if (!candidate) return null;

    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, uploading: true, error: null } : c))
    );
    const result = await uploadImage(candidate.file);

    if (!result.ok) {
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, uploading: false, error: result.error } : c))
      );
      return null;
    }

    URL.revokeObjectURL(candidate.previewUrl);
    setCandidates((prev) => prev.filter((c) => c.id !== id));
    return result.url;
  }

  function addUrlToGallery(url: string) {
    if (galleryRef.current.includes(url)) return;
    onGalleryChange([...galleryRef.current, url]);
  }

  async function chooseAsCover(id: string) {
    const url = await uploadCandidate(id);
    if (!url) return;
    addUrlToGallery(url);
    onCoverChange(url);
  }

  async function addToGallery(id: string) {
    const url = await uploadCandidate(id);
    if (!url) return;
    addUrlToGallery(url);
  }

  async function uploadAll() {
    setBulkUploading(true);
    for (const candidate of candidatesRef.current) {
      await addToGallery(candidate.id);
    }
    setBulkUploading(false);
  }

  async function removeImage(url: string) {
    if (galleryRef.current.includes(url)) {
      onGalleryChange(galleryRef.current.filter((u) => u !== url));
    }
    if (coverImage === url) onCoverChange("");
    await deleteImageByUrl(url);
  }

  // A cover carried over from before the gallery existed still belongs in
  // the picture, even though it is not in `gallery` itself.
  const displayGallery = coverImage && !gallery.includes(coverImage) ? [coverImage, ...gallery] : gallery;
  const picking = candidates.length > 0;
  const busy = bulkUploading || candidates.some((c) => c.uploading);
  const showDropzone = displayGallery.length === 0 && !picking;

  return (
    <div
      className={dragging ? s.mediaFieldDragging : undefined}
      onDragOver={(e) => {
        if (e.dataTransfer.types.includes("Files")) {
          e.preventDefault();
          setDragging(true);
        }
      }}
      onDragLeave={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node)) return;
        setDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        addFiles(e.dataTransfer.files);
      }}
    >
      {showDropzone && (
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
        >
          <div className={s.dropzoneLabel}>Upload a cover photo</div>
          <div className={s.dropzoneHint}>
            Click or drop image(s) here — pick a few to compare
            <br />
            JPEG, PNG, WebP, GIF or AVIF, up to {describeSize(MAX_BYTES)}
          </div>
        </div>
      )}

      {displayGallery.length > 0 && (
        <div style={{ marginBottom: picking ? "1rem" : 0 }}>
          <div className={s.pickerHead}>
            <span className={s.pickerLabel}>Gallery</span>
          </div>
          <div className={s.candidateGrid}>
            {displayGallery.map((url) => {
              const isCover = url === coverImage;
              return (
                <div key={url} className={s.candidateCard}>
                  <div className={s.candidateThumbWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className={s.candidateThumb} />
                    {isCover && <span className={s.coverBadge}>Cover</span>}
                    <button
                      type="button"
                      className={s.candidateDiscard}
                      onClick={() => removeImage(url)}
                      disabled={busy}
                      aria-label="Remove image"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                  <div className={s.candidateBody}>
                    <button
                      type="button"
                      className={s.candidateUseBtn}
                      onClick={() => onCoverChange(url)}
                      disabled={busy || isCover}
                    >
                      {isCover ? "Current cover" : "Set as cover"}
                    </button>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              className={s.addTile}
              onClick={() => input.current?.click()}
              disabled={busy}
            >
              + Add images
            </button>
          </div>
        </div>
      )}

      {picking && (
        <div>
          <div className={s.pickerHead}>
            <span className={s.pickerLabel}>
              New — pick a cover, add to gallery, or upload all
            </span>
            {candidates.length > 1 && (
              <button
                type="button"
                className={s.tool}
                onClick={uploadAll}
                disabled={busy}
                style={{ fontSize: "0.7rem" }}
              >
                {bulkUploading ? "Uploading all…" : `Upload all (${candidates.length})`}
              </button>
            )}
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
                  {candidate.error && <span className={s.candidateError}>{candidate.error}</span>}
                  <button
                    type="button"
                    className={s.candidateUseBtn}
                    onClick={() => chooseAsCover(candidate.id)}
                    disabled={busy}
                  >
                    {candidate.uploading ? "Uploading…" : "Use as cover"}
                  </button>
                  <button
                    type="button"
                    className={s.candidateSecondaryBtn}
                    onClick={() => addToGallery(candidate.id)}
                    disabled={busy}
                  >
                    {candidate.uploading ? "Uploading…" : "Add to gallery"}
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

      {showDropzone && (
        <>
          {manual ? (
            <input
              className="form-field"
              style={{ marginTop: "0.6rem" }}
              placeholder="/insights/my-cover.jpg"
              autoFocus
              onBlur={(e) => {
                const path = e.target.value.trim();
                if (path) onCoverChange(path);
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
