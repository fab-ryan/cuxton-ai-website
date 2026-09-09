import { Fragment } from "react";
import {
  attrString,
  safeHref,
  safeImageSrc,
  type RichDoc,
  type RichNode,
} from "@/lib/richtext";
import s from "./insights.module.css";

/* ═══════════════════════════════════════════════════════════════════
   Renders a stored rich-text document as React elements.

   Every node type is matched against this whitelist; anything the
   editor did not produce — or that was written straight into the jsonb
   column — falls through and renders as nothing. No HTML string is ever
   constructed, so there is no injection surface, and hrefs and image
   sources are re-checked here on the way out.
   ═══════════════════════════════════════════════════════════════════ */

export default function RichContent({ doc }: { doc: RichDoc }) {
  return <div className={s.prose}>{renderNodes(doc.content)}</div>;
}

function renderNodes(nodes: RichNode[] | undefined) {
  if (!nodes?.length) return null;
  return nodes.map((node, i) => <Fragment key={i}>{renderNode(node, i)}</Fragment>);
}

function renderNode(node: RichNode, index: number): React.ReactNode {
  switch (node.type) {
    case "paragraph":
      // Tiptap emits an empty paragraph for a blank line; skip rather than
      // render a stray gap.
      return node.content?.length ? <p>{renderNodes(node.content)}</p> : null;

    case "heading": {
      const level = node.attrs?.level;
      // The editor is configured for h2/h3 only. Anything else, including a
      // pasted h1, is levelled down so the article keeps one document title.
      return level === 3 ? (
        <h3>{renderNodes(node.content)}</h3>
      ) : (
        <h2>{renderNodes(node.content)}</h2>
      );
    }

    case "bulletList":
      return <ul>{renderNodes(node.content)}</ul>;

    case "orderedList": {
      const start = node.attrs?.start;
      return (
        <ol start={typeof start === "number" && start > 1 ? start : undefined}>
          {renderNodes(node.content)}
        </ol>
      );
    }

    case "listItem":
      return <li>{renderNodes(node.content)}</li>;

    case "blockquote":
      return <blockquote>{renderNodes(node.content)}</blockquote>;

    case "codeBlock":
      return (
        <pre>
          <code>{renderNodes(node.content)}</code>
        </pre>
      );

    case "horizontalRule":
      return <hr />;

    case "hardBreak":
      return <br />;

    case "image": {
      const src = safeImageSrc(node.attrs?.src);
      if (!src) return null;

      const alt = attrString(node.attrs, "alt");
      const title = attrString(node.attrs, "title");

      return (
        <figure className={s.figure}>
          {/* Storage URLs are arbitrary and the export is unoptimised, so a
              plain <img> rather than next/image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} title={title || undefined} loading="lazy" />
          {title && <figcaption>{title}</figcaption>}
        </figure>
      );
    }

    case "text":
      return renderText(node, index);

    default:
      return null;
  }
}

/** Wrap a text run in whichever marks it carries, innermost first. */
function renderText(node: RichNode, index: number): React.ReactNode {
  if (!node.text) return null;

  let element: React.ReactNode = node.text;

  for (const mark of node.marks ?? []) {
    switch (mark.type) {
      case "bold":
        element = <strong>{element}</strong>;
        break;
      case "italic":
        element = <em>{element}</em>;
        break;
      case "strike":
        element = <s>{element}</s>;
        break;
      case "underline":
        element = <u>{element}</u>;
        break;
      case "code":
        element = <code>{element}</code>;
        break;
      case "link": {
        const href = safeHref(mark.attrs?.href);
        // A rejected href leaves the text in place, unlinked, rather than
        // dropping the author's words.
        if (href) {
          const external = /^https?:/i.test(href);
          element = (
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {element}
            </a>
          );
        }
        break;
      }
      default:
        break;
    }
  }

  return <Fragment key={index}>{element}</Fragment>;
}
