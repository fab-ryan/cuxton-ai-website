"use client";

import { useCallback, useRef, useState } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import type { Content } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { ACCEPT_ATTR, uploadImage, validateImage } from "@/lib/supabase/storage";
import { docToPlainText, type RichDoc } from "@/lib/richtext";
import s from "./editor.module.css";

/* ═══════════════════════════════════════════════════════════════════
   Rich text editor for the insight body.

   Emits Tiptap's JSON document rather than an HTML string. The public
   site walks that tree to build React elements, so nothing typed or
   pasted here can become markup on cuxtonai.com — see RichContent.

   Images are uploaded to Supabase Storage the moment they are chosen,
   dropped or pasted, and only their public URL enters the document.
   ═══════════════════════════════════════════════════════════════════ */

type Props = {
  /** Initial document. The editor owns its state after mount. */
  initialDoc: RichDoc;
  onChange: (doc: RichDoc, plainText: string) => void;
  placeholder?: string;
};

export default function RichTextEditor({ initialDoc, onChange, placeholder }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editor = useEditor({
    // Required under `output: "export"`: the editor must not render during
    // the prerender pass, where there is no DOM to attach to.
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          autolink: true,
          // Tiptap's own guard against javascript: hrefs; RichContent
          // re-checks on the way out, since the column is also writable
          // by anything holding an admin session.
          protocols: ["http", "https", "mailto", "tel"],
          HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: false, // uploads only, so the column never holds a blob
        HTMLAttributes: { loading: "lazy" },
      }),
    ],
    // RichDoc allows a null `attrs` because that is what a hand-edited
    // jsonb row can contain; Tiptap's own JSONContent does not. The
    // shapes are otherwise identical and the renderer copes with either.
    content: initialDoc as unknown as Content,
    editorProps: {
      attributes: {
        "data-placeholder": placeholder ?? "Write the article…",
        role: "textbox",
        "aria-multiline": "true",
        "aria-label": "Article body",
      },
      handleDrop: (_view, event) => {
        const files = Array.from(event.dataTransfer?.files ?? []).filter((f) =>
          f.type.startsWith("image/")
        );
        if (files.length === 0) return false;
        event.preventDefault();
        void insertFiles(files);
        return true;
      },
      handlePaste: (_view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []).filter((f) =>
          f.type.startsWith("image/")
        );
        if (files.length === 0) return false;
        event.preventDefault();
        void insertFiles(files);
        return true;
      },
    },
    onUpdate: ({ editor: instance }) => {
      const doc = instance.getJSON() as RichDoc;
      onChange(doc, docToPlainText(doc));
    },
  });

  /* Upload each file, then place it at the cursor in the order chosen. */
  const insertFiles = useCallback(
    async (files: File[]) => {
      if (!editor) return;
      setError(null);

      for (const file of files) {
        const invalid = validateImage(file);
        if (invalid) {
          setError(invalid);
          continue;
        }

        setUploading((n) => n + 1);
        const result = await uploadImage(file);
        setUploading((n) => n - 1);

        if (!result.ok) {
          setError(result.error);
          continue;
        }

        editor
          .chain()
          .focus()
          .setImage({ src: result.url, alt: "" })
          .createParagraphNear()
          .run();
      }
    },
    [editor]
  );

  /* Subscribe to just the button states, so typing does not re-render the toolbar. */
  const active = useEditorState({
    editor,
    selector: ({ editor: instance }) => ({
      bold: instance?.isActive("bold") ?? false,
      italic: instance?.isActive("italic") ?? false,
      strike: instance?.isActive("strike") ?? false,
      code: instance?.isActive("code") ?? false,
      h2: instance?.isActive("heading", { level: 2 }) ?? false,
      h3: instance?.isActive("heading", { level: 3 }) ?? false,
      bulletList: instance?.isActive("bulletList") ?? false,
      orderedList: instance?.isActive("orderedList") ?? false,
      blockquote: instance?.isActive("blockquote") ?? false,
      codeBlock: instance?.isActive("codeBlock") ?? false,
      link: instance?.isActive("link") ?? false,
      canUndo: instance?.can().undo() ?? false,
      canRedo: instance?.can().redo() ?? false,
      words: instance ? countWords(instance.getText()) : 0,
    }),
  });

  function toggleLink() {
    if (!editor) return;

    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    const previous = (editor.getAttributes("link").href as string) ?? "";
    const input = window.prompt("Link URL", previous || "https://");
    if (input === null) return;

    const href = input.trim();
    if (!href) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  }

  if (!editor) {
    return (
      <div className={s.wrap}>
        <div className={s.surface} style={{ minHeight: 340 }} />
      </div>
    );
  }

  const words = active?.words ?? 0;

  return (
    <div
      className={`${s.wrap} ${dragging ? s.wrapDragging : ""}`}
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
      onDrop={() => setDragging(false)}
    >
      <div className={s.toolbar} role="toolbar" aria-label="Formatting">
        <Tool label="Bold" hint="Bold (⌘B)" on={active?.bold} onClick={() => editor.chain().focus().toggleBold().run()}>
          <strong>B</strong>
        </Tool>
        <Tool label="Italic" hint="Italic (⌘I)" on={active?.italic} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <em>I</em>
        </Tool>
        <Tool label="Strikethrough" on={active?.strike} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <s>S</s>
        </Tool>
        <Tool label="Inline code" on={active?.code} onClick={() => editor.chain().focus().toggleCode().run()}>
          {"</>"}
        </Tool>

        <span className={s.divider} />

        <Tool label="Heading 2" on={active?.h2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </Tool>
        <Tool label="Heading 3" on={active?.h3} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </Tool>

        <span className={s.divider} />

        <Tool label="Bulleted list" on={active?.bulletList} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          •—
        </Tool>
        <Tool label="Numbered list" on={active?.orderedList} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1.
        </Tool>
        <Tool label="Quote" on={active?.blockquote} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          &ldquo;
        </Tool>
        <Tool label="Code block" on={active?.codeBlock} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          {"{ }"}
        </Tool>
        <Tool label="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          —
        </Tool>

        <span className={s.divider} />

        <Tool label={active?.link ? "Remove link" : "Add link"} on={active?.link} onClick={toggleLink}>
          🔗
        </Tool>
        <Tool label="Insert image" onClick={() => fileInput.current?.click()}>
          🖼
        </Tool>

        <span className={s.divider} />

        <Tool label="Undo" disabled={!active?.canUndo} onClick={() => editor.chain().focus().undo().run()}>
          ↶
        </Tool>
        <Tool label="Redo" disabled={!active?.canRedo} onClick={() => editor.chain().focus().redo().run()}>
          ↷
        </Tool>

        {uploading > 0 && (
          <span className={`${s.busy} ${s.spacer}`} role="status">
            Uploading {uploading} image{uploading > 1 ? "s" : ""}…
          </span>
        )}
      </div>

      <input
        ref={fileInput}
        type="file"
        accept={ACCEPT_ATTR}
        multiple
        className={s.srOnlyInput}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          e.target.value = ""; // let the same file be chosen twice
          if (files.length) void insertFiles(files);
        }}
      />

      <div className={s.surface}>
        <EditorContent editor={editor} />
      </div>

      <div className={s.foot}>
        <span>
          {words.toLocaleString()} {words === 1 ? "word" : "words"}, about{" "}
          {Math.max(1, Math.ceil(words / 200))} min read
        </span>
        <span>
          {error ? (
            <span style={{ color: "var(--status-error)", fontWeight: 700 }}>{error}</span>
          ) : (
            "Drag, drop or paste an image straight into the article"
          )}
        </span>
      </div>
    </div>
  );
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function Tool({
  label,
  hint,
  on,
  disabled,
  onClick,
  children,
}: {
  label: string;
  hint?: string;
  on?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`${s.tool} ${on ? s.toolActive : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={on}
      title={hint ?? label}
    >
      {children}
    </button>
  );
}
