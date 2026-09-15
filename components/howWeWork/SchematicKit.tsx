import React from "react";
import styles from "./Schematic.module.css";

/* Small helpers shared by the milestone schematics and the operating
   principle graphics. Layout and type live in Schematic.module.css. */

export { styles as sch };

export const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

type TagTone = "teal" | "amber" | "dim" | "faint" | "ok" | "error";

const TAG_TONES: Record<TagTone, string | undefined> = {
  teal: undefined,
  amber: styles.amber,
  dim: styles.dim,
  faint: styles.faint,
  ok: styles.ok,
  error: styles.error,
};

/* Monospace uppercase label: section captions, panel headers, statuses. */
export function Tag({
  tone = "teal",
  caption = false,
  className,
  children,
}: {
  tone?: TagTone;
  caption?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return <p className={cx(styles.tag, TAG_TONES[tone], caption && styles.caption, className)}>{children}</p>;
}

/* Connector between the steps of a flow. Points down when the flow is
   stacked and right once it lays out as a row. */
export function Arrow({ tone = "teal", dashed = false }: { tone?: "teal" | "amber"; dashed?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cx(styles.arrow, tone === "amber" && styles.arrowAmber, dashed && styles.arrowDashed)}
    />
  );
}

export function Bullets({ items, strong = false }: { items: string[]; strong?: boolean }) {
  return (
    <ul className={cx(styles.bullets, strong && styles.bulletsStrong)}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function Meter({ label, value, tone = "teal" }: { label: string; value: number; tone?: "teal" | "amber" }) {
  return (
    <div className={styles.meter}>
      <span>{label}</span>
      <div className={styles.track} aria-hidden="true">
        <div className={cx(styles.fill, tone === "amber" && styles.fillAmber)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function CheckIcon() {
  return (
    <svg
      className={styles.checkIcon}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
