"use client";

import { useState } from "react";
import { NewsCard } from "./Cards";
import { NEWS, NEWS_CATEGORIES } from "@/data/university";
import ui from "./ui.module.css";
import styles from "./explorer.module.css";

export default function NewsIndex() {
  const [category, setCategory] = useState<string>("all");
  const results =
    category === "all" ? NEWS : NEWS.filter((item) => item.category === category);

  return (
    <div>
      <div className={styles.bar}>
        <div>
          <span className={styles.filterLabel} id="news-filter">Filter by category</span>
          <div className={styles.group} role="group" aria-labelledby="news-filter">
            <button
              type="button"
              className={`${styles.chip} ${category === "all" ? styles.chipActive : ""}`}
              aria-pressed={category === "all"}
              onClick={() => setCategory("all")}
            >
              Everything
            </button>
            {NEWS_CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                className={`${styles.chip} ${category === item ? styles.chipActive : ""}`}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <p className={styles.count} aria-live="polite">
          {results.length} of {NEWS.length} items
        </p>
      </div>

      <div className={`${ui.gridGap} ${ui.cols3}`}>
        {results.map((article) => (
          <NewsCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
