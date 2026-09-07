"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "../Reveal";
import s from "./problem.module.css";

type PainPoint = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  image: { src: string; alt: string };
};

const lockIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16" r="1" />
  </svg>
);

const databaseIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const gearIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const sparkIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

const closeIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const zoomIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const painPoints: PainPoint[] = [
  {
    title: "Sensitive data stays locked away",
    desc: "Regulated and proprietary information can't be sent to a public AI provider without breaking compliance.",
    icon: lockIcon,
    image: {
      src: "/problem/private_ai_enclave.jpg",
      alt: "Air-gapped private AI enclave with isolated server hardware",
    },
  },
  {
    title: "Knowledge is scattered everywhere",
    desc: "Answers are buried across old databases, shared drives and systems that don't talk to each other.",
    icon: databaseIcon,
    image: {
      src: "/problem/enterprise_rag_mesh.jpg",
      alt: "Enterprise RAG vector mesh connecting data sources to a generative AI model",
    },
  },
  {
    title: "Teams repeat the same manual work",
    desc: "Skilled people lose hours a week to copy-paste tasks a properly built system should handle.",
    icon: gearIcon,
    image: {
      src: "/problem/multi_agent_workflow.jpg",
      alt: "Multi-agent workflow pipeline with human-in-the-loop oversight",
    },
  },
  {
    title: "Generic AI guesses instead of knowing",
    desc: "Without real context, off-the-shelf models produce confident answers that are simply wrong.",
    icon: sparkIcon,
    image: {
      src: "/problem/domain_guardrail.jpg",
      alt: "Domain fine-tuning core surrounded by compliance guardrail rings",
    },
  },
];

const AUTO_INTERVAL_MS = 4000;

export const ProblemSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Auto-advance the image on a fixed interval; pausable on hover.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % painPoints.length);
    }, AUTO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    if (modalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const current = painPoints[activeIndex];

  return (
      <section className={`section-py  overflow-hidden ${s.problem}`} id="problem">
          {/* Base Blueprint Rectangles Grid */}
          <div className={s.gridPattern} />
          {/* Ambient Radial Glows */}
          {/* <div className={s.glowTeal} /> */}
          <div className={s.glowAmber} />
          <div className="w-full max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8">
        {/* ─── HEADER ─────────────────────────────────────────── */}
        <div className={s.header}>
          <div className="section-label">The Problem</div>
          <h2 className={`section-heading ${s.headline} anim-fade-up d1`}>
            Generic AI wasn&apos;t built for how your organisation actually works.
          </h2>
          <p className={`section-sub ${s.subhead}`}>
            Your data is sensitive, your knowledge is scattered across old systems, and your teams still repeat the
            same manual steps every day. Feeding that reality into a public AI tool creates risk instead of removing it.
          </p>
        </div>

        {/* ─── TEXT LIST (left) + AUTO-ROTATING IMAGE (right) ─── */}
        <Reveal className={s.body}>
          <div className={s.points}>
            {painPoints.map((point, i) => (
              <button
                key={point.title}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`${s.points__item} ${i === activeIndex ? s.points__itemActive : ""}`}
              >
                <div className={s.points__icon}>{point.icon}</div>
                <div className={s.points__body}>
                  <h3 className={s.points__title}>{point.title}</h3>
                  <p className={s.points__desc}>{point.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div
            className={s.visual}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <button
              type="button"
              className={s.visualFrame}
              onClick={() => setModalOpen(true)}
              aria-label={`View larger: ${current.image.alt}`}
            >
              <div className={s.visualGlow} aria-hidden="true" />
              {painPoints.map((point, i) => (
                <div
                  key={point.image.src}
                  className={`${s.visualImage} ${i === activeIndex ? s.visualImageActive : ""}`}
                >
                  <Image
                    src={point.image.src}
                    alt={point.image.alt}
                    fill
                    sizes="(min-width: 1024px) 460px, 92vw"
                    className={s.visualImg}
                    priority={i === 0}
                  />
                </div>
              ))}
              <span className={s.visualZoomHint}>
                {zoomIcon}
                View larger
              </span>
            </button>

            <div className={s.visualProgress}>
              {painPoints.map((point, i) => (
                <span key={point.title} className={s.visualProgressBar}>
                  {i === activeIndex && (
                    <span
                      key={activeIndex}
                      className={s.visualProgressFill}
                      style={{ animationDuration: `${AUTO_INTERVAL_MS}ms` }}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* ─── MODAL: LARGER IMAGE VIEW ───────────────────────────── */}
      {modalOpen && (
        <div
          className={s.modalOverlay}
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={current.image.alt}
        >
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={s.modalClose}
              onClick={() => setModalOpen(false)}
              aria-label="Close image preview"
            >
              {closeIcon}
            </button>
            <div className={s.modalImageWrap}>
              <Image
                src={current.image.src}
                alt={current.image.alt}
                fill
                sizes="(min-width: 768px) 900px, 92vw"
                className={s.modalImg}
              />
            </div>
            <div className={s.modalCaption}>
              <h3 className={s.modalCaptionTitle}>{current.title}</h3>
              <p className={s.modalCaptionDesc}>{current.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
