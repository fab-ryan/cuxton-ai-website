"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./AIQuotes.module.css";

/* A rotating set of quotations on AI, "generated" onto the card word by
   word the way a model streams its output. This is the one ambient loop on
   the site, so it holds still whenever the reader is hovering, focused,
   scrolled away or on another tab, never auto-plays under
   prefers-reduced-motion, and carries a pause control (WCAG 2.2.2). */

type Quote = {
  text: string;
  author: string;
  source?: string;
};

const quotes: Quote[] = [
  {
    text: "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
    author: "Alan Turing",
    source: "Computing Machinery and Intelligence, 1950",
  },
  {
    text: "We had better be quite sure that the purpose put into the machine is the purpose which we really desire.",
    author: "Norbert Wiener",
    source: "Some Moral and Technical Consequences of Automation, 1960",
  },
  {
    text: "There's nothing artificial about AI. It's inspired by people, it's created by people, and most importantly, it impacts people.",
    author: "Fei-Fei Li",
  },
  {
    text: "The Analytical Engine has no pretensions whatever to originate anything. It can do whatever we know how to order it to perform.",
    author: "Ada Lovelace",
    source: "Note G, 1843",
  },
  {
    text: "AI is the new electricity.",
    author: "Andrew Ng",
    source: "Stanford Graduate School of Business, 2017",
  },
  {
    text: "People worry that computers will get too smart and take over the world, but the real problem is that they're too stupid and they've already taken over the world.",
    author: "Pedro Domingos",
    source: "The Master Algorithm, 2015",
  },
  {
    text: "The real risk with AI isn't malice but competence.",
    author: "Stephen Hawking",
    source: "Reddit AMA, 2015",
  },
  {
    text: "What we want is a machine that can learn from experience.",
    author: "Alan Turing",
    source: "Lecture to the London Mathematical Society, 1947",
  },
  {
    text: "By far the greatest danger of Artificial Intelligence is that people conclude too early that they understand it.",
    author: "Eliezer Yudkowsky",
    source: "Global Catastrophic Risks, 2008",
  },
];

const quoteWords = quotes.map((q) => q.text.split(" "));

const WORD_MS = 55;
const HOLD_MS = 7000;

/* Any quote other than the current one, so "generate" never repeats. */
function pickNext(current: number) {
  const r = Math.floor(Math.random() * (quotes.length - 1));
  return r >= current ? r + 1 : r;
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

const SparkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5" />
  </svg>
);

const PauseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="6 4 20 12 6 20 6 4" />
  </svg>
);

export default function AIQuotes() {
  const [index, setIndex] = useState(0);
  /* The server renders the first quote in full, so nothing animates on
     load and the card still reads if the client bundle never arrives. */
  const [shown, setShown] = useState(quoteWords[0].length);
  const [playPref, setPlayPref] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );
  const pageVisible = useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState === "visible",
    () => true
  );

  const playing = playPref ?? !reducedMotion;
  const held = hovered || focused || !inView || !pageVisible;
  const words = quoteWords[index];
  const streaming = shown < words.length;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Stream the current quote one word at a time.
  useEffect(() => {
    if (!streaming) return;
    const t = window.setTimeout(() => setShown((n) => n + 1), WORD_MS);
    return () => window.clearTimeout(t);
  }, [streaming, shown]);

  // Once a quote has finished, hold it, then generate the next one.
  useEffect(() => {
    if (!playing || held || streaming) return;
    const t = window.setTimeout(() => {
      const next = pickNext(index);
      setIndex(next);
      setShown(reducedMotion ? quoteWords[next].length : 0);
    }, HOLD_MS);
    return () => window.clearTimeout(t);
  }, [playing, held, streaming, index, reducedMotion]);

  const generate = () => {
    const next = pickNext(index);
    setIndex(next);
    setShown(reducedMotion ? quoteWords[next].length : 0);
  };

  return (
    <section className={styles.quotesSection} aria-labelledby="ai-quotes-heading">
      <div className="section-container">
        <div className={styles.sectionHeader}>
          <h2 id="ai-quotes-heading" className={styles.heading}>
            The thinking behind{" "}
            <span className={styles.headingHighlight}>the technology.</span>
          </h2>
          <p className={styles.lead}>
            A rotating selection from the people who shaped the field, from Ada Lovelace and
            Alan Turing to today&apos;s researchers. Many of the questions we help clients answer
            were asked decades before the first model shipped.
          </p>
        </div>

        <figure
          ref={cardRef}
          className={styles.quoteCard}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
          }}
        >
          <div className={styles.cardTop}>
            <span className={styles.statusTag}>
              <span
                className={`${styles.statusDot} ${streaming ? styles.statusDotLive : ""}`}
                aria-hidden="true"
              />
              {streaming ? "Generating…" : `Quote ${index + 1} of ${quotes.length}`}
            </span>

            <div className={styles.controls}>
              <button
                type="button"
                className={styles.controlBtn}
                onClick={() => setPlayPref(!playing)}
                aria-label={`${playing ? "Pause" : "Play"} quote rotation`}
              >
                {playing ? <PauseIcon /> : <PlayIcon />}
                <span>{playing ? "Pause" : "Play"}</span>
              </button>
              <button type="button" className={styles.controlBtn} onClick={generate}>
                <SparkIcon />
                <span>Generate another</span>
              </button>
            </div>
          </div>

          <span className={styles.quoteMark} aria-hidden="true">
            &ldquo;
          </span>

          {/* Every quote sits in one grid cell as a transparent layer, so the
              card is always as tall as the longest quote and never shifts the
              page, whether streaming or rotating. Only the current layer is
              exposed to assistive tech, which reads it once rather than every
              streamed word. */}
          <blockquote className={styles.quoteText} aria-live={playing ? "off" : "polite"}>
            {quotes.map((q, i) => (
              <span key={q.text} className={styles.quoteSizer} aria-hidden={i !== index}>
                {q.text}
              </span>
            ))}
            <span className={styles.quoteStream} aria-hidden="true">
              {words.slice(0, shown).join(" ")}
              {streaming && <span className={styles.caret} />}
            </span>
          </blockquote>

          <figcaption className={styles.attribution}>
            {quotes.map((q, i) => (
              <span
                key={q.text}
                className={`${styles.attributionLayer} ${
                  i !== index ? styles.attributionHidden : streaming ? styles.attributionPending : ""
                }`}
                aria-hidden={i !== index}
              >
                <span className={styles.author}>{q.author}</span>
                {q.source && <span className={styles.source}>{q.source}</span>}
              </span>
            ))}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
