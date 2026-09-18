import styles from "./explorer.module.css";

/* Native disclosure elements: keyboard and screen-reader behaviour
   comes free, and the answers stay in the document for search. */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className={styles.faq}>
      {items.map((item) => (
        <details key={item.q} className={styles.item}>
          <summary className={styles.summary}>
            <span>{item.q}</span>
            <span className={styles.mark} aria-hidden="true" />
          </summary>
          <p className={styles.answer}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
