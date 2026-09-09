import { Fragment } from "react";
import { asRichDoc, isDocEmpty } from "@/lib/richtext";
import RichContent from "./RichContent";
import s from "./insights.module.css";

/* ═══════════════════════════════════════════════════════════════════
   Article body.

   Posts written in the rich text editor carry a `body_json` document
   and render through RichContent. Anything written before that editor
   existed has only the plain-text `body`, which still parses with the
   original lightweight rules below — so no post had to be migrated.
   ═══════════════════════════════════════════════════════════════════ */

export default function InsightBody({
  body,
  bodyJson,
}: {
  body: string;
  bodyJson?: unknown;
}) {
  const doc = asRichDoc(bodyJson);
  if (doc && !isDocEmpty(doc)) return <RichContent doc={doc} />;

  return <LegacyBody body={body} />;
}

/* ─── Legacy plain-text format ───
     ## Heading  → h2      - item  → list item
     ### Heading → h3      > quote → blockquote
   Rendered as React elements, never injected as markup. */

type Block =
  | { kind: "h2" | "h3" | "p" | "quote"; text: string }
  | { kind: "ul"; items: string[] };

export function parseBody(body: string): Block[] {
  const blocks: Block[] = [];

  for (const raw of body.split(/\n{2,}/)) {
    const chunk = raw.trim();
    if (!chunk) continue;

    const lines = chunk.split("\n").map((l) => l.trim());

    if (lines.every((l) => l.startsWith("- "))) {
      blocks.push({ kind: "ul", items: lines.map((l) => l.slice(2).trim()) });
      continue;
    }
    if (chunk.startsWith("### ")) {
      blocks.push({ kind: "h3", text: chunk.slice(4).trim() });
      continue;
    }
    if (chunk.startsWith("## ")) {
      blocks.push({ kind: "h2", text: chunk.slice(3).trim() });
      continue;
    }
    if (chunk.startsWith("> ")) {
      blocks.push({
        kind: "quote",
        text: lines.map((l) => l.replace(/^>\s?/, "")).join(" "),
      });
      continue;
    }
    blocks.push({ kind: "p", text: lines.join(" ") });
  }

  return blocks;
}

function LegacyBody({ body }: { body: string }) {
  return (
    <div className={s.prose}>
      {parseBody(body).map((block, i) => (
        <Fragment key={i}>
          {block.kind === "h2" && <h2>{block.text}</h2>}
          {block.kind === "h3" && <h3>{block.text}</h3>}
          {block.kind === "p" && <p>{block.text}</p>}
          {block.kind === "quote" && <blockquote>{block.text}</blockquote>}
          {block.kind === "ul" && (
            <ul>
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )}
        </Fragment>
      ))}
    </div>
  );
}
